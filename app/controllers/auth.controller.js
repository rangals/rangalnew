const bcrypt = require("bcryptjs");


const { authJwt } = require("../middleware");

const fs = require("fs");
var userFile = "././app/DB/user.json";

exports.loginUser = async (req, res) =>{
  let user = {};
    user.uname = (req.body.txtLoginUsrName ? req.body.txtLoginUsrName : '');
    user.pwd = (req.body.txtLoginPwd ? req.body.txtLoginPwd : '');
    
    //    res.render('login',{data:user, msg:'in progress!'});
    // return;
    fs.readFile(userFile, (err, data) => {
        if (err) {
          return console.log(err);
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
        else {
          // user.uname = 'Welcome ' + user.uname;
          let token = authJwt.getToken(user.uname);
          // console.log('accessToken: '+token);
          // req.session.user =  user.uname;
          // req.session.accessToken = token;

          const oneDayToSeconds = 24 * 60 * 60;
          res.cookie("jwt", token, {maxAge: oneDayToSeconds, httpOnly: true, secure: process.env.NODE_ENV === 'production'? true: false})//{secure: false, 
          
          res.render('index', {name: user.uname, accessToken: token});
          // res.send('loggedin');
        }
        // res.send(usr);
      });
    // res.sendStatus(200).render('login');
}