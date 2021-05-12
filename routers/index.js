const express = require('express');
const router = express.Router();
const mainRouter = require('./main/index');
const userRouter = require('./user/index');


//모든 url을 관리하는 파일로 따로 빼놓는것
// localhost:3000/대분류/
// localhost:3000/
// localhost:3000/user
// npm install multer
router.use('/user',userRouter);
router.use('/',mainRouter);


module.exports = router;
