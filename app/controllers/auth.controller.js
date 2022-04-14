const bcrypt = require("bcryptjs");

const fs = require("fs");
var userFile = "././app/DB/user.json";

exports.loginUser = async (req, res) =>{
  let user = {};
    user.uname = (req.body.txtLoginUsrName ? req.body.txtLoginUsrName : '');
    user.pwd = (req.body.txtLoginPwd ? req.body.txtLoginPwd : '');

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
            res.sendStatus(404);
            return;
        };
        var passwordIsValid = bcrypt.compareSync(
          user.pwd,
          usr.pwd
        );
        if (!passwordIsValid)
        res.render('login', {data:user, msg:'Invalid User Name/Password'});
        else {
          user.uname = 'Welcome ' + user.uname;
          res.render('index', {name: user.uname});
        }
        // res.send(usr);
      });
    // res.sendStatus(200).render('login');
}