const {User} = require('../../models/index');       //User라는 객체를 가져오기 위해서 접근
const Sequelize = require('sequelize');
// server.js에서 views라는 폴더에 이미 접근해있기때문에 거기서 부터 시작하면됨
let join = (req,res)=>{
    res.render('./user/join.html');     //server.js 파일에서 실행이 되니까 server.js 파일 기준으로 위치를 써줘야 한다. (이미 views 폴더까지는 들어가있음)
}

let login = (req,res)=>{
    let flag = req.query.flag;  // login_check 에서 flag 값을 받아서 
    res.render('./user/login.html',{flag})  // html에 flag값을 넘긴다.
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
    let userList = await User.findAll({});
    
    res.render('./user/info.html',{
        userList : userList
    });

    /*
    res.json({
        userList,
    })
    */
}


let join_success = async (req,res)=>{
    let userid = req.body.userid;   // 1. 이렇게 변수 설정하고 
    let userpw = req.body.userpw;
    let username = req.body.username;
    let gender = req.body.gender;
    //let userimage = req.file.path;   // req.file -> Object 여기서 필요한건 path 정보
    let userimage = req.file == undefined ? '':req.file.path;
/*
    try {
        let rst = await User.create({ userid, userpw, username, gender, userimage})
    } catch (error) {
        console.log(e);
    }
*/
    await User.create({
        userid,     // 2. userid : userid 와 같은 구문 - 이건 js 구문이라서 받아들여야함.
        userpw,
        username,
        gender,
        userimage
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
    if (result == null) {
        // 로그인 실패
        res.redirect('/user/login?flag=0');
    } else {
        // 로그인 성공시 로직
        // 세션이라는 공간에 uid라는 변수로 userid를 저장한다.
        req.session.uid = userid;
        req.session.isLogin = true;
        
        // .save() : 쿠키와 세션을 이어줘서 여기에 사용자 정보를 저장한다.
        req.session.save(() => {
            res.redirect('/');
        })
    }
}

let userid_check = async (req,res)=>{
    let userid = req.query.userid;
    let flag = false;
    let result = await User.findOne({
        where:{ userid }
    })

    if(result == undefined){
        //생성 가능
        flag = true;
    }else{
        //생성 불가능
        // flag 자체가 false로 선언되어있어서 else 부분은 사실 필요 없는 부분임
        flag = false;
    }
    res.json({
        login : flag,
        userid,
    })
}


module.exports = {
    join : join,        // 변수 : 함수
    login : login,
    info : info,
    join_success : join_success,
    login_check : login_check,
    logout,     //logout : logout
    userid_check
}