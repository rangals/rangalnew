exports.getAboutPage = async (req,res) =>{
    let user = {};
    if(req.uname) user.uname = req.uname;
    res.status(200).render('about', {data : user});
}