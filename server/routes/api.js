const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const inventoryController = require('../controllers/inventoryController');
const orderController = require('../controllers/orderController');

// Product Routes
router.get('/products', productController.getProducts);
router.get('/products/:slug', productController.getProductBySlug);
router.post('/products', productController.createProduct);

// Inventory Management Routes (Admin Dashboard)
router.get('/inventory', inventoryController.getInventory);
router.get('/inventory/alerts', inventoryController.getLowStockAlerts);
router.get('/inventory/analytics', inventoryController.getAnalytics);
router.put('/inventory/:sku', inventoryController.updateStock);

// Order Routes
router.get('/orders', orderController.getOrders);
router.post('/orders', orderController.createOrder);

module.exports = router;
