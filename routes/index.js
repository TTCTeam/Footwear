var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Footwear - Free Bootstrap 4 Template by Colorlib' });
});

module.exports = router;