const express = require('express');
const router = express.Router();
const controller = require('./user.controller');


//해당 폴더의 하위 URL을 관리하는 파일
//join login info - 사용자정보
// localhost:3000/user/join
router.get('/join',controller.join);             //localhost:3000/user/join
router.get('/login',controller.login);
router.get('/logout',controller.logout);
router.get('/info',controller.info);

router.post('/join_success',controller.join_success);
router.post('/login_check',controller.login_check);



module.exports = router;