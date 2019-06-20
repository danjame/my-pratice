floatTitle.onclick = () => { //选择语言
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

function toEn() { //英语
    btn0.value = "En";
    btn1.value = "Start";
    btn2.value = "Pause";
    btn3.value = "Review";
    btn4.value = "Reload";
    text1.innerHTML = "Graduated in Spanish Language and Literature from Jilin International Studies University.";
    text2.innerHTML = "University of Santiago de Compostela.</br>Study Mobility Program.";
    text3.innerHTML = "China United Engineering Corporation.</br>Interpretation and translation.";
    text4.innerHTML = "University of Porto.</br>Master in PLE of FLUP.";
    menuItem1.innerText = "About Me";
    menuItem2.innerHTML = "Note";
    menuItem3.innerHTML = "My Projects";
}

function toEs() { //西班牙语
    btn0.value = "ES";
    btn1.value = "Empezar";
    btn2.value = "Pausar";
    btn3.value = "Rever";
    btn4.value = "Recargar";
    text1.innerHTML = "Graduado en lengua y literatura españolas por la Universidad de Estudios Internacionales Jilin.";
    text2.innerHTML = "Universidad de Santiago de Compostela.</br>Movilidad de estudio.";
    text3.innerHTML = "China United Engineering Corporation.</br>Interpretación y traducción.";
    text4.innerHTML = "Universidad de Porto.</br>Master en PLE de FLUP.";

    menuItem1.innerHTML = "Sobre Mi";
    menuItem2.innerHTML = "Nota";
    menuItem3.innerHTML = "Mi Projectos";
}

function toPt() { //葡萄牙语
    btn0.value = "PT";
    btn1.value = "Começar";
    btn2.value = "Pausar";
    btn3.value = "Rever";
    btn4.value = "Recarregar";
    text1.innerHTML = "Licenciado em Língua e Literatura Espanhola em Jilin International Studies University.";
    text2.innerHTML = "Universidade de Santiago de Compostela.</br>Mobilidade de Estudo.";
    text3.innerHTML = "China United Engineering Corporation.</br>Interpretação e Tradução.";
    text4.innerHTML = "Universidade do Porto.</br>Mestrado em PLE na FLUP.";

    menuItem1.innerHTML = "Sobre Mim";
    menuItem2.innerHTML = "Apontamento";
    menuItem3.innerHTML = "Meus Projetos";
}

function toFr() { //法语
    btn0.value = "FR";
    btn1.value = "Commencer";
    btn2.value = "Pauser";
    btn3.value = "Revoir";
    btn4.value = "Recharger";
    text1.innerHTML = "Diplômé en langue et littérature espagnoles à l'Université Jilin International Studies University.";
    text2.innerHTML = "Université de Saint-Jacques-de-Compostelle.</br>Mobilité d'étude.";
    text3.innerHTML = "China United Engineering Corporation.</br>Interprétation et Traduction.";
    text4.innerHTML = "Université de Porto.</br>Master en PLE à FLUP.";

    menuItem1.innerHTML = "Sur Moi";
    menuItem2.innerHTML = "Notes";
    menuItem3.innerHTML = "Mes Projets";
}