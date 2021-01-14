const express = require('express');
const router = express.Router();

const cartControllerApi = require('../../controllers/api/cartController');

router.get('/cart', cartControllerApi.cart);
router.get('/addcart', cartControllerApi.addcart);
router.get('/removecart', cartControllerApi.removecart);

module.exports = router;