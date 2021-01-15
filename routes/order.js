const express = require('express');
const { route } = require('.');
const router = express.Router();
const orderController = require('../controllers/orderController');


/* Get list of footwears */
router.get('/cart', orderController.cart);
router.get('/checkout', orderController.checkout);
router.get('/ordercomplete', orderController.ordercomplete);
router.get('/bill/:status', orderController.bill);


router.post('/checkout', orderController.payment)


module.exports = router;