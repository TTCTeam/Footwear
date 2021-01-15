const passport = require('../passport');
var express = require('express');
var router = express.Router();

const footweawrController = require('../controllers/footwearsController');
const accountController = require('../controllers/accountController');

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

function loggedInWithoutActive(req, res, next) {
    if (req.isAuthenticated()) {

        return next();

    } else {
        res.redirect('/users/login');
    }
}
router.get('/', footweawrController.index);
router.get('/about', footweawrController.about);
router.get('/contact', footweawrController.contact);
// router.get('/cart', loggedIn, footweawrController.cart);
// router.get('/checkout', footweawrController.checkout);
router.get('/men', footweawrController.men);
router.get('/women', footweawrController.women);
// router.get('/order-complete', footweawrController.ordercomplete);
router.get('/footwears', footweawrController.product)

router.get('/forgotpassword', function(req, res, next) {
    res.render('user/forgotpassword', { title: 'Footwear | Forgot Password' });
});

router.post('/forgotpassword', accountController.resetPasswword);

// router.get('/forgotpasswprd/auth', function(req, res, next) {
//     res.render('user/authenticate_resetpass', { title: 'Footwear | Authentication Account' });
// });

// router.post('/forgotpasswprd/auth', accountController.resetPasswword);

router.get('/change-password', loggedInWithoutActive, function(req, res, next) {
    res.render('user/change_password', { title: 'Footwear | Change Password' });
});

router.post('/change-password', loggedInWithoutActive, accountController.updatePassword);
module.exports = router;