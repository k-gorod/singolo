window.onload = function() {
    navMove();
    interactiveCategories();
    interactivePictures();
    }
window.onscroll = function() {
    interactiveLogo();
}
const navMove = () => {
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
