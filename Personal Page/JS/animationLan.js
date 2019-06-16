const btn1 = getEle("#btnBox input:first-child");
const btn2 = getEle("#btnBox input:nth-child(2)");
const btn3 = getEle("#btnBox input:nth-child(3)");

const text1 = getEle("#text1 p:nth-child(2)");
const text2 = getEle("#text2 p:nth-child(2)");
const text3 = getEle("#text3 p:nth-child(2)");
const text4 = getEle("#text4 p:nth-child(2)");

const text1Title = getEle("#text1 .year");

function toEn() {
    btn1.value = "Start";
    btn2.value = "Pause";
    btn3.value = "Reload";
    text1Title.innerHTML = "From";
    text1.innerHTML = "Guangzhou, China.</br>Graduated in Spanish Language and Literature from Jilin International Studies University.";
    text2.innerHTML = "University of Santiago de Compostela.</br>Study Mobility Program.";
    text3.innerHTML = "China United Engineering Corporation.</br>Interpretation and translation (CN-ES and ES-CN).";
    text4.innerHTML = "University of Porto.</br>Master in PLE of FLUP.";
}

function toEs() {
    btn1.value = "Empezar";
    btn2.value = "Pausar";
    btn3.value = "Recargar";
    text1Title.innerHTML = "Origen";
    text1.innerHTML = "Guangzhou, China.</br>Graduado en lengua y literatura españolas por la Universidad de Estudios Internacionales Jilin.";
    text2.innerHTML = "Universidad de Santiago de Compostela.</br>Movilidad de estudio.";
    text3.innerHTML = "China United Engineering Corporation.</br>Interpretación y traducción(CN-ES and ES-CN).";
    text4.innerHTML = "Universidad de Porto.</br>Master en PLE de FLUP.";
}

function toPt() {
    btn1.value = "Começar";
    btn2.value = "Pausar";
    btn3.value = "Recarregar";
    text1Title.innerHTML = "Origem";
    text1.innerHTML = "Guangzhou, China.</br>Licenciado em Língua e Literatura Espanhola em Jilin International Studies University.";
    text2.innerHTML = "Universidade de Santiago de Compostela.</br>Mobilidade de Estudo.";
    text3.innerHTML = "China United Engineering Corporation.</br>Interpretação e Tradução CN-ES e ES-CN.";
    text4.innerHTML = "Universidade do Porto.</br>Mestrado em PLE na FLUP.";
}

function toFr() {
    btn1.value = "Commencer";
    btn2.value = "Pauser";
    btn3.value = "Recharger";
    text1Title.innerHTML = "Origine";
    text1.innerHTML = "Guangzhou, Chine.</br>Diplômé en langue et littérature espagnoles à l'Université Jilin International Studies University.";
    text2.innerHTML = "Université de Saint-Jacques-de-Compostelle.</br>Mobilité d'étude.";
    text3.innerHTML = "China United Engineering Corporation.</br>Interprétation et Traduction(CN-ES et ES-CN).";
    text4.innerHTML = "Université de Porto.</br>Master en PLE à FLUP.";
}

getEle("#floatTitle").onclick = () => { //选择语言
    const floatTitles = document.querySelectorAll("#floatTitle>li");
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