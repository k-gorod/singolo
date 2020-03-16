window.onload = function() {
    activeNav();
    moveNav();
    interactiveCategories();
    interactivePictures();
    form();
    }
window.onscroll = function() {
    interactiveLogo();
}
const activeNav = ()=>{
    var nav = document.getElementsByClassName("header__list")[0];
        
    
    nav.addEventListener('mousedown',(e)=>{
        var active=e.target;
        if(e.target.tagName=="A"){active=e.target.parentElement}
        setActive(nav.children,active,"activeNav")
    })
    
}
const moveNav = () => {
    document.getElementsByClassName("header__navigation")[0].addEventListener('mousedown',(e) => {
        if(e.target!=document.getElementsByClassName("header__navigation")[0]){
        movePage(e.target.innerText.toLowerCase());}
    })
}

const movePage = (str) => {
    document.getElementsByClassName(str)[0].scrollIntoView({behavior: "smooth"})
}

const interactiveLogo = () => {
    var logo=document.getElementsByClassName("header__singolo")[0];
    logo.addEventListener('mousedown',() => {
        movePage("home");
    })
    if(document.documentElement.scrollTop<=80){
        logo.children[0].style = defaultStatus;
        logo.children[0].children[0].style = defaultStatus;
        logo.addEventListener('mouseover',() => {
            logo.children[0].style = defaultStatus;
        })
        logo.addEventListener('mouseleave',() => {
            logo.children[0].style = defaultStatus;
        })
    }
    if(document.documentElement.scrollTop>80){
        logo.children[0].style = "opacity: 0.5; color:rgb(177, 60, 80)"
        logo.children[0].children[0].style = "display:none";
            logo.addEventListener('mouseover',() => {
                logo.children[0].style = "opacity: 1; color:rgb(177, 60, 80);text-shadow: 0 0 2px red;transform: scale(1.09) translate(3px,3px)"
            })
            logo.addEventListener('mouseleave',() => {
                logo.children[0].style = "opacity: 0.5; color:rgb(177, 60, 80)";
            })
    }
    
}
const interactiveCategories = () => {
    var categories = document.getElementsByClassName("portfolio__categories")[0];
    categories.addEventListener('mousedown', (e)=>{
        var cls = "activeCat";
        var active;
        if(e.target.tagName=="P"){active=e.target.parentElement}
        if(e.target.tagName=="DIV"){active=e.target}
        if(e.target.tagName=="NAV"||active.classList.contains(cls)){active=null}
        if(active){picSort(active.children[0].innerText.split(" ")[0])}
        setActive(categories.children,active,cls)
        

    })
    
}
const picSort = (cat) => {
    var cellList =document.getElementsByClassName("portfolio__cell");
    hideAll(cellList);
    setVisibleItems(cellList,cat.toLowerCase());

}
const hideAll = (arr) =>{
    for (let i = 0; i < arr.length; i++) {
        if(!arr[i].classList.contains("hide")){arr[i].classList.add("hide")}
        
    }
}
const setVisibleItems = (arr,cat) => {
    var n=0;
    
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].classList.contains(cat)&&n<12){n++;arr[i].classList.remove("hide");}
    }
    
}

const interactivePictures = () => {
    var cellList =document.getElementsByClassName("portfolio__cell");
    var cellGrid =document.getElementsByClassName("portfolio__grid")[0];
    setVisibleItems(cellList,"all");
    cellGrid.addEventListener('mousedown',(e)=>{
    var cls = "activePic" ;
    if(e.target.parentElement.classList.contains(cls)||e.target.tagName=="DIV"){setActive(cellList,null,cls)}
    else{setActive(cellList,e.target.parentElement,cls)}
    
   })
}
const setActive = (arr,active,setClass) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i].classList.remove(setClass);
    }
    if(active){active.classList.add(setClass)}
}
var form = () => {
    var form = document.getElementsByTagName('form')[0];
    form.getElementsByTagName('button')[0].addEventListener("mouseup", (e)=>{
    var name = form.name.value;
    var email = form.email.value;
    var subject = form.subject.value;
    var describe= form.describe.value;
    showMsg(name,email,subject,describe);
    })
    
}
var showMsg = (name,email,subject,desctibe) => {
    var msg = document.getElementsByClassName("msg")[0];
    var ok = msg.getElementsByClassName('button')[0];
    var p=msg.children[0].children;
    p[0].innerText = "Письмо отправлено";
    p[1].innerText ="Без темы";
    p[2].innerText ="Без описания";
    if(name&&/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        write(p[1],subject,"Тема:  ")
        write(p[2],desctibe,"Описание:  ")
    }else{write(p[1]," "),write(p[2]," "),write(p[0]," ")}
    if(!name){write(p[0],"Введите имя")}
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)==false){write(p[1],"Введите корректно email")}
    
    msg.classList.remove('hide');
    ok.addEventListener('mouseup',(e)=>{
        msg.classList.add('hide');
        
    })
    
}
const write = (node,text,pre) => {
    if(!pre)pre="";
    if(text){node.innerText = pre+text}
}