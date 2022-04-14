// const express = require('express')
// const router = express.Router()

const { authJwt } = require("../middleware");
const usercontroller = require("../controllers/user.controller");
const authcontroller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/login", usercontroller.getLoginPage);
  app.get("/login/register", usercontroller.getRegisterPage);
  app.get("/login/forgot", usercontroller.getForgotPage);
  app.post("/login", authcontroller.loginUser);
  app.post("/login/register", usercontroller.registerUser);
  app.post("/login/forgot", usercontroller.forgotUser);
  app.get("/login/getOTP", async (req, res) => {console.log('print OTP'); res.render('login/register')});
  
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


