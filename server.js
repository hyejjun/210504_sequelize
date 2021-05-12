const express = require('express');
const {sequelize} = require('./models/index');    //객체
const {User} = require('./models/index');          //User라는 변수만 가져오게됨
const app = express();

const router = require('./routers/index');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const session = require('express-session');     // npm install express-session
const cors = require('cors');


app.use(cors());


app.set('view engine', 'html');
nunjucks.configure('views',{
    express:app,
})



// 세션 설정값
app.use(session({
    secret : 'aaa',
    resave : false,
    saveUninitialized:true,
}));

app.use(bodyParser.urlencoded({extended:false}));


sequelize.sync({ force : false, })      // server 다시 켤때마다 db초기화 된다면 true를 false값으로 바꿔주기
.then(()=>{
    console.log('접속 성공');
})
.catch(()=>{
    console.log('접속 실패');
})

// 두가지의 미드웨어가 들어갈 수 있다.
app.use('/',router);   //비동기


app.listen(3000,()=>{
    console.log('server 3000');
})