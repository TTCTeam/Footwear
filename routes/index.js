var express = require('express');
var router = express.Router();
const footweawrController = require('../controllers/footwearsController');

/* GET home page. */
/* router.get('/', function(req, res, next) {
    res.render('index', { title: 'Footwear' });
}); */

router.get('/', footweawrController.index);
router.get('/about', footweawrController.about);
router.get('/contact', footweawrController.contact);
router.get('/cart', footweawrController.cart);
router.get('/checkout', footweawrController.checkout);
router.get('/men', footweawrController.men);
router.get('/women', footweawrController.women);
router.get('/order-complete', footweawrController.ordercomplete);
router.get('/footwears', footweawrController.product)
module.exports = router;