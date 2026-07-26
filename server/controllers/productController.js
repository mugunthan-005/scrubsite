const Product = require('../models/Product');
const Inventory = require('../models/Inventory');

exports.getProducts = async (req, res) => {
  try {
    const { category, gender, size, color, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (gender) query.gender = gender;
    if (size) query.sizes = size;
    if (color) query['colors.name'] = color;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    // Auto-create inventory records for each size & color combination
    for (const size of product.sizes) {
      for (const col of product.colors) {
        const skuCode = `ZYN-${product.slug.toUpperCase().slice(0, 4)}-${size}-${col.name.toUpperCase().replace(/\s+/g, '')}`;
        await Inventory.create({
          sku: skuCode,
          productId: product._id,
          productName: product.name,
          size,
          color: col.name,
          stockQuantity: 45,
          reorderThreshold: 15,
          unitCost: Math.round(product.price * 0.35)
        });
      }
    }

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
