const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/upload.js');

router.post('/',upload.single('image'), productController.createProduct);
// router.post('/upload', productController.uploadImage);
router.put('/:productId',upload.single('image'), productController.editProduct);
router.get('/', productController.listProducts);
router.get('/search', productController.searchProducts);
router.get('/filter', productController.filterProductsByDate);

module.exports = router;
