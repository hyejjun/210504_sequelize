const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/',(req,res)=>{
    //res.send('hello world');
    res.json({
        success:true,
    });
});

app.listen(3001,()=>{
    console.log('server 3001');
});

// localhost:3000 부분 연결해서 쓸때는 이 server.js 가 아예 필요 없음
