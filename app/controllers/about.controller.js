exports.getAboutPage = async (req,res) =>{
    let user = {};
    if(req.uname) {
        user.uname = req.uname;
        user.mode = req.mode;
    }
    res.status(200).render('about', {'data': user});
}