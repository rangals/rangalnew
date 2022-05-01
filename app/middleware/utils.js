const req = require("express/lib/request");
const config = require("../config/auth.config.js");
const authJwt = require("./authJwt.js");


  sendMail = (req, res) =>{
    var nodemailer = require('nodemailer');
    let email = req.email;
    let subject = req.subject;
    let msg = req.msgcontent;
    try{
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.semail,
          pass: config.epass
        }
      });
      
      var mailOptions = {
        from: config.semail,
        to: email,
        subject: subject,
        html: msg
      };
      
      if(config.env !== 'prod') return res.send({msg: "OTP Sent Successfully"});
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return res.send(`{"msg": "${error}", "id": "Error"}`); ;
        } else {
          console.log('Email sent: ' + info.response);
          const oneDayToSeconds = 15 * 60 * 60; //15 minutes
          let token = authJwt.getToken({uname: userName, otp: otp});
          res.cookie("otp", token, {maxAge: oneDayToSeconds, httpOnly: true});//{secure: false, 
          return res.send({msg: "OTP Sent Successfully"});
        }
      });
      
    }
    catch(err){ console.log(err); return res.send({msg: err});}
}

  generateOTP = (min = 100000, max = 999999) => {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }



const utils = {
    sendMail: sendMail,
    generateOTP: generateOTP
  };
  module.exports = utils;