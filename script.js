window.onload = function() {//Действия после загрузки страницы
    moveNav();//Движение страницы при нажатии на нав элемент
    navPosition();//Позиция нава
    slider();
    interactiveCategories();
    interactivePictures();
    form();

}
window.onscroll = function() {//Реакция на скролл
    navPosition();//Позиция нава
    interactiveHeader();//Состояние элементов хедера находясь на верху, и нет
    activeNavByScroll();//Активируем нав, соответствующий болку, который видим
}
window.onmouseover = function(){
    navPosition();//Позиция нава
}
//=======================HEADER=============================
const navPosition = ()=>{
    var nav = document.getElementsByClassName("header__list")[0];
    var p = document.getElementsByClassName('page')[0];
    nav.parentElement.style = "right:"+(window.innerWidth-p.getBoundingClientRect().right+23)+"px";
}
    //==============================================================
    // nav.addEventListener('mousedown',(e)=>{//активация нав по клику
    //     var active=e.target;
    //     if(e.target.tagName=="DIV"){active=e.target.parentElement}//Обработка миссклика
    //     setActive(nav.children,active,"activeNav")
    // })
const activeNavByScroll = () => {//Активируем Нав посредством скролла
    var navs = document.getElementsByClassName("header__list")[0].children;
    for (let i = 0; i < navs.length; i++) {
        if(navs[i].children[0].innerText.toLowerCase() == whatBlockWeSee().classList[0]){
            //Сопоставляем содержимый навом текст, с классом блока который видим сейчас.
            setActive(navs,navs[i],"activeNav");//Делаем активным соответствующий.
        }
    }
}
const moveNav = () => {
    document.getElementsByClassName("header__navigation")[0].addEventListener('mousedown',(e) => {
        if(e.target!=document.getElementsByTagName("NAV")[0]&&e.target!=document.getElementsByTagName("UL")[0]){
            //^Обработка мисскликов
        movePage(e.target.innerText.toLowerCase());}})
}



const interactiveHeader = () => {
    var logo=document.getElementsByClassName("header__singolo")[0];
    var navs=document.getElementsByClassName("header__list")[0].children;
    logo.addEventListener('mousedown',() => {
        movePage("home");//При нажатии на логотип возвращаеся на верх
    })
    if(document.documentElement.scrollTop<=40){//Если страница на самом верху
        //Возвращаем дефолт стилии всех элементов
        logo.children[0].children[0].style = defaultStatus;
        navToDefault(logo);
        for (let i = 0; i < navs.length; i++) {
            navToDefault(navs[i]);
        }
    }
    if(document.documentElement.scrollTop>40){//Если страница скролиться
        //Изменяем стили(Делаем их не заметными, для того чтобы не мешать контенту)
        logo.children[0].children[0].style = "display:none";
        navOnScroll(logo);
        for (let i = 0; i < navs.length; i++) {
            navOnScroll(navs[i]);
        }
    }
}
const navToDefault = (elem) => { // Возврат к дэфолтным стилям
    elem.children[0].style = defaultStatus;
    elem.addEventListener('mouseover',() => {
        elem.children[0].style = defaultStatus;
    })
    elem.addEventListener('mouseleave',() => {
        elem.children[0].style = defaultStatus;
    })
}
const navOnScroll = (elem) => {
    elem.children[0].style = "opacity: 0.5; color:rgb(177, 60, 80)"
        elem.addEventListener('mouseover',() => {//При наведении делаем заметным элемент
                elem.children[0].style = "opacity: 1; color:rgb(177, 60, 80);text-shadow: 0 0 2px red;transform: scale(1.09) translate(0,3px)"
        })
            elem.addEventListener('mouseleave',() => {
                elem.children[0].style = "opacity: 0.5; color:rgb(177, 60, 80)";
        })
}

const whatBlockWeSee = () => {
    var blocks = document.getElementsByTagName('section');
    for(var i=blocks.length-1;i>=0;i--){//Проверяем снизу вверх все секции(блоки с тегом SECTION)
        if((blocks[i].getBoundingClientRect().y+pageYOffset)<document.documentElement.scrollTop+100){
            //Если верхння точка блока ниже верхней точки видимой области(+100px для красоты)
            return blocks[i];//Первый(с конца) соответствующий условию и есть видимый блок.
        }
    }
    return document.getElementsByClassName('home')[0];//Если находимся выше первой секции-то возвращаем home блок
}
//==================================SLIDER=============================
const slider = () => {
    var slids = document.getElementsByClassName("slider__content");
    console.log(slids);
    // hideAll(slids);
}

//================================PORTFOLIO===========================
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
const setVisibleItems = (arr,cat) => {
    var n=0;
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].classList.contains(cat)&&n<12){n++;arr[i].classList.remove("hide");}//Делает видимыми элементы соответствующие категории. (12-по условию)
    }
}



var form = () => {//Взаимодействие с формой
    var form = document.getElementsByTagName('form')[0];
    form.getElementsByTagName('button')[0].addEventListener("mousedown", (e)=>{//Нажатие на кнопку формы
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
    var mail =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    p[0].innerText = "Письмо отправлено";//-->
    p[1].innerText ="Без темы";//-->
    p[2].innerText ="Без описания";//Перезапись значений всплывающего окна
    if(name&&mail.test(email)){//Если и имя и почта введены правильно-сообщиить об отправке
        write(p[1],subject,"Тема:  ")
        write(p[2],desctibe,"Описание:  ")
    }else{write(p[1]," "),write(p[2]," "),write(p[0]," ")}//Очистка <p> блоков
    if(!name){write(p[0],"Введите имя")}//Если не введено имя
    if(mail.test(email)==false){write(p[1],"Введите корректный Email")}//Если не правильно введена почта
    msg.classList.remove('hide');
    document.getElementsByClassName('page')[0].style = "filter: blur(5px);";
    msg.addEventListener("mouseover",(e)=>{msg.classList.add('ghostMsg')})
    ok.addEventListener('mousedown',(e)=>{hideMsg()})//Возврат к исходному набору стилей при нажатии "Ок"
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
//=======================================================================================
const hideAll = (arr) =>{
    for (let i = 0; i < arr.length; i++) {
        if(!arr[i].classList.contains("hide")){arr[i].classList.add("hide")}//Обнуляет список видимых элементов
    }
}
const setActive = (arr,active,activeClass) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i].classList.remove(activeClass);//Удаление со всех элементов массива активный класс
    }
    if(active){active.classList.add(activeClass)}//Присвоение активному элементу активный класс
}
const movePage = (str) => {
    document.getElementsByClassName(str)[0].scrollIntoView({behavior: "smooth"})
}
//==============================================================================================