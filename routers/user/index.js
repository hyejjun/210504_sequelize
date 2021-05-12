const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const multer = require('multer');
const path = require('path');       //npm install path

// 이 부분은 외우기 or 가져다 쓰기
const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,callback){
            callback(null,'uploads/')   //폴더명
        },
        filename:function(req,file,callback){
            callback(null, new Date().valueOf() + path.extname(file.originalname));
        }
    }),
})

//해당 폴더의 하위 URL을 관리하는 파일
//join login info - 사용자정보
// localhost:3000/user/join
router.get('/join',controller.join);             //localhost:3000/user/join
router.get('/login',controller.login);
router.get('/logout',controller.logout);
router.get('/info',controller.info);
router.get('/userid_check',controller.userid_check);

router.post('/join_success',upload.single('img'),controller.join_success);
router.post('/login_check',controller.login_check);



module.exports = router;