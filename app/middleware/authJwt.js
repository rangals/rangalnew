const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

// const db = require("../models");
// const User = db.user;

//This is only check the access and will not block the request
checkToken = (req, res, next) =>{
  
  let accessToken = req.cookies.jwt;
  jwt.verify(accessToken, config.secret, (err, decoded) => {
    if (!err) {
      req.uname = decoded.id.user.uname;
      req.mode = decoded.id.user.mode;
    }
  });
  next();
}


verifyToken = (req, res, next) => {
  let accessToken = req.cookies.jwt;
 
  // var {token = ''} = (/Bearer\s+(?<token>.*)/.exec(req.get('Authorization') || '') || {}).groups || {}
  // console.log('token: '+token)
  // let token = req.headers["x-access-token"];
  if (!accessToken) {
    return res.status(403).send({
      message: "Session out. Please login!"
    });
  }
  jwt.verify(accessToken, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.uname = decoded.id;
    next();
  });
};

checkOTP = (req, res, next)=>{
  let user = {uname: '', otp: ''};

  user.uname = (req.uname ? req.uname : user.uname);
  user.uname = (req.body.txtLoginUsrName ? req.body.txtLoginUsrName : user.uname);
  
  user.otp = (req.body.txtOTP ? req.body.txtOTP : user.otp);
  
  let accessToken = req.cookies.otp;
  jwt.verify(accessToken, config.secret, (err, decoded) => {
    if (!err) {
      if(decoded.id.uname === user.uname && decoded.id.otp === user.otp )
        return next();
    }
    return res.status(403).send({
      message: err
    });
  });
  
}


getToken = (uname, mode, otp='')=> jwt.sign({ id: uname, mode: mode, otp: otp }, config.secret, {
  expiresIn: 3600 // 1 hour 
});
const authJwt = {
    verifyToken: verifyToken,
    getToken: getToken,
    checkToken: checkToken,
    checkOTP: checkOTP,
    // isAdmin: isAdmin,
    // isModerator: isModerator,
    // isModeratorOrAdmin: isModeratorOrAdmin
  };
  module.exports = authJwt;