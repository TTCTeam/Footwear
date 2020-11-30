const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login/login', { title: "Login" });
});

router.post("/", function(req, res) {

});


module.exports = router;