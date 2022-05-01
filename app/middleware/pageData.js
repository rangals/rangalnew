const sitedata = require('./../DB/sitedata.json');

//For backup
const data = {
  "homepage": {
    "p1": "Need a website?",
    "p2": "Starting a website and moving your business online is easy now",
    "p3": "We are here to make it happen for you"
  },
  "aboutpage": {
      "sitemail": "rangalsoftwares@gmail.com",
      "sitenum": "+ 91 6374694979",
      "siteloc": "Puducherry, India",
      "abtmsg":"In this digital era, having the feature to access your business online is inevitable to sustain. Rangal softwares support you to bring your business online with less cost but with more features. We give more importance to our client satisfaction.",
      "exp": "10+ years",
      "skills": "Express, NodeJS, ASP.Net, C#.NET, MS SQL Server, MongoDB"
    }
};

getPageData = (page) =>{

  let resData = {data: '', msg: '', pageData: ''}
  resData.pageData = data[page];//setting default value;

  try{
    let data = sitedata.sitedata[0][page];
    resData.pageData = data;
  }
  catch(e){ 
    resData.msg = e;
  }
  
  return  resData;                    
}

const pageData = {
  getPageData: getPageData,
};
module.exports = pageData;