
let lastLogin = new Date().toDateString();
let getLastLogin = localStorage.getItem("lastLogin");

if (getLastLogin == null || (lastLogin != getLastLogin))
{
    setTimeout(() =>{
        document.body.classList.remove("intro");
        document.body.classList.remove("endIntro");
    }, 3700);

    setTimeout(() =>{
        document.body.classList.add("noIntro");
    }, 3500);

    setTimeout(() =>{
        document.body.classList.add("endIntro");
    }, 2000);

    localStorage.setItem("lastLogin", lastLogin);
}
else
{
    document.body.classList.remove("intro");
    document.body.classList.add("noIntro");
}

function changeMode(){
    // let mode = document.querySelector(".mode input");
    //Default night mode
    document.body.classList.toggle('dark');
    // if(mode.checked)    document.body.classList.add("night");
    // else document.body.classList.remove("night");
    
}


const btn = document.querySelector(".closeButton .lnkbtn");

btn.addEventListener('click',()=>{
    var link = document.querySelector('.navlinks');
    var menubar = document.querySelector('.menu');
    var viewBtn = document.querySelector('.hero-btn');
    // var abtProfile = document.querySelector('.aboutPage .profile');
    link.classList.toggle('mobile-menu');//Change menu display
    menubar.classList.toggle('menu-back'); //Change background
    menubar.classList.toggle('zindex'); //Change background
    btn.classList.toggle('menu-index'); //change button index
    if(viewBtn) viewBtn.classList.toggle('displayNone');
    // if(abtProfile) viewBtn.classList.toggle('zindex');
})

function copyData(ctrl) {
    let val='';
    if (ctrl ==='ttEmail')	
        val = 'rangalsoftwares@gmail.com'
    else if(ctrl === 'ttContact')
        val = '+91 6374694979'
    else{
        var copyText = document.querySelector("#"+ ctrl + " + span");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
    }

    var k = document.createElement('input');
    k.value = val;
    document.body.appendChild(k);
    k.select();
    document.execCommand('copy');
    // navigator.clipboard.writeText(val);
    document.body.removeChild(k);
    
    var tooltip = document.querySelector("#"+ ctrl);
    tooltip.innerText = "Copied: " + val;
}

function outFunc(ctrl) {
    var tooltip = document.querySelector("#"+ ctrl);
    tooltip.innerText = "Click to Copy";
}


function userRegistration(){
    let pwd = document.getElementsByName('txtLoginPwd')[0].value;
    let pwd2 = document.getElementsByName('txtRegPwd2')[0].value;

    if(pwd !== pwd2){
        alert('Password not matched', pwd, pwd2);
        return false;
    }
    return true;
}

function showMsg(msg, time = 0){
    
    const toast = new Toast({
        position: "top-right" , 
        text: msg,
        autoClose: time > 0? time*1000: false , 
        showProgress: time > 0,
        // onClose: ()=> alert("closed"),
        canClose: true,
        pauseOnHover:true,
        pauseOnFocusLoss: true,
        toastType: 'info'//success, error, info
    });
}

function getRegister(data){
    // let sp = document.querySelector(".output");
    // sp.innerHTML = data.id + ' ' + data.title;
    alert(data.msg);
    // console.log(data.msg);
    if(data.msg === "Success")
    {
        let lnkUser = document.querySelector("#lnkUser");
        let lnkLogin = document.querySelector("#lnkLogin");
        lnkLogin.classList.toggle('hideContent');
        lnkUser.classList.toggle('hideContent');
        displayRegister('none');
        displayLogin('none');
    }
    
    return false;    
}

function getOTP(){
    let page = window.location.href;
    let uname = (page.search('profile') > -1? 
                document.getElementsByName('txtLoginUsrName')[0].innerText 
               : document.getElementsByName('txtLoginUsrName')[0].value);
    let email = '';
   
    try{
        email = document.getElementsByName('txtRegEmail')[0].value;
    }
    catch(err) {}//In the password reset page, this field is not applicable

    if (uname.length == 0){
        alert('User Name is required!');
        return;
    }

    dat = JSON.stringify({
        page: page,
        uname: uname,
        email: email
    });
    
    callAPI('POST',"/login/getOTP", dat, (res)=> {alert(res.msg);});

}

//--------------------------------------------------------------------------------
//                              Edit Div Functions
//--------------------------------------------------------------------------------

function editMode(){
    
    document.querySelector('.editModeOn > .material-icons.editOFF').classList.toggle('contentHide');
    document.querySelector('.editModeOn > .material-icons.editOn').classList.toggle('contentHide');

    let content = document.querySelectorAll('.editMode')
    content.forEach(c => c.classList.toggle('contentHide'));

    let vcontent = document.querySelectorAll('.viewMode');
    vcontent.forEach(c => c.classList.toggle('contentHide'));

}

function editContent(ctrl){
    let label = document.getElementById(ctrl);
    label.querySelector('.editContent').classList.toggle('contentHide');

    let closecontent = label.querySelectorAll('.closeContent');
    closecontent.forEach(c => c.classList.toggle('contentHide'));
}

function cancelChange(ctrl){
    let label = document.getElementById(ctrl);
    if(ctrl.search('txtarea') > -1)
        label.getElementsByTagName('textarea')[0].value =  document.querySelector('#'+ctrl+' + .viewMode').textContent.trim();
    if(ctrl.search('txtbox') > -1)
        label.querySelector('input.txtbox').value =  document.querySelector('#'+ctrl+' + .viewMode').textContent.trim();

    resetControl(ctrl);
}

function saveChange(ctrl){
    let control = '';
    let label = document.getElementById(ctrl);
    if(ctrl.search('txtarea') > -1)
        control = label.getElementsByTagName('textarea')[0]
    if(ctrl.search('txtbox') > -1)
        control = label.querySelector('input.txtbox');

    if(control){
        let field = control.attributes['field'].name;
        let value = control.value;
        
        // alert({field: field, value : value});
        document.querySelector('#'+ctrl+' + .viewMode').innerText = value;
        
        resetControl(ctrl);
        return;
    }
   alert("Couldn't find the input field!");

}

function resetControl(ctrl){
    document.querySelector('#'+ctrl+' > input').checked = false;    

    let is = document.querySelectorAll('#'+ctrl+' label');
    document.querySelector('#'+ctrl+' > i').classList.toggle('contentHide');
    is[0].classList.toggle('contentHide');
    is[1].classList.toggle('contentHide');
}


//--------------------------------------------------------------------------------
//                              Common functions
//--------------------------------------------------------------------------------
function callAPI(method, url, data, fn)
{
    //  Post request using fetch()
    fetch(url, {
        method: method,// Adding method type
        body: data, // Adding body or contents to send
        headers: { // Adding headers to the request
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) =>{ // Converting to JSON
            return response.json()})
    .then((json) => { // Displaying results to console
        //alert(json);
        fn(json);//callback function
    });
        
}