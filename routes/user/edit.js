const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('edit/edit', { title: "Edit" });
});

router.post("/", function(req, res) {

});
module.exports = router;