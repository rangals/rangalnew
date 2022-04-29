
const { authJwt } = require("../middleware");
const admincontroller = require("../controllers/admin.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.get("/admin",authJwt.checkToken, admincontroller.getAdminPage);
    
  };