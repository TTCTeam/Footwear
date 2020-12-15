var express = require('express');
const passport = require('../passport');
var nodemailer = require('nodemailer');
var router = express.Router();

const accountController = require('../controllers/accountController');

/* Login */
router.get('/login', function(req, res, next) {
    res.render('login/login', { title: "Login" });
});

router.post("/login", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
}));


/* Sign Up */

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: 'ttc.coopit@gmail.com',
        pass: '18344597',
    },
    secure: false,
});

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

module.exports = router;