const { authJwt } = require("../middleware");

const controller = require("../controllers/about.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    // app.get("/about",authJwt.verifyToken, controller.getAboutPage);
    app.get("/about", authJwt.checkToken, controller.getAboutPage);
    
  };
