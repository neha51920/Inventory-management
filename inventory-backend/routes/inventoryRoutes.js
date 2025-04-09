const express = require("express");
const router = express.Router();
const inventory = require("../controllers/inventoryController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, inventory.createItem);
router.get("/", protect, inventory.getItems);
router.get("/:id", protect, inventory.getItem);
router.put("/:id", protect, inventory.updateItem);
router.delete("/:id", protect, inventory.deleteItem);

module.exports = router;
