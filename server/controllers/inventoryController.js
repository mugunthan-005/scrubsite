const Inventory = require('../models/Inventory');

exports.getInventory = async (req, res) => {
  try {
    const { lowStock, size, search } = req.query;
    let query = {};

    if (size) query.size = size;
    if (search) {
      query.$or = [
        { sku: { $regex: search, $options: 'i' } },
        { productName: { $regex: search, $options: 'i' } },
        { color: { $regex: search, $options: 'i' } }
      ];
    }

    const items = await Inventory.find(query).sort({ stockQuantity: 1 });
    
    if (lowStock === 'true') {
      const lowStockItems = items.filter(item => item.stockQuantity <= item.reorderThreshold);
      return res.json(lowStockItems);
    }

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLowStockAlerts = async (req, res) => {
  try {
    const items = await Inventory.find({});
    const alerts = items.filter(item => item.stockQuantity <= item.reorderThreshold);
    res.json({
      count: alerts.length,
      alerts
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const { stockQuantity, reorderThreshold, fabricStatus, warehouseLocation } = req.body;
    const updateData = {};

    if (stockQuantity !== undefined) updateData.stockQuantity = Number(stockQuantity);
    if (reorderThreshold !== undefined) updateData.reorderThreshold = Number(reorderThreshold);
    if (fabricStatus) updateData.fabricStatus = fabricStatus;
    if (warehouseLocation) updateData.warehouseLocation = warehouseLocation;

    const item = await Inventory.findOneAndUpdate(
      { sku: req.params.sku },
      updateData,
      { new: true }
    );

    if (!item) return res.status(404).json({ error: 'Inventory SKU not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const items = await Inventory.find({});
    const totalSkus = items.length;
    const totalUnits = items.reduce((sum, item) => sum + item.stockQuantity, 0);
    const lowStockCount = items.filter(item => item.stockQuantity <= item.reorderThreshold).length;
    const inventoryValuation = items.reduce((sum, item) => sum + item.stockQuantity * item.unitCost, 0);

    res.json({
      totalSkus,
      totalUnits,
      lowStockCount,
      inventoryValuation
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
