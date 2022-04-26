const bcrypt = require("bcryptjs");


const { authJwt } = require("../middleware");

const fs = require("fs");
var userFile = "././app/DB/user.json";

exports.loginUser = async (req, res) =>{
  let user = {};
    user.uname = (req.body.txtLoginUsrName ? req.body.txtLoginUsrName : '');
    user.pwd = (req.body.txtLoginPwd ? req.body.txtLoginPwd : '');
    user.mode = (req.body.rbUserRole ? req.body.rbUserRole : '');
    
    //    res.render('login',{data:user, msg:'in progress!'});
    // return;
    fs.readFile(userFile, (err, data) => {
        if (err) {
          return res.render('login',{data:user, msg:err});
        }
        // let val = data.toString();
        // console.log(val);
        let valjson = JSON.parse(data);
        let usr = valjson["users"].find((c) => c.uname === user.uname);
        //console.log(usr);
        if (!usr) {
          res.render('login',{data:user, msg:'Invalid User name'});
            return;
        };
        var passwordIsValid = bcrypt.compareSync(
          user.pwd,
          usr.pwd
        );
        if (!passwordIsValid){
          res.render('login', {data:user, msg:'Incorrect Password'});
          return;
        }
        
        if(usr.role !== user.mode){
          res.render('login',{data:user, msg:`You have only ${usr.role} access!`});
            return;
        }

        // user.uname = 'Welcome ' + user.uname;
        let token = authJwt.getToken({user :{uname: user.uname, mode: usr.role}});
        // console.log('accessToken: '+token);
        // req.session.user =  user.uname;
        // req.session.accessToken = token;

        const oneDayToSeconds = 60 * 60 * 60;
        res.cookie("jwt", token, {maxAge: oneDayToSeconds, httpOnly: true, secure: process.env.NODE_ENV === 'production'? true: false})//{secure: false, 
        res.render('index', {data: user});
        return;
        
      });  
}