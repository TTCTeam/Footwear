const express = require('express');
const router = express.Router();

const userControllerApi = require('../../controllers/api/userController');

router.get('/is-exist', userControllerApi.isExist);
router.get('/is-exist-email', userControllerApi.accountExist_Email);
router.get('/sendverifycode', userControllerApi.sendVerifyCode);
router.get('/compareCode', userControllerApi.compareCode);
router.get('/paging', userControllerApi.productsPaging);
router.get('/pagingComment', userControllerApi.commentsPaging);
module.exports = router;