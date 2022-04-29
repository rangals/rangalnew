const { authJwt  } = require("../middleware");
const fs = require("fs");

var userFile = "././app/DB/user.json";

exports.getProfilePage = async (req,res) =>{
    let user = {};
    if(!req.uname) return res.render('profile', {'data':user, 'msg': 'Please login!', 'id':'error'});

    if(req.uname) {
        user.uname = req.uname;
        user.mode = req.mode;

        fs.readFile(userFile, (err, data) => {
            if (err) {
                return res.render('profile', {'data':user, 'msg': err, 'id':'error'});
            }
            // let val = data.toString();
            let valjson = JSON.parse(data);
            let usr = valjson["users"].find((c) => c.uname === user.uname);
            //console.log(usr);
            if (usr) {
                user.firstName = usr.firstName;
                user.lastName = usr.lastName;
                user.email = usr.email;
                user.mobile = usr.mobile;
                return res.render('profile', {'data':user, id:'success', 'msg': ''});
            }
            return res.render('profile', {'data': user, 'msg': 'User not found!', 'id':'error'});
        });
    }    
}

exports.updateProfile = async (req, res) =>{
    let user = {};
    // let usr = authJwt.getUserDetails(req);
    // console.log(usr);
    user.uname = req.uname;
    user.otp = (req.body.txtOTP ? req.body.txtOTP : '');

    console.log(user);
    if(!checkOTP(req, user)){
        res.render('profile',{data:user, msg:'Incorrect OTP or it expired!'});
        return;
    }
   
    user.firstName = (req.body.txtLoginFirstName ? req.body.txtLoginFirstName : '');
    user.lastName = (req.body.txtLoginLastName ? req.body.txtLoginLastName : '');
    user.phone = (req.body.txtRegMobile ? req.body.txtRegMobile : '');
    user.email = (req.body.txtRegEmail ? req.body.txtRegEmail : '');

    fs.readFile(userFile, (err, data) => {
      if (err) {
        res.render('profile',{data:user, msg:err});
        return;
      }
      // let val = data.toString();
      let valjson = JSON.parse(data);
  
      let usr = valjson["users"].find((c) => c.uname === user.uname);
      
      if (usr) {
        usr.uname =user.uname;
        usr.firstName = user.firstName;
        usr.lastName = user.lastName;
        usr.phone = user.phone;
        usr.email = user.email;

        filteredList = valjson["users"].filter((c) => c.uname !== user.uname)
        filteredList.push(usr);
        let filedata = {"users":filteredList};
        fs.writeFile(userFile, JSON.stringify(filedata), (err) => {
          if (err) {
            res.sendStatus(400).render('profile',{'data':usr, 'msg':err});
            return;
          }
        });
        res.render('profile',{'data':usr, 'msg':'Password reset is success!'});
        return;
      } 
    });
}


function checkOTP(req, user){

    let val = authJwt.getOTPData(req);
   
    if(val.uname === user.uname && val.otp === user.otp )
      return true;
    return false;  
  }