const express = require('express');
const router = express.Router();

const cartControllerApi = require('../../controllers/api/cartController');

router.get('/cart', cartControllerApi.cart);
router.get('/addcart', cartControllerApi.addcart);

module.exports = router;