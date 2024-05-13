const express = require('express');
const productController = require('../controllers/products.controller');
const productRouter = express.Router();


productRouter.post('/', productController.createProduct);
productRouter.get('/:productId', productController.getProductById);
productRouter.get('/', productController.getProducts)
productRouter.put('/:productId', productController.updateProduct)
productRouter.delete('/:productId', productController.deleteProduct)

module.exports = productRouter