// const express = require('express')
// const router = express.Router()

// const { authJwt } = require("../middleware");
const usercontroller = require("../controllers/user.controller");
const logincontroller = require("../controllers/login.controller");
const authcontroller = require("../controllers/auth.controller");
const { authJwt, utils } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/login",authJwt.checkToken, logincontroller.getLoginPage);
  app.get("/logout",authJwt.checkToken, logincontroller.getLogoutPage);
  app.get("/login/register", usercontroller.getRegisterPage);
  app.get("/login/forgot", usercontroller.getForgotPage);
  app.post("/login", authcontroller.loginUser);
  app.post("/login/register",authJwt.checkOTP, usercontroller.registerUser);
  app.post("/login/forgot",authJwt.checkOTP, usercontroller.forgotUser);
  app.post("/login/getOTP", usercontroller.sendOTP, utils.sendMail);
  
  
  // app.get(
  //   "/api/test/user",
  //   [authJwt.verifyToken],
  //   controller.userBoard
  // );
  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );
  // app.get(
  //   "/api/test/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
};


