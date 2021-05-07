// 실질적인 코드가 들어가는 부분 controller
let main = (req,res)=>{
    console.log(req.session);
    res.render('./index.html',{
        userid:req.session.uid,
        isLogin:req.session.isLogin     // 성공시 true
    });
}

exports.main = main;