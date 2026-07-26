const Order = require('../models/Order');
const Inventory = require('../models/Inventory');

exports.createOrder = async (req, res) => {
  try {
    const { customerName, email, shippingAddress, items, totalAmount } = req.body;
    const orderNumber = `ZYN-ORD-${Date.now().toString().slice(-6)}`;

    // Create Order
    const order = new Order({
      orderNumber,
      customerName,
      email,
      shippingAddress,
      items,
      totalAmount,
      status: 'Processing',
      paymentStatus: 'Paid (Simulated)'
    });

    await order.save();

    // Deduct stock for each purchased SKU
    for (const item of items) {
      if (item.sku) {
        await Inventory.findOneAndUpdate(
          { sku: item.sku },
          { $inc: { stockQuantity: -item.quantity } }
        );
      }
    }

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
