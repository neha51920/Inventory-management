const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
  tags: [String],
}, { timestamps: true });

module.exports = mongoose.model("Inventory", inventorySchema);
