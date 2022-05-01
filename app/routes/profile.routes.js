
const { authJwt } = require("../middleware");
const profilecontroller = require("../controllers/profile.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.get("/profile",authJwt.checkToken, profilecontroller.getProfilePage);
    app.post("/profile/profileUpdate",authJwt.checkToken,authJwt.checkOTP, profilecontroller.updateProfile);
  };