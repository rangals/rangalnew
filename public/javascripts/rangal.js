
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

function showMsg(msg){
    alert(msg);
    const toast = new Toast({
        position: "top-right" , 
        text: msg,
        autoClose:false , 
        showProgress: false,
        // onClose: ()=> alert("closed"),
        canClose: true,
        pauseOnHover:true,
        pauseOnFocusLoss: true,
        toastType: 'info'//success, error, info
    });
}