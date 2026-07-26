const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  sku: { type: String, required: true },
  productName: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String
    },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Processing'
    },
    paymentStatus: { type: String, default: 'Paid (Simulated)' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
