//浮动导航
const titleUp = getEle(".titleBox>ul>li:first-child");
const titleMid = getEle(".titleBox>ul>li:nth-child(2)");
const titleDown = getEle(".titleBox>ul>li:last-child");

//箭头
const arrowUp = getEle(".titleBox>ul>li:first-child div:last-child");
const arrowDown = getEle(".titleBox>ul>li:last-child div:last-child");
//浏览器高度
let clientHeight = document.documentElement.clientHeight;
//浮动导航适应手机
if (window.matchMedia("(max-device-width:425px)").matches) {
    autoTitleBox();
}
//浮动导航定位
function autoTitleBox() {
	const artiSelection = getEle("#artiSelection");
	const titleBox = getEle(".titleBox");
	const arrowDownBox = getEle(".titleBox>ul>li:last-child");
    titleBox.style.top = `${clientHeight-titleBox.offsetHeight}px`;
    artiSelection.style.top = `${clientHeight-artiSelection.offsetHeight-arrowDownBox.offsetHeight}px`;
    artiSelection.style.right = `${titleBox.offsetWidth}px`;
};

titleUp.addEventListener("mouseover", function() {
    arrowUp.style.borderBottomColor = "#eeeeee";
}, false);

titleDown.addEventListener("mouseover", function() {
    arrowDown.style.borderTopColor = "#eeeeee";
}, false);

titleUp.addEventListener("mouseout", function() {
    arrowUp.style.borderBottomColor = "white";
}, false);

titleDown.addEventListener("mouseout", function() {
    arrowDown.style.borderTopColor = "white";
}, false);

titleMid.addEventListener("mouseover", function() {
    artiSelection.style.visibility = "visible";
}, false);

titleMid.addEventListener("mouseout", function() {
    artiSelection.style.visibility = "hidden";
}, false);

artiSelection.addEventListener("mouseover", function() {
    artiSelection.style.visibility = "visible";
}, false);

artiSelection.addEventListener("mouseout", function() {
    artiSelection.style.visibility = "hidden";
}, false);