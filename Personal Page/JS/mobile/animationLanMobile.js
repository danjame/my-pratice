const menu = document.querySelector("#header #menu");
const menuList = document.querySelector("#header div:last-child div:first-child");
const menuBars = document.querySelectorAll("#header #menu>span");
menu.addEventListener("click",()=>{
    if(menuList.className === "activedMenu"){
        for(let i=0; i<menuBars.length;i++){
            menuBars[i].className = "menuBarsOff";
        };
        menuList.className = "unactivedMenu";
        menu.className = "unclickMenu";
    }else{
        for(let i=0; i<menuBars.length;i++){
            menuBars[i].className = "menuBarsOn";
        };
        menuList.className = "activedMenu";
        menu.className = "clickMenu";
    }
},false);

const menu1 = getEle(".headNav>li:first-child div");
const menu2 = getEle(".headNav>li:nth-child(2) div");
const menu3 = getEle(".headNav>li:last-child div");

const btn0 = getEle("#btnBox input:first-child");
const btn1 = getEle("#btnBox input:nth-child(2)");
const btn2 = getEle("#btnBox input:nth-child(3)");
const btn3 =  getEle("#btnBox input:nth-child(4)");
const btn4 = getEle("#btnBox input:last-child");

const text1 = getEle("#text1 p:nth-child(2)");
const text2 = getEle("#text2 p:nth-child(2)");
const text3 = getEle("#text3 p:nth-child(2)");
const text4 = getEle("#text4 p:nth-child(2)");

const text1Title = getEle("#text1 .year");

function toEn() {
    btn0.value = "En";
    btn1.value = "Start";
    btn2.value = "Pause";
    btn3.value = "Review";
    btn4.value = "Reload";
    text1.innerHTML = "Graduated in Spanish Language and Literature from Jilin International Studies University.";
    text2.innerHTML = "University of Santiago de Compostela.</br>Study Mobility Program.";
    text3.innerHTML = "China United Engineering Corporation.</br>Interpretation and translation.";
    text4.innerHTML = "University of Porto.</br>Master in PLE of FLUP.";

    menu1.innerText = "About Me";
    menu2.innerHTML = "Note";
    menu3.innerHTML = "My Projects";
}

function toEs() {
    btn0.value = "ES";
    btn1.value = "Empezar";
    btn2.value = "Pausar";
    btn3.value = "Rever";
    btn4.value = "Recargar";
    text1.innerHTML = "Graduado en lengua y literatura españolas por la Universidad de Estudios Internacionales Jilin.";
    text2.innerHTML = "Universidad de Santiago de Compostela.</br>Movilidad de estudio.";
    text3.innerHTML = "China United Engineering Corporation.</br>Interpretación y traducción.";
    text4.innerHTML = "Universidad de Porto.</br>Master en PLE de FLUP.";

    menu1.innerHTML = "Sobre Mi";
    menu2.innerHTML = "Nota";
    menu3.innerHTML = "Mi Projectos";
}

function toPt() {
    btn0.value = "PT";
    btn1.value = "Começar";
    btn2.value = "Pausar";
    btn3.value = "Rever";
    btn4.value = "Recarregar";
    text1.innerHTML = "Licenciado em Língua e Literatura Espanhola em Jilin International Studies University.";
    text2.innerHTML = "Universidade de Santiago de Compostela.</br>Mobilidade de Estudo.";
    text3.innerHTML = "China United Engineering Corporation.</br>Interpretação e Tradução.";
    text4.innerHTML = "Universidade do Porto.</br>Mestrado em PLE na FLUP.";

    menu1.innerHTML = "Sobre Mim";
    menu2.innerHTML = "Apontamento";
    menu3.innerHTML = "Meus Projetos";
}

function toFr() {
    btn0.value = "FR";
    btn1.value = "Commencer";
    btn2.value = "Pauser";
    btn3.value = "Revoir";
    btn4.value = "Recharger";
    text1.innerHTML = "Diplômé en langue et littérature espagnoles à l'Université Jilin International Studies University.";
    text2.innerHTML = "Université de Saint-Jacques-de-Compostelle.</br>Mobilité d'étude.";
    text3.innerHTML = "China United Engineering Corporation.</br>Interprétation et Traduction.";
    text4.innerHTML = "Université de Porto.</br>Master en PLE à FLUP.";

    menu1.innerHTML = "Sur Moi";
    menu2.innerHTML = "Notes";
    menu3.innerHTML = "Mes Projets";
}

getEle("#content>ul").onclick = () => { //选择语言
    const floatTitles = document.querySelectorAll("#content>ul>li");
    const floatText = getEle("#floatText");
    const languages = document.querySelectorAll("#myLanguage>div");
    let target = event.target;

    if (target.nodeName.toLowerCase() == "li") {
        for (var i = 0; i < floatTitles.length; i++) {
            var index;
            floatTitles[i].className = ""; //初始化标题
            floatText.className = ""; //初始化动画文字
            languages[i].className = ""; //初始化语言栏
            if (floatTitles[i] === target) {
                index = i
            }
        }
        target.className = "floatTitleAni"; //标题动画
        floatText.className = "floatTextAni"; //文字动画
        languages[index].className = "language"; //语言栏动画
        switch (index) { //动画文字内容变更
            case 0:
                floatText.innerHTML = "<p>Becoming a </br> Web Programmer.</p>";
                toEn();
                break;
            case 1:
                floatText.innerHTML = "<p>Haciendome un</br> Programador Web.</p>";
                toEs();
                break;
            case 2:
                floatText.innerHTML = "<p>A tornar-me um</br> Programador Web.</p>";
                toPt();
                break;
            case 3:
                floatText.innerHTML = "<p>Deviens un </br> Programmeur Web.</p>";
                toFr();
                break;
        }
    }
}