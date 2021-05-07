const express = require('express');
const {sequelize} = require('./models/index');    //객체
const {User} = require('./models/index');          //User라는 변수만 가져오게됨
const app = express();

const router = require('./routers/index');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const session = require('express-session');     // npm install express-session

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


sequelize.sync({ force : false, })
.then(()=>{
    console.log('접속 성공');
})
.catch(()=>{
    console.log('접속 실패');
})


app.use('/',router);


app.listen(3000,()=>{
    console.log('server 3000');
})