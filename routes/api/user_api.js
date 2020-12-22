const express = require('express');
const router = express.Router();

const userControllerApi = require('../../controllers/api/userController');

router.get('/is-exist', userControllerApi.isExist);
router.get('/paging', userControllerApi.productsPaging);
module.exports = router;