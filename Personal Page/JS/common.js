// Dom节点
function getEle(el) {
    return document.querySelector(el);
};

function getAll(el) {
    return document.querySelectorAll(el);
}
// 头部菜单
const menu = getEle("#header #menu");
const menuList = getEle("#header div:last-child div:first-child");
const menuBars = getAll("#header #menu>span");

const menuItem1 = getEle(".headNav>li:first-child div");
const menuItem2 = getEle(".headNav>li:nth-child(2) div");
const menuItem3 = getEle(".headNav>li:last-child div");
// 时间线和时间点
const timeLine = getEle("#timeLine");
const dots = getAll("#timeDot>li");
// 时间线和文字
const textDiv1 = getEle("#text1");
const textDiv2 = getEle("#text2");
const textDiv3 = getEle("#text3");
const textDiv4 = getEle("#text4");
const text1 = getEle("#text1 p:nth-child(2)");
const text2 = getEle("#text2 p:nth-child(2)");
const text3 = getEle("#text3 p:nth-child(2)");
const text4 = getEle("#text4 p:nth-child(2)");
const text1Title = getEle("#text1 .year");
// 按钮
const btn0 = getEle("#btnBox input:first-child");
const btn1 = getEle("#btnBox input:nth-child(2)");
const btn2 = getEle("#btnBox input:nth-child(3)");
const btn3 = getEle("#btnBox input:nth-child(4)");
const btn4 = getEle("#btnBox input:last-child");
//多语种
const lanDivs = getAll("#myLanguage>div");
const floatTitle = getEle("#content>ul:last-child");
const floatTitles = getAll("#content>ul:last-child>li");
const floatText = getEle("#floatText");


const container = getEle("#container");
const bgBox = getEle("#bgBox");
const imgGroup = getEle("#imgGroup");
const eachImg = getEle("#imgGroup>li:first-child img");
const imgNum = getAll("#imgGroup>li").length;

const mainLeft = getEle("#mainLeft");


let timeLineTimer = null; //时间线计时器
let contentTimer = null;
    

    // const imgBarWidth = eachWidth * imgNum;

    // const imgNum = document.querySelectorAll(this.imgLis).length;
    // const eachWidth = document.querySelector(this.anyImg).offsetWidth;




