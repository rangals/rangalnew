
const fs = require("fs");
var file = "././app/DB/view.json";


const { pageData } = require("../middleware");


exports.getIndexPage = async (req,res) =>{
  let user = {uname: '', firstName : ''};
  let resData = pageData.getPageData('homepage');
  var ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

  if(req.uname) {
    user.uname = req.uname;
    user.mode = req.mode;
  }

  fs.readFile(file, (err, data) => {

    if (err) {
      resData.msg = err;
      return res.render('index', resData);
    }

    let valjson = JSON.parse(data);
    console.log("Total unique Views: " +Object.keys(valjson).length);
    let viewer = valjson[ipAddress];
    
    if (!viewer || viewer == undefined) {
      valjson[ipAddress] = {"count":1, "date": new Date()};
      fs.writeFile(file, JSON.stringify(valjson), (err) => {
        if (err) {
          resData.msg = err;
          return res.render('index', resData);
        }
      });
    } 
    else {
        const today = new Date();
        const date = valjson[ipAddress]["date"].split('T')[0];
        
        if(date !== today.toISOString().slice(0,10)){
            valjson[ipAddress]["date"] = today;
            valjson[ipAddress]["count"] += 1;
            fs.writeFile(file, JSON.stringify(valjson), (err) => {
              if (err) {
                resData.msg = err;
                return res.render('index', resData);
              }
            });
        }
    }
    resData.data = user;
    res.render('index', resData);
  });
    
}

exports.getLogoutPage = async (req, res)=>{
  res.clearCookie('jwt');
  let resData = pageData.getPageData('homepage');
  res.render('index',resData);
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