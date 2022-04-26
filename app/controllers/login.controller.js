
const fs = require("fs");
var file = "././app/DB/view.json";


exports.getIndexPage = async (req,res) =>{
  let user = {uname: '', firstName : ''};

    var ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

    if(req.uname) {
      user.uname = req.uname;
      user.mode = req.mode;
  }
    
    fs.readFile(file, (err, data) => {

        if (err) {
          res.render('index', {'data': user, 'msg': err});
          return;
        }

        let valjson = JSON.parse(data);
        console.log("Total unique Views: " +Object.keys(valjson).length);
        let viewer = valjson[ipAddress];
        //To delete
        // const filterUser = existUsers.filter( user => user.username !== username )
        if (!viewer || viewer == undefined) {
          valjson[ipAddress] = {"count":1, "date": new Date()};
          fs.writeFile(file, JSON.stringify(valjson), (err) => {
            if (err) return res.render('index', {'data': user, 'msg': err});
          });
        } 
        else {
            const today = new Date();
            const date = valjson[ipAddress]["date"].split('T')[0];
            
            if(date !== today.toISOString().slice(0,10)){
                valjson[ipAddress]["date"] = today;
                valjson[ipAddress]["count"] += 1;
                fs.writeFile(file, JSON.stringify(valjson), (err) => {
                    if (err) throw err;
                });
            }
        }
        res.render('index', {'data': user,  'msg':''});
      });

    
}

exports.getLogoutPage = async (req, res)=>{
  res.clearCookie('jwt');
  let user = {}
  res.render('index',{data:user, msg:''});
}

exports.getLoginPage = async (req,res) =>{
  let user = {uname: '', pwd: '', firstName : '',
  lastName : '', email : '', phone : ''};
  if(req.uname) user.uname = req.uname;
    res.render('login',{data:user, msg:''});
}

const saveData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(file, stringifyData)
}
const getData = () => {
    const jsonData = fs.readFileSync(file)
    return JSON.parse(jsonData)   
}