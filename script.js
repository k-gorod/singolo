window.onload = function() {
    navMove();
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
const interactivePictures = () => {
    var cellList =document.getElementsByClassName("portfolio__cell");
    for (let i = 0; i < cellList.length; i++) {
        if(i>11){cellList[i].classList.add("hide");}
    }
    cellList.forEach(e =>{
        e.addEventListener("mousedown",() =>{
            cellList.forEach(e=>{e.style = "border:none"})
            e.style = "border:solid 5px #F06C64"
        })
    })
    // document.getElementsByClassName("portfolio__cell")[0].addEventListener('mousedown',() => {
    //     document.getElementsByClassName("portfolio__grid")[0].style ="overflow: visible";   
    // })
    //document.getElementsByClassName("portfolio__grid")[0].style ="overflow: visible";
}
