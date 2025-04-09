const Inventory = require('../models/Inventory');
const redisClient = require('../config/redisClient');
const { publishToQueue } = require('../config/rabbitMQ');

exports.createItem = async (req, res) => {
  try {
    const item = await Inventory.create(req.body);
    // Optionally, cache the newly created item
    await redisClient.setEx(`inventory:${item._id}`, 3600, JSON.stringify(item));
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice, sortBy } = req.query;
    const query = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    const sort = sortBy ? { [sortBy]: 1 } : { createdAt: -1 };

    const items = await Inventory.find(query).sort(sort);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getItem = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if data exists in Redis
    const cachedItem = await redisClient.get(`inventory:${id}`);
    if (cachedItem) {
      return res.json(JSON.parse(cachedItem));
    }

    // If not in cache, fetch from MongoDB
    const item = await Inventory.findById(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    // Store the fetched data in Redis with an expiration time (e.g., 3600 seconds)
    await redisClient.setEx(`inventory:${id}`, 3600, JSON.stringify(item));

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Inventory.findByIdAndUpdate(id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Item not found' });

    // Update the cache with the new data
    await redisClient.setEx(`inventory:${id}`, 3600, JSON.stringify(item));
    await publishToQueue('inventory_updates', {
      itemId: id,
      updatedFields: req.body,
      updatedAt: new Date(),
    });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Inventory.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    // Remove the item from the cache
    await redisClient.del(`inventory:${id}`);

    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
