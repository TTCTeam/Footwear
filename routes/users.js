var express = require('express');
const passport = require('../passport');
var nodemailer = require('nodemailer');
var router = express.Router();

const accountController = require('../controllers/accountController');

function loggedIn(req, res, next) {
    if (req.isAuthenticated()) {

        return next();

    } else {
        res.redirect('/users/login');
    }
}

/* Login */
router.get('/login', function(req, res, next) {
    res.render('login/login', { title: "Login" });
});

router.post("/login", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: false
}));


/* Sign Up */


/* GET home page. */
router.get('/signup', function(req, res, next) {
    res.render('signup/signup', { title: 'Signup' });
});

router.post("/signup", accountController.addUser);

/* Edit Profile */
router.get('/:id/edit', accountController.renderProfile);

router.post('/:id/edit', accountController.updateProfile);

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});
router.get('/active', loggedIn, accountController.active);
router.post('/active', loggedIn, accountController.activeUser);

module.exports = router;