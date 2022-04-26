const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

// const db = require("../models");
// const User = db.user;

//This is only check the access and will not block the request
checkToken = (req, res, next) =>{
  let accessToken = req.cookies.jwt;
  jwt.verify(accessToken, config.secret, (err, decoded) => {
    if (!err) {
      req.uname = decoded.id;
    }
    next();
  });
}

getOTPData = (req) =>{
  
  let accessToken = req.cookies.otp;
  let data ={}; //This has to be declared outside of jwt.verify. otherwise it will not return anything
  jwt.verify(accessToken, config.secret, (err, decoded) => {
    if (!err) {
      data.uname = decoded.id.uname;
      data.otp = decoded.id.otp;
    }
  });
  return data;
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



getToken = (uname)=> jwt.sign({ id: uname }, config.secret, {
  expiresIn: 3600 // 1 hour 
});
const authJwt = {
    verifyToken: verifyToken,
    getToken: getToken,
    checkToken: checkToken,
    getOTPData: getOTPData,
    // isAdmin: isAdmin,
    // isModerator: isModerator,
    // isModeratorOrAdmin: isModeratorOrAdmin
  };
  module.exports = authJwt;