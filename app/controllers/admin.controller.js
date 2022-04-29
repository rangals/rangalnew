exports.getAdminPage = async (req,res) =>{
    let user = {};
    if(req.uname) {
        user.uname = req.uname;
        user.mode = req.mode;
    }
    res.render('admin', {'data': user});
}