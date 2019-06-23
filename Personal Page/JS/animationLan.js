const menuItem1 = getEle(".headNav>li:first-child div");
const menuItem2 = getEle(".headNav>li:nth-child(2) div");
const menuItem3 = getEle(".headNav>li:last-child div");

const lanDivs = getAll("#myLanguage>div");
const floatTitle = getEle("#content>ul:last-child");
const floatTitles = getAll("#content>ul:last-child>li");
const floatText = getEle("#floatText");

const text1 = getEle("#text1 p:nth-child(2)");
const text2 = getEle("#text2 p:nth-child(2)");
const text3 = getEle("#text3 p:nth-child(2)");
const text4 = getEle("#text4 p:nth-child(2)");
//选择语言
floatTitle.onclick = () => { 
    let target = event.target;
    if (target.nodeName.toLowerCase() == "li") {
        for (var i = 0; i < floatTitles.length; i++) {
            var index;
            floatTitles[i].className = ""; //初始化标题
            floatText.className = ""; //初始化动画文字
            lanDivs[i].className = ""; //初始化语言栏
            if (floatTitles[i] === target) {
                index = i
            }
        }
        target.className = "floatTitleAni"; //标题动画
        floatText.className = "floatTextAni"; //文字动画
        lanDivs[index].className = "lan"; //语言栏动画
        switch (index) { //动画文字内容变更
            case 0:
                floatText.innerHTML = "<p>Becoming</br> Web Programmer.</p>";
                toEn();
                break;
            case 1:
                floatText.innerHTML = "<p>Haciendome</br> Programador Web.</p>";
                toEs();
                break;
            case 2:
                floatText.innerHTML = "<p>A tornar-me</br> Programador Web.</p>";
                toPt();
                break;
            case 3:
                floatText.innerHTML = "<p>Deviens</br> Programmeur Web.</p>";
                toFr();
                break;
        }
    }
}
//英语
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
    menuItem1.innerText = "ABOUT ME";
    menuItem2.innerHTML = "NOTES";
    menuItem3.innerHTML = "MY PROJECTS";
}
//西班牙语
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

    menuItem1.innerHTML = "SOBRE MI";
    menuItem2.innerHTML = "NOTAS";
    menuItem3.innerHTML = "MIS PROJECTOS";
}
//葡萄牙语
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

    menuItem1.innerHTML = "SOBRE MIM";
    menuItem2.innerHTML = "NOTAS";
    menuItem3.innerHTML = "MEUS PROJETOS";
}
//法语
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

    menuItem1.innerHTML = "SUR MOI";
    menuItem2.innerHTML = "NOTES";
    menuItem3.innerHTML = "MES PROJETS";
}