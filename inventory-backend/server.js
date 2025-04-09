require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const redisClient= require("./config/redisClient");
const { connectRabbitMQ } = require('./config/rabbitMQ');

const authRoutes = require("./routes/authRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");

const app = express();
connectDB();

connectRabbitMQ();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);

app.get("/", (req, res) => res.send("Inventory API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
(async () => {
    try {
      await redisClient.set('testKey', 'testValue');
      console.log('Value set in Redis cache.');
    } catch (err) {
      console.error('Error setting value in Redis:', err);
    }
  })();