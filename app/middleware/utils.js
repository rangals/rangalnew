const config = require("../config/auth.config.js");

sendMail = (email, subject, msg ) =>{
    var nodemailer = require('nodemailer');
      
    try{
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'RangalServices@gmail.com',
        pass: config.epass
      }
    });
    
    var mailOptions = {
      from: 'RangalServices@gmail.com',
      to: email,
      subject: subject,
      html: msg
    };
    
    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     return error;
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //     return 'success';
    //   }
    // });
    return 'success';
    }
    catch(err){ return 'Error occured in sending mail';}
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