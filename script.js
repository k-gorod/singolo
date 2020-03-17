window.onload = function() {//Действия после загрузки страницы
    activeNav();
    moveNav();
    interactiveCategories();
    interactivePictures();
    form();
    }
window.onscroll = function() {//Реакция на скролл
    interactiveLogo();
}
const activeNav = ()=>{//Выбор активного нава
    var nav = document.getElementsByClassName("header__list")[0];
    nav.addEventListener('mousedown',(e)=>{
        var active=e.target;
        if(e.target.tagName=="A"){active=e.target.parentElement}//Обработка миссклика
        setActive(nav.children,active,"activeNav")//Присвоение активного класса активированному элементу
    })
}
const moveNav = () => {//Движение по нажатию на Nav
    document.getElementsByClassName("header__navigation")[0].addEventListener('mousedown',(e) => {
        if(e.target!=document.getElementsByClassName("header__navigation")[0]){//Обработка миссклика
        movePage(e.target.innerText.toLowerCase());}//Скользим к блоку, соответствующему нажатому тексту нав элемента
    })
}

const movePage = (str) => {//Скольжение страницы к заданному маркеру
    document.getElementsByClassName(str)[0].scrollIntoView({behavior: "smooth"})
}

const interactiveLogo = () => {//Красивый логотип. При нажатии плавно возвращает страницу в исходное состояние
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
        if(e.target.tagName=="P"){active=e.target.parentElement}//-->
        if(e.target.tagName=="DIV"){active=e.target}//-->
        if(e.target.tagName=="NAV"){active=null}//Обработка мисскликов
        if(active){picSort(active.children[0].innerText.split(" ")[0])}//Сортировка по выбранной категории
        setActive(categories.children,active,cls)//Выделение активной категории
        

    })
    
}
const picSort = (cat) => {//Сортировка по выбранной категории
    var cellList =document.getElementsByClassName("portfolio__cell");
    hideAll(cellList);
    setVisibleItems(cellList,cat.toLowerCase());

}
const hideAll = (arr) =>{
    for (let i = 0; i < arr.length; i++) {
        if(!arr[i].classList.contains("hide")){arr[i].classList.add("hide")}//Обнуляет список видимых элементов
    }
}
const setVisibleItems = (arr,cat) => {
    var n=0;
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].classList.contains(cat)&&n<12){n++;arr[i].classList.remove("hide");}//Делает видимыми элементы соответствующие категории. (12-по условию)
    }
}

const interactivePictures = () => {
    
    var cellGrid =document.getElementsByClassName("portfolio__grid")[0];//сетка
    var cellList =cellGrid.children;//Ячейки сетки
    setVisibleItems(cellList,"all");//Первая сортировка(показываются все первые 12 элементов)
    cellGrid.addEventListener('mousedown',(e)=>{
    var cls = "activePic" ;
    if(e.target.parentElement.classList.contains(cls)||e.target.tagName=="DIV"){setActive(cellList,null,cls)}//Сбрасывается активный классб если юзер промахнулся, или нажал на уже активированный ранее элемент
    else{setActive(cellList,e.target.parentElement,cls)}//Присвоение активного класса выбранному элементу, диактивирование остальных.
    
   })
}
const setActive = (arr,active,activeClass) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i].classList.remove(activeClass);//Удаление со всех элементов массива активный класс
    }
    if(active){active.classList.add(activeClass)}//Присвоение активному элементу активный класс
}
var form = () => {//Взаимодействие с формой
    var form = document.getElementsByTagName('form')[0];
    form.getElementsByTagName('button')[0].addEventListener("mouseup", (e)=>{//Нажатие на кнопку формы
    var name = form.name.value;
    var email = form.email.value;
    var subject = form.subject.value;
    var describe= form.describe.value;
    showMsg(name,email,subject,describe);//Всплывающее окно
    })
    
}
var showMsg = (name,email,subject,desctibe) => {//Всплывающее окно
    var msg = document.getElementsByClassName("msg")[0];
    var ok = msg.getElementsByClassName('button')[0];
    var p=msg.children[0].children;
    p[0].innerText = "Письмо отправлено";//-->
    p[1].innerText ="Без темы";//-->
    p[2].innerText ="Без описания";//Перезапись значений всплывающего окна
    if(name&&/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){//Если и имя и почта введены правильно-сообщиить об отправке
        write(p[1],subject,"Тема:  ")
        write(p[2],desctibe,"Описание:  ")
    }else{write(p[1]," "),write(p[2]," "),write(p[0]," ")}//Очистка <p> блоков
    if(!name){write(p[0],"Введите имя")}//Если не введено имя
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)==false){write(p[1],"Введите корректный Email")}//Если не правильно введена почта
    msg.classList.remove('hide');
    document.getElementsByClassName('page')[0].style = "filter: blur(5px);";
    msg.addEventListener("mouseover",(e)=>{msg.classList.add('ghostMsg')})
    ok.addEventListener('mouseup',(e)=>{hideMsg()})//Возврат к исходному набору стилей при нажатии "Ок"
    msg.addEventListener("mousedown",(e)=>{if(e.target==msg)hideMsg()})//-->Нажатии на область вокруг окошка
    
    const hideMsg = () => {
        msg.classList.add('hide');
        msg.classList.remove('ghostMsg');
        document.getElementsByClassName('page')[0].style = "filter: none;";;
    }
}
const write = (node,text,pre) => {
    if(!pre)pre="";
    if(text){node.innerText = pre+text}//Если в агруметне есть текст-то перезаписывает его в заданном узле
}