const container = getEle("#container");
const bgBox = getEle("#bgBox");
const imgGroup = getEle("#imgGroup");
const eachImg = getEle("#imgGroup>li:first-child img");
const imgNum = getAll("#imgGroup>li").length;
const mainLeft = getEle("#mainLeft");
creatImg();
const skateMan = getEle("#mainLeft>img");
const screenWidth = document.documentElement.clientWidth;
// 时间线和时间点
const timeLine = getEle("#timeLine");
const dots = getAll("#timeDot>li");
// 时间线和文字
const textDiv1 = getEle("#text1");
const textDiv2 = getEle("#text2");
const textDiv3 = getEle("#text3");
const textDiv4 = getEle("#text4");
// 按钮
const btn0 = getEle("#btnBox input:first-child");
const btn1 = getEle("#btnBox input:nth-child(2)");
const btn2 = getEle("#btnBox input:nth-child(3)");
const btn3 = getEle("#btnBox input:nth-child(4)");
const btn4 = getEle("#btnBox input:last-child");
//计时器
let bgTimer = null;
let skateTimer = null;
let timeLineTimer = null;
let contentTimer = null;
let textTimer = null;
let i = 0;
let offset = 0;

//适配Ipad
if (window.matchMedia("(width:768px)").matches & window.matchMedia("(height:1024px)").matches) {
    forTablet();
    btn1.addEventListener("click", () => {
        if (imgGroup.style.transition === "all 1s ease 0s") {
            return;
        } else {
            skateAnimation(1, 29, 50);
            bgAnimationTablet(2, 1);
            timeAnimation(123, 243, 363, 437, 25);
        }
    }, false);
    //适配Ipad Pro
} else if (window.matchMedia("(width:1024px)").matches & window.matchMedia("(height:1366px)").matches) {
    forTablet();
    btn1.addEventListener("click", () => {
        if (imgGroup.style.transition === "all 1s ease 0s") {
            return;
        } else {
            skateAnimation(1, 29, 50);
            bgAnimationTablet(2, 1);
            timeAnimation(166, 330, 496, 596, 25);
        }
    }, false);
} else { //桌面浏览器
    forDeskTop();
    btn1.addEventListener("click", () => {
        if (imgGroup.style.transition === "all 1s ease 0s") {
            return;
        } else {
            skateAnimation(1, 29, 50);
            bgAnimation(1, 1);
            if (window.matchMedia("(min-width:1301px)").matches) {
                timeAnimation(180, 357, 532, 650, 25);
            } else if (window.matchMedia("(min-width:1131px)").matches) {
                timeAnimation(143, 278, 413, 495, 27);
            } else if (window.matchMedia("(max-width:1130px)").matches) {
                timeAnimation(113, 218, 323, 385, 30);
            }
        }
    }, false);
};
//监听点击事件, 停止动画
btn2.addEventListener("click", () => {
    clearAllTimer();
}, false);
//绑定重看事件
btn3.addEventListener("click", () => {
    initialization();
}, false);
//绑定重载事件
btn4.addEventListener("click", () => {
    location.reload()
}, false);

function creatImg() {
    mainLeft.innerHTML = "<img src='img/transparent/skateMan0.jpg' alt='' />"
};
//桌面浏览器自动适配
function forDeskTop() {
    bgBox.style.height = `${eachImg.offsetHeight}px`;
    container.style.width = bgBox.style.width = `${eachImg.offsetWidth}px`;
    imgGroup.style.width = `${eachImg.offsetWidth * imgNum}px`;

    window.addEventListener("resize", () => {
        bgBox.style.height = `${eachImg.offsetHeight}px`;
        imgGroup.style.width = `${eachImg.offsetWidth * imgNum}px`;
        container.style.width = bgBox.style.width = `${eachImg.offsetWidth}px`;
    }, false)
}
//平板自动适配
function forTablet() {
    bgBox.style.height = `${eachImg.offsetHeight}px`;
    imgGroup.style.width = `${eachImg.offsetWidth * imgNum}px`;
    container.style.width = bgBox.style.width = `${screenWidth}px`;
};
//背景动画函数
function bgAnimation(distance, ms) {
    clearTimeout(bgTimer);
    bgTimer = setTimeout(() => {
        offset -= distance;
        if (offset < -imgGroup.offsetWidth + eachImg.offsetWidth) {
            clearTimeout(bgTimer);
        } else {
            imgGroup.style.transform = `translate3d(${offset}px, 0, 0)`;
            bgAnimation(distance, ms);
        }
    }, ms);
};
//背景动画函数（平板适配）
function bgAnimationTablet(distance, ms) {
    clearTimeout(bgTimer);
    bgTimer = setTimeout(() => {
        offset -= distance;
        if (offset < -imgGroup.offsetWidth + screenWidth) {
            clearTimeout(bgTimer);
        } else {
            imgGroup.style.transform = `translate3d(${offset}px, 0, 0)`;
            bgAnimationTablet(distance, ms);
        }
    }, ms);
};
//滑板动画函数
function skateAnimation(firstImg, lastImg, mS) {
    clearTimeout(skateTimer);

    skateTimer = setTimeout(() => {
        i++;
        if (i <= lastImg) {
            skateMan.src = `img/transparent/skateMan${i}.jpg`;
        } else {
            i = firstImg;
        }
        skateAnimation(firstImg, lastImg, mS);
    }, mS);
};
//时间动画函数
function timeAnimation(firstWidth, secondWidth, thirdWidth, totalWidth, timeLineMS) {
    let lineWidth;
    (function lineAnimation() {
        lineWidth = timeLine.offsetWidth;
        timeLineTimer = setTimeout(() => {
            lineWidth += 1;
            if (lineWidth <= totalWidth) {
                timeLine.style.width = `${lineWidth}px`;
                lineAnimation();
            } else {
                clearTimeout(timeLineTimer);
            }
        }, timeLineMS);
    })();
    //文本框和时间点根据时间轴长度分别淡出和显示
    (function contentAnimation() {
        dots[0].style.display = "block";
        textDiv1.className = "text";
        contentTimer = setInterval(() => {
            lineWidth = timeLine.offsetWidth;
            switch (lineWidth) {
                case firstWidth:
                    dots[1].style.display = "block";
                    textDiv2.className = "text";
                    break;
                case secondWidth:
                    dots[2].style.display = "block";
                    textDiv3.className = "text";
                    break;
                case thirdWidth:
                    dots[3].style.display = "block";
                    textDiv4.className = "text";
                    break;
                case totalWidth:
                    clearInterval(contentTimer);
                    break;
            }
        }, 10);
    })();
}
//还原函数
function initialization() {
    clearAllTimer();
    offset = 0;
    skateMan.src = `img/transparent/skateMan0.jpg`;
    imgGroup.style.transform = `translate3d(${offset}px, 0, 0)`;
    imgGroup.style.transition = "all 1s ease 0s";
    imgGroup.addEventListener("transitionend", () => {
        imgGroup.style.transition = "all 0s linear 0s";
    }, false)
}

function clearAllTimer() {
    clearTimeout(skateTimer);
    clearTimeout(bgTimer);
    clearTimeout(timeLineTimer);
    clearInterval(contentTimer);
}