const express = require('express');
const router = express.Router();
const footwearController = require('../controllers/footwearsController');

/* Get list of footwears */
router.get('/', footwearController.index);


module.exports = router;