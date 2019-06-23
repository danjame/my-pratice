//浮动导航
const titleUp = getEle(".titleBox>ul>li:first-child");
const titleMid = getEle(".titleBox>ul>li:nth-child(2)");
const titleDown = getEle(".titleBox>ul>li:last-child");
const artiSelection = getEle("#artiSelection");
//箭头
const arrowUp = getEle(".titleBox>ul>li:first-child div:last-child");
const arrowDown = getEle(".titleBox>ul>li:last-child div:last-child");
//浮动导航适应手机和悬浮导航交互适应桌面端
if (window.matchMedia("(max-device-width:425px)").matches) {
    autoTitleBox();
}else{
    arrowColorDesktop();
}
//浮动导航定位
function autoTitleBox() {
    let clientHeight = document.documentElement.clientHeight;
    const titleBox = getEle(".titleBox");
    const arrowDownBox = getEle(".titleBox>ul>li:last-child");
    titleBox.style.top = `${clientHeight-titleBox.offsetHeight}px`;
    artiSelection.style.top = `${clientHeight-artiSelection.offsetHeight-arrowDownBox.offsetHeight}px`;
    artiSelection.style.right = `${titleBox.offsetWidth}px`;
};

function arrowColorDesktop() {
    titleUp.addEventListener("mouseover", ()=> {
        arrowUp.style.borderBottomColor = "#eeeeee";
    }, false);

    titleDown.addEventListener("mouseover", ()=> {
        arrowDown.style.borderTopColor = "#eeeeee";
    }, false);

    titleUp.addEventListener("mouseout", ()=> {
        arrowUp.style.borderBottomColor = "white";
    }, false);

    titleDown.addEventListener("mouseout", ()=> {
        arrowDown.style.borderTopColor = "white";
    }, false);
}

titleMid.addEventListener("click", function() {
    if (artiSelection.style.visibility === "visible") {
        artiSelection.style.visibility = "hidden";
    } else {
        artiSelection.style.visibility = "visible";
    }
}, false);