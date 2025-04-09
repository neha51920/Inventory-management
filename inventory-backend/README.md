# Inventory Management System - Backend

Node.js and Express-based backend with MongoDB, Redis caching, RabbitMQ queueing, and secure JWT authentication.

## ⚙️ Features

- CRUD APIs for inventory
- Redis caching for performance
- RabbitMQ for background processing
- JWT for user authentication
- Error handling & data validation

## 📁 Folder Structure
```
inventory-backend/
├── README.md                    # Backend-specific README
├── server.js
├── inventoryWorker.js
├── .env                         # Environment config
├── package.json
├── config/
│   ├── db.js                    
│   ├── redisClient.js           # Redis setup
│   └── rabbitmq.js              # RabbitMQ setup
├── controllers/
│   └── authController.js        # authentication logic
│   └── inventoryController.js   # CRUD + cache logic
├── middleware/
│   └── authMiddleware.js        # JWT auth middleware
│   └── errorHandler.js           
├── models/
│   └── Inventory.js             # Inventory schema
│   └── User.js                  # User schema
├── routes/
│   └── inventoryRoutes.js       # All inventory routes
│   └── authRoutes.js            # All authentication routes
│   ├──
```

## 🛠️ Setup Instructions

1. **Install Dependencies**  
```
npm install
```
2. **Enviroment File**
```
PORT
MONGO_URI
JWT_SECRET
REDIS_HOST
REDIS_PORT
RABBITMQ_URL
```
3.**start Server**
```
npm start
```

**🚀 API Endpoints **
```
Method	Endpoint	Description
POST /api/auth/register Register User
POST /api/auth/login Login User
POST /api/inventory	Create a new inventory
GET	/api/inventory	Get all inventory
GET	/api/inventory/:id	Get inventory by ID
PUT	/api/inventory/:id	Update an inventory
DELETE /api/inventory/:id	Delete an inventory
```
