

window.onload = function() {//Действия после загрузки страницы
    
    
    header();
    slider();
    portfolio();
    formBlock();
    responsive();
}

window.onscroll = function() {//Реакция на скролл
    
    interactiveHeader();//Состояние элементов хедера находясь на верху, и нет
    activeNavByScroll();//Активируем нав, соответствующий болку, который видим
}
window.addEventListener('resize',() => {
    responsive();
    interactiveHeader()
})
function typeOfNav(){
    var width = document.getElementsByClassName('page')[0].getBoundingClientRect().width;
    return width<600?"burger":"DT" // Если ширина page меньше 600-возвращает burger, иначе Desktop
}
function responsive(){
    var width = document.getElementsByClassName('page')[0].getBoundingClientRect().width;
    //var blocks = document.getElementsByTagName('SECTION')
    
    if(width<=500){blockHeight('portfolio',width,225.06);}//Высота на кажды брейк для портфолио
    else if(width<=600){blockHeight('portfolio',width,200);}
    else if(width<=768){blockHeight('portfolio',width,142.5);}
    else if(width<=1020){blockHeight('portfolio',width,79,-20);}
    
    
    blockHeight('slider',width,58.82);//Высота слайдера
    burgerType()
    interactiveHeader()
}
function blockHeight(cls,width,k,pdd){
    if(pdd==undefined){pdd=0}
    document.getElementsByClassName(cls)[0].style.height = (width/100*k-pdd)+'px';
}
//==============================================HEADER====================================================
// const navPosition = ()=>{
//     var nav = document.getElementsByClassName("header__list")[0];
//     var p = document.getElementsByClassName('page')[0];
//     nav.parentElement.style = "right:"+(window.innerWidth-p.getBoundingClientRect().right+23)+"px";
// }
    //==============================================================
    // nav.addEventListener('mousedown',(e)=>{//активация нав по клику
    //     var active=e.target;
    //     if(e.target.tagName=="DIV"){active=e.target.parentElement}//Обработка миссклика
    //     setActive(nav.children,active,"activeNav")
    // })
    
const header = () => {
    burgerType()
    burgerVisibility()
    moveNav();//Движение страницы при нажатии на нав элемент
    
}
//==========================Visibility
var logo=document.getElementsByClassName("header__singolo")[0];
var burger = document.getElementsByClassName('burger__navigation');
var burgerButton = document.getElementsByClassName('burger__button')[0];
var burgerBg = document.getElementsByClassName("msg")[0];

function burgerVisibility(){

    burgerButton.addEventListener('mousedown',(e)=>{//При нажатии кнопки "бургер"
    
        if(burgerButton.classList.contains('burger__button-active')){
            closeBurger();
        }
        else if(!burgerButton.classList.contains('burger__button-active')){
            openBurger();
            
        }
    })
    burgerBg.addEventListener('mousedown',()=>{
        closeBurger();
    })
}
function openBurger(){
    burgerButton.classList.add('burger__button-active');
    burger[0].classList.add('burger__navigation-active');
    if(logo.classList.contains('logoMobile')){
        logo.style = "transform: translateX(-30%);";
        
        
        logo.classList.remove("logoMobile");
        
        setTimeout(()=>{logo.style = "transform: none";},100);
    }
    burgerBg.classList.remove('hide');
    
    setTimeout(()=>{burgerBg.classList.add('burgerBg');},20);
    
    
    
}
function closeBurger(){
    burgerButton.classList.remove('burger__button-active');
    burger[0].classList.remove('burger__navigation-active');
    burgerBg.classList.add('hide');
    burgerBg.classList.remove('burgerBg');
    if(!logo.classList.contains('logoMobile')){
        setTimeout(()=>{logo.classList.add("logoMobile");},100);
    }
}
//==========================
//==========================Type
function burgerType(){
    var logo=document.getElementsByClassName("header__singolo")[0];
    var header = document.getElementsByClassName('header__navigation')
    var burger = document.getElementsByClassName('burger__navigation')
    var burgerButton = document.getElementsByClassName('burger__button')[0];
    
    if(typeOfNav()=="DT"){
        burgerButton.classList.add('hide'); 
        if(header.length==0){
        burger[0].classList.add('header__navigation')
        header[0].classList.remove('burger__navigation')
        if(logo.classList.contains('logoMobile')){logo.classList.remove("logoMobile");}
        }
    }
    if(typeOfNav()=="burger"){
        burgerButton.classList.remove('hide');
        if(burger.length==0){
            header[0].classList.add('burger__navigation')
            burger[0].classList.remove('header__navigation')
            if(!logo.classList.contains('logoMobile')){logo.classList.add("logoMobile");}
        }
        
    }
}

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
    var cls;
    if(typeOfNav()=="DT"){cls="header__navigation";}
    if(typeOfNav()=="burger"){cls="burger__navigation";}
    
    document.getElementsByClassName(cls)[0].addEventListener('mousedown',(e) => {
        if(e.target!=document.getElementsByTagName("NAV")[0]&&e.target!=document.getElementsByTagName("UL")[0]){
            //^Обработка мисскликов
        movePage(e.target.innerText.toLowerCase())}
        if(typeOfNav()=="burger"&&e.target.classList[0]!="burger__navigation"){closeBurger()}
        console.log()
    })
}



const interactiveHeader = () => {
    var logo=document.getElementsByClassName("header__singolo")[0];
    var navs=document.getElementsByClassName("header__list")[0].children;
   
    
        logo.addEventListener('mousedown',() => {
            movePage("home");//При нажатии на логотип возвращаеся на верх
        })
        if(document.documentElement.scrollTop<=40||typeOfNav()=="burger"){//Если страница на самом верху
            //Возвращаем дефолт стилии всех элементов
            logo.children[0].children[0].style = defaultStatus;
            navToDefault(logo);
            for (let i = 0; i < navs.length; i++) {
                navToDefault(navs[i]);
            }
        }
        if(document.documentElement.scrollTop>40&&typeOfNav()!="burger"){//Если страница скролиться
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
//========================================================SLIDER==========================================================
const slider = () => {
    turnOnOffPhone();//Включаем-выключаем телефоны
    sliderMotion();//Реализуем движения слайдера
}

const sliderMotion = () =>{
    var content = document.getElementsByClassName('slider__content')[0].children;//Получаем в массив слайды из "хранилища"
    
    var slides = document.getElementsByClassName('slideWindow')[0].children;//Получаем видимый(средний) и невидимые(левый и правый) части слайдера
    var stopEvent = false;//Разрешаем слушать ивент(фиксировать нажатие на стрелки)
    var active = 0;//Определяем индекс подгружаемого слайда, который будет активным(видимым)
    for (let i = 0; i < content.length; i++) {//Даем всему списку слайдов необходимые стили. Скольо бы их не было.
        content[i].style = "width: 100%;height: 100%;position: absolute;left:0;";
    }
    const changeActive = (boolean) => {//Изменяем идекс подгружаемого слайда. Если выходит за допустимые значение-обновляем.
        if(boolean){
            active++;
            if(active==content.length)active=0;
        }else{
            active--;
            if(active<0)active=content.length-1;
        }
    }
    const catchItem = (n) => {//Зацикливаем поиск по "Хранилищу" слайдов.
        var len = content.length;
        return (n==0?
                active:active+n==len?
                0:active+n<0?
                len-1:active+n)
    }
    const contentToSlides = () => {//Подгружаем нужные слайды на места
        slides[0].prepend(content[catchItem(-1)].cloneNode(true));
        slides[1].prepend(content[catchItem(0)].cloneNode(true));
        slides[2].prepend(content[catchItem(1)].cloneNode(true));
        
    }
    
    const z = (z) => {//Изменение z-index заргуженных слайдов
        for (let i = 0; i < slides.length; i++) {
            slides[i].children[0].classList.add('z-'+z);
            if(z==2){slides[i].children[0].classList.remove('z-1')}
        }
    }
    const rmExcess = () => {//Удаление лишних слайдов
        for (let i = 0; i < slides.length; i++) {
            if(slides[i].children[1])slides[i].children[1].remove();
            
        }
    }
    const eventPermission=()=>{// Разрешение
        rmExcess();//Удаляем сладный переднего плана
        z(3);//Двигаем видимые слайды вперед(ближе к смотрящему)
        stopEvent = false;// Разрешаем слушать(фиксировать) ивент
    }

    //====================================RIGHT
    document.getElementsByClassName('slider__rightArr')[0].addEventListener('mousedown',()=>{
        //Если нажали на правую стрелку
        rightArrowEvent(stopEvent)
        stopEvent=true;//Запрещаем слушать ивент
    })
    const rightArrowEvent = (boolean) => {
        if(!boolean){
                slides[0].children[0].remove();//Удаляем левый слайд
                slides[1].children[0].classList.add('left');//Сдвигаем средний слайд влево
                slides[2].children[0].classList.add('left');//Сдвигаем правый слайд влево
                changeActive(true);//Сдвигаем индекс подгружаемого слайда влево
                contentToSlides();//Загружаем слайды из "хранилища" в слайдер(на задний план)
                setTimeout(eventPermission,200);//После 0.2с разрешаем слушать ивент, двигаем нужные слайды на передный план
            }
    }
    //====================================LEFT
    document.getElementsByClassName('slider__leftArr')[0].addEventListener('mousedown',()=>{//^^Аналогично^^
        
        leftArrowEvent(stopEvent)
        stopEvent=true;
    })
    const leftArrowEvent = (boolean) => {
        if(!boolean){
                slides[0].children[0].classList.add('right');
                slides[1].children[0].classList.add('right');
                slides[2].children[0].remove();
                changeActive(false);
                contentToSlides();
                setTimeout(eventPermission,200);
            }
    }
    contentToSlides();//Первая подгрузка слайдов
    z(3);//Двигаем их на передний план
}

const turnOnOffPhone=()=>{//Телефона реализованы 2мя способами. Вкл/выкл тоже релизовано 2мя способами.
    document.getElementsByClassName('slider')[0].addEventListener('mousedown',(e)=>{
        if(e.target.name=="iPhoneVBlue"){
            e.target.classList.contains("hideByO")?
            e.target.classList.remove("hideByO"):
            e.target.classList.add("hideByO");
        }
        if(e.target.name=="iPhoneV"){
            var apnd = document.createElement("div");
            var black = document.createElement("div");
                apnd.classList.add('VturnOf');
                black.classList.add('black');
                apnd.append(black);
                e.target.parentElement.append(apnd);
                setTimeout(()=>{black.style = "opacity:1"},20);
        }
        if(e.target.name=="iPhoneH"){
            var apnd = document.createElement("div");
            var black = document.createElement("div");
                apnd.classList.add('HturnOf');
                black.classList.add('black');
                apnd.append(black);
                e.target.parentElement.append(apnd);
                setTimeout(()=>{black.style = "opacity:1"},20);
        }
        if(e.target.classList.contains('black')){
            e.target.style = "opacity:0"
            
            setTimeout(()=>{e.target.parentElement.remove()},200);
        }
        
    })
}
//===========================================================PORTFOLIO======================================================
const portfolio = () => {
    interactiveCategories();
    interactivePictures();
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
function addMark(mrk){
    var span = document.createElement('SPAN');
    span.innerText = mrk;
    return span;
}
function marksOfPic(cell){
    var arr = ['web','graphic','artwork']
    var div = document.createElement('DIV')
    for (let i = 0; i < arr.length; i++) {
        if(cell.classList.contains(arr[i])){div.append(addMark(arr[i]));}
    }
    return div;
}
const interactivePictures = () => {
    var cellGrid =document.getElementsByClassName("portfolio__grid")[0];//сетка
    var cellList =cellGrid.children;//Ячейки сетки
    for (let i = 0; i < cellList.length; i++) {
        cellList[i].append(marksOfPic(cellList[i]));
    }
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

//============================================================FORM==========================================================
var form = document.getElementsByTagName('form')[0];
var formBlock = () => {//Взаимодействие с формой
    
    form.getElementsByTagName('button')[0].addEventListener("mousedown", (e)=>{//Нажатие на кнопку формы
    e.preventDefault();
        var name = form.name.value;
    var email = form.email.value;
    var subject = form.subject.value;
    var describe= form.describe.value;
    showMsg(name,email,subject,describe);//Всплывающее окно
    })
    
}
var showMsg = (name,email,subject,desctibe) => {//Всплывающее окно
    var msg = document.getElementsByClassName("msg")[0];
    var ok = msg.getElementsByClassName('msg__window__button')[0];
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
    //document.body.style = "overflow: hidden";
    msg.classList.remove('hide');
    document.getElementsByClassName('page')[0].style = "filter: blur(5px);";
    setTimeout(()=>{msg.classList.add('ghostMsg')},20);
    ok.addEventListener('mousedown',()=>{
         
        
        hideMsg();
        
    })//Возврат к исходному набору стилей при нажатии "Ок"
    msg.addEventListener("mousedown",(e)=>{if(e.target==msg)hideMsg()})//-->Нажатии на область вокруг окошка
    const hideMsg = () => {
        msg.classList.add('hide');
        msg.classList.remove('ghostMsg');
        document.getElementsByClassName('page')[0].style = "filter: none;";
        form.name.value="";
        form.email.value="";
        form.subject.value="";
        form.describe.value=""; 
        
    }
}

const write = (node,text,pre) => {
    if(!pre)pre="";
    if(text){node.innerText = pre+text}//Если в агруметне есть текст-то перезаписывает его в заданном узле
}
//===========================================================OTHER===============================================
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