const passport = require('../passport');

var express = require('express');
var router = express.Router();
const footweawrController = require('../controllers/footwearsController');
const e = require('express');

function loggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.status == "active") {
            console.log('Chua active');
            res.redirect('/users/active');

        } else {
            return next();
        }
    } else {
        res.redirect('/users/login');
    }
}
router.get('/', footweawrController.index);
router.get('/about', footweawrController.about);
router.get('/contact', footweawrController.contact);
router.get('/cart', loggedIn, footweawrController.cart);
router.get('/checkout', footweawrController.checkout);
router.get('/men', footweawrController.men);
router.get('/women', footweawrController.women);
router.get('/order-complete', footweawrController.ordercomplete);
router.get('/footwears', footweawrController.product)
module.exports = router;