const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");
const { authJwt, utils  } = require("../middleware");
const fs = require("fs");

var userFile = "././app/DB/user.json";


exports.getRegisterPage = async (req,res) =>{
  let user = {uname: '', pwd: '', firstName : '',
            lastName : '', email : '', phone : ''};
    res.render('login/register',{data:user, msg:''});
}

exports.getForgotPage = async (req,res) =>{
  let user = {uname: '', pwd: '', firstName : '',
            lastName : '', email : '', phone : ''};
  res.render('login/forgot',{data:user, msg:''});
}

exports.forgotUser = async (req,res) =>{
  let user = {uname: '', pwd: '', firstName : '',
            lastName : '', email : '', phone : ''};
  if(!checkOTP(req)){
    res.render('login/forgot',{data:user, msg:'Incorrect OTP or it expired!'});
    return;
  }
    user.uname = (req.body.txtLoginUsrName ? req.body.txtLoginUsrName : '');
    user.pwd = (req.body.txtRegPwd2 ? req.body.txtRegPwd2 : '');

    fs.readFile(userFile, (err, data) => {
      if (err) {
        res.render('login/forgot',{data:user, msg:err});
        return;
      }
      // let val = data.toString();
      let valjson = JSON.parse(data);
  
      let usr = valjson["users"].find((c) => c.uname === user.uname);
      
      if (usr) {

        usr.pwd = bcrypt.hashSync(user.pwd, 8);
        filteredList = valjson["users"].filter((c) => c.uname !== user.uname)
        filteredList.push(usr);
        let filedata = {"users":filteredList};
        fs.writeFile(userFile, JSON.stringify(filedata), (err) => {
          if (err) {
            res.sendStatus(400).render('login/forgot',{'data':user, 'msg':err});
            return;
          }
        });
        res.render('login/forgot',{'data':user, 'msg':'Password reset is success!'});
        return;
      } 
    });
}


exports.registerUser = async (req, res) =>{
  let user = {};

    user.uname = (req.body.txtLoginUsrName ? req.body.txtLoginUsrName : '');
    user.firstName = (req.body.txtLoginUsrName ? req.body.txtLoginUsrName : '');
    user.lastName = (req.body.txtLoginUsrName ? req.body.txtLoginUsrName : '');
    user.pwd = (req.body.txtLoginPwd ? req.body.txtLoginPwd : '');
    user.email = (req.body.txtRegEmail ? req.body.txtRegEmail : '');
    user.otp = (req.body.txtOTP ? req.body.txtOTP : '');
    user.mobile = (req.body.txtRegMobile ? req.body.txtRegMobile : '');
    // user.role = (req.body.rbUserRole ? req.body.rbUserRole : '');
    user.role= 'user';
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
          // let lastUser = getMax(valjson["users"], "id");
          // let usrid = parseInt(lastUser.id) + 1;
    
          valjson["users"].push(user);
    
          fs.writeFile(userFile, JSON.stringify(valjson), (err) => {
            if (err) throw err;
          });
    
          let token = authJwt.getToken(user.uname);
          const oneDayToSeconds = 24 * 60 * 60;
          res.cookie("jwt", token, {maxAge: oneDayToSeconds, httpOnly: true, secure: process.env.NODE_ENV === 'production'? true: false})//{secure: false, 

          res.render('index', {data:user})
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

exports.sendOTP = async (req, res)=>{
    
    let url = req.body.page;
    let isForgot = url.search('forgot');
    let isRegister = url.search('register');
    let userName = req.body.uname;
    let email = req.body.email;
    
    fs.readFile(userFile, (err, data) => {
      if (err) {
        res.send(`{"msg": "${err}", "id": "Error"}`); 
        return;
      }
      // let val = data.toString();
      let valjson = JSON.parse(data);
  
      let usr = valjson["users"].find((c) => c.uname === userName);
      email = usr?.email || email
      if(!email){
        res.send('{"msg": "Email address not Found!", "id": "Error"}'); 
        return;
      }
      if (!usr && isForgot > -1) {
          res.send('{"msg": "User not Found!", "id": "Error"}'); 
          return;
      } 
      if (usr && isRegister > -1){
        res.send('{"msg": "User already exists!", "id": "Error"}'); 
          return;
      }

      try{
        let otp = utils.generateOTP();
        otp = otp.toString();
        let token = authJwt.getToken({uname: userName, otp: otp});
        
        console.log("OTP: "+otp);
  
        let send = sendOTP(otp, email);
        
        if (send !== 'success'){
          res.send(`{"msg": "${send}", "id": "Error"}`); 
          return;
        }

        const oneDayToSeconds = 15 * 60 * 60; //15 minutes

        res.cookie("otp", token, {maxAge: oneDayToSeconds, httpOnly: true});//{secure: false, 
        res.send('{"msg": "OTP Sent Successfully", "id": "Success"}'); 
        return;
      }
      catch (e){
        res.send(`{"msg": "${e}", "id": "Error"}`); 
        return;
      }
    })
      
}

function checkOTP(req){
  let user = {};
  user.uname = (req.body.txtLoginUsrName ? req.body.txtLoginUsrName : '');
  user.otp = (req.body.txtOTP ? req.body.txtOTP : '');
  let val = authJwt.getOTPData(req);
 
  if(val.uname === user.uname && val.otp === user.otp )
    return true;
  return false;  
}


function sendOTP(otp, email){
  let msg = '<center><h1>Rangal Softwares</h1> <br/>' 
  +'<p>This OTP is to register/reset your details with Rangal. Rangal softwares will use these details only to identify our users and will not use for any other purpose. </p>'
  +'<br/><br/><h3> Your OTP: </h3> <h2>' 
  + otp + '</h2> <br/><br/> <p> Your OTP will expire in 15 minutes </p></center>';

  let sub = 'Email verification';

  return utils.sendMail(email,sub, msg);
}

