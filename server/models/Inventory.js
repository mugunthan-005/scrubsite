const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productName: { type: String, required: true },
    size: { type: String, required: true, enum: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'] },
    color: { type: String, required: true },
    stockQuantity: { type: Number, required: true, default: 0 },
    reorderThreshold: { type: Number, required: true, default: 15 },
    warehouseLocation: { type: String, default: 'Main Warehouse - Bay 4' },
    unitCost: { type: Number, required: true },
    fabricStatus: {
      type: String,
      enum: ['In Stock', 'Bulk Fabric Ordered', 'Dyeing Navy', 'Low Raw Material'],
      default: 'In Stock'
    }
  },
  { timestamps: true }
);

// Virtual property to flag low stock warning status
inventorySchema.virtual('isLowStock').get(function () {
  return this.stockQuantity <= this.reorderThreshold;
});

inventorySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Inventory', inventorySchema);
