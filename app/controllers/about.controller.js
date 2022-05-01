const { pageData } = require("../middleware");

exports.getAboutPage = async (req,res) =>{
    let user = {};
    if(req.uname) {
        user.uname = req.uname;
        user.mode = req.mode;
    }
    let resData = pageData.getPageData('aboutpage');
    resData.data = user
    res.status(200).render('about', resData);
}