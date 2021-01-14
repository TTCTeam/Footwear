const express = require('express');
const router = express.Router();
const productDetailController = require('../controllers/productDetailController');
const userController = require('../controllers/api/userController');


router.get('/:id', productDetailController.index);
router.get('/:id', userController.commentsPaging);
router.post('/:id', productDetailController.addNewComment);
router.get('/:id', productDetailController.relatedProduct);

module.exports = router;