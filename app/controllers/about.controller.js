exports.getAboutPage = async (req,res) =>{
    let user = {};
    if(req.uname) {
        user.uname = req.uname;
        user.mode = req.mode;
    }
    console.log('abour'+user.uname);
    res.status(200).render('about', {'data': user});
}