var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('signup/signup', { title: 'Signup' });
});

router.post("/", function(req, res) {

});

module.exports = router;