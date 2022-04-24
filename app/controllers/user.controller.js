
const bcrypt = require("bcryptjs");

const fs = require("fs");
var userFile = "././app/DB/user.json";
let user = {uname: '', pwd: '', firstName : '',
            lastName : '', email : '', phone : ''};

exports.getRegisterPage = async (req,res) =>{
    res.render('login/register',{data:user, msg:''});
}

exports.getForgotPage = async (req,res) =>{
  res.render('login/forgot',{data:user, msg:''});
}


exports.registerUser = async (req, res) =>{
    
    user.uname = (req.body.txtLoginUsrName ? req.body.txtLoginUsrName : '');
    user.firstName = (req.body.txtLoginUsrName ? req.body.txtLoginUsrName : '');
    user.lastName = (req.body.txtLoginUsrName ? req.body.txtLoginUsrName : '');
    user.pwd = (req.body.txtLoginPwd ? req.body.txtLoginPwd : '');
    user.email = (req.body.txtRegEmail ? req.body.txtRegEmail : '');
    user.otp = (req.body.txtOTP ? req.body.txtOTP : '');
    user.mobile = (req.body.txtRegMobile ? req.body.txtRegMobile : '');

    user.pwd = bcrypt.hashSync(user.pwd, 8),

    fs.readFile(userFile, (err, data) => {
        if (err) {
          return console.log(err);
        }
        // let val = data.toString();
        let valjson = JSON.parse(data);
    
        let usr = valjson["users"].find((c) => c.uname === user.uname);
        //console.log(usr);
        if (!usr) {
    //       res.render('login/register',{data:user, msg:'in progress!'});
    // return;
          let lastUser = getMax(valjson["users"], "id");
          let usrid = parseInt(lastUser.id) + 1;
    
          // var nodemailer = require('nodemailer');
    
          // var transporter = nodemailer.createTransport({
          //   service: 'gmail',
          //   auth: {
          //     user: 'rangalsoftwares@gmail.com',
          //     pass: 'GR18thOct2022'
          //   }
          // });
          
          // var mailOptions = {
          //   from: 'rangalsoftwares@gmail.com',
          //   to: 'bdbaranidharans@gmail.com',
          //   subject: 'Sending Email using Node.js',
          //   html: '<h1>Rangal Softwares</h1>'
          // };
          
          // transporter.sendMail(mailOptions, function(error, info){
          //   if (error) {
          //     console.log(error);
          //   } else {
          //     console.log('Email sent: ' + info.response);
          //   }
          // });
    
          valjson["users"].push(user);
    
          fs.writeFile(userFile, JSON.stringify(valjson), (err) => {
            if (err) throw err;
          });
    
          res.render('index', {name: user.uname})
        } else res.render('login/register',{data:user, msg:'User Name already exists!'})
      });
}

function getMax(arr, prop) {
    var max;
    for (var i = 0; i < arr.length; i++) {
      if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
        max = arr[i];
    }
    return max;
}
