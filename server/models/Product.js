const mongoose = require('mongoose');

const skuSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  size: { type: String, required: true, enum: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'] },
  color: { type: String, required: true },
  barcode: { type: String }
});

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true }
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    price: { type: Number, required: true },
    compareAt: { type: Number },
    category: { type: String, required: true, enum: ['Scrubs', 'Lab Coats', 'Sets', 'Accessories'] },
    gender: { type: String, required: true, enum: ['Men', 'Women', 'Unisex'] },
    description: { type: String, required: true },
    fabricBlend: { type: String, default: '92% Polyester, 8% Spandex (Sample A)' },
    gsm: { type: String, default: '200-220 GSM' },
    fabricType: { type: String, default: 'Knitted Fabric' },
    features: [{ type: String }],
    images: [{ type: String, required: true }],
    sizes: [{ type: String, enum: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'] }],
    colors: [colorSchema],
    skus: [skuSchema],
    bestSeller: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
