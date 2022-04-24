exports.getAboutPage = async (req,res) =>{
    let uname = '';
    if(req.uname) uname = req.uname;
    res.status(200).render('about', {name : uname});
}