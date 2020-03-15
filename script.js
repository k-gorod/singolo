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
    var cellGrid =document.getElementsByClassName("portfolio__grid")[0];
    setVisibleItems(cellList,12);
    cellGrid.addEventListener('mousedown',(e)=>{
        setActive(cellList,e.target.parentElement,"border");
   })
}
const setActive = (arr,active,setClass) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i].classList.remove(setClass);
    }
    active.classList.add(setClass);
}
const setVisibleItems = (arr,n) => {
    for (let i = 0; i < arr.length; i++) {
        if(i>n-1){arr[i].classList.add("hide");}
        else {
            arr[i].addEventListener
        }
    }
}
