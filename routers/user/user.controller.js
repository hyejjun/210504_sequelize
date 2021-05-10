const {User} = require('../../models/index');       //User라는 객체를 가져오기 위해서 접근
const Sequelize = require('sequelize');
// server.js에서 views라는 폴더에 이미 접근해있기때문에 거기서 부터 시작하면됨
let join = (req,res)=>{
    res.render('./user/join.html');     //server.js 파일에서 실행이 되니까 server.js 파일 기준으로 위치를 써줘야 한다. (이미 views 폴더까지는 들어가있음)
}

let login = (req,res)=>{
    res.render('./user/login.html');
}

let logout = (req,res)=>{
    delete req.session.isLogin;
    delete req.session.uid;

    req.session.save(()=>{
        res.redirect('/');
    })
}
// 이 부분만 API, db에 요청해서 json으로 받아오는
let info = async (req,res)=>{
    let userList = await User.findAll({
        attributes:['id','userid','userpw','username','gender','userimage',
        [Sequelize.fn('date_format',Sequelize.col('userdt'), '%Y-%m-%d'),'userdt']]
    });
    //console.log(userList);
    /*
    res.render('./user/info.html',{
        userList : userList
    });
    */
    res.json({
        userList,
    })
}


let join_success = async (req,res)=>{
    let userid = req.body.userid;   // 1. 이렇게 변수 설정하고 
    let userpw = req.body.userpw;
    let username = req.body.username;
    let gender = req.body.gender;

    await User.create({
        userid,     // 2. userid : userid 와 같은 구문 - 이건 js 구문이라서 받아들여야함.
        userpw,
        username,
        gender,
    });
    res.render('./user/join_success.html',{
        userid,
        username,
    });
}


let login_check = async(req,res)=>{
    let userid = req.body.userid;
    let userpw = req.body.userpw;

    let result = await User.findOne({
        where:{ userid, userpw }  //userid:userid, userpw:userpw 이것도 줄여서 쓴것
    });

    //성공하면 넣어줌
    req.session.uid = userid;
    req.session.isLogin = true;     // 로그인 잘 됐는지 개발자가 확인하는 부분

    req.session.save(()=>{      //세션에 저장하고 메인페이지로 이동해라
        res.redirect('/');
    })
}


module.exports = {
    join : join,        // 변수 : 함수
    login : login,
    info : info,
    join_success : join_success,
    login_check : login_check,
    logout,     //logout : logout
}