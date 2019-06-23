// 时间线和时间点
const timeLine = getEle("#timeLine");
const dots = getAll("#timeDot>li");
let lineHeight = timeLine.offsetHeight;
// 时间线和文字
const textDiv1 = getEle("#text1");
const textDiv2 = getEle("#text2");
const textDiv3 = getEle("#text3");
const textDiv4 = getEle("#text4");
//时间线计时器
let timeLineTimer = null;
let contentTimer = null;
// 按钮
const btn0 = getEle("#btnBox input:first-child");
const btn1 = getEle("#btnBox input:nth-child(2)");
const btn2 = getEle("#btnBox input:nth-child(3)");
const btn3 = getEle("#btnBox input:nth-child(4)");
const btn4 = getEle("#btnBox input:last-child");
//实例化对象
const animationObj = {
    imgBar: "#imgGroup",
    imgBarWidth: "2560",
    man: "#mainLeft",
    manEachWidth: "20",
    manTotalWidth: "600",
};
var aboutMeObj = new Animation(animationObj);

//语言选择框事件
btn0.addEventListener("click", () => {
    if (floatTitle.className == "floatTitleMin" || floatTitle.className == "floatTitleMin ftHidden") {
        floatTitle.className = "floatTitleMin ftDisplay";
    } else {
        floatTitle.className = "floatTitleMin ftHidden";
    }
}, false);
//监听点击事件, 开启动画
btn1.addEventListener("click", () => {
    if (imgGroup.style.transition === "all 1s ease 0s") {
        return;
    } else {
        aboutMeObj.manAnimation();
        aboutMeObj.bgAnimation();
        timeLineAnimationMobile();
        for (let i = 0; i < lanDivs.length; i++) {
            lanDivs[i].style.left = "5%";
            lanDivs[i].style.textAlign = "left";
        };
        floatTitle.className = "floatTitleMin";
        btn0.style.display = "block";
    }
}, false);
//监听点击事件, 停止动画
btn2.addEventListener("click", () => {
    clearAllTimer();
}, false);
//还原事件
btn3.addEventListener("click", () => {
    aboutMeObj.initialization();
}, false);
//刷新事件
btn4.addEventListener("click", () => {
    location.reload()
}, false);

//背景人物动画对象
function Animation(obj) {
    this.imgBar = obj.imgBar;
    this.imgBarWidth = obj.imgBarWidth;
    this.imgOffset = obj.imgOffset || 0;
    this.man = obj.man;
    this.manOffset = obj.manOffset || 0;
    this.manEachWidth = obj.manEachWidth;
    this.manTotalWidth = obj.manTotalWidth;
    this.manMs = obj.manMs || 50;
    this.manTimer = null;
    this.bgTimer = null;
}
//背景动画方法
Animation.prototype.bgAnimation = function() {
    clearTimeout(this.bgTimer);
    const self = this;
    const imgBar = document.querySelector(this.imgBar);
    const screenWidth = document.documentElement.clientWidth;

    (function bgAni() {
        self.bgTimer = setTimeout(() => {
            self.imgOffset -= 1;
            if (self.imgOffset < -self.imgBarWidth + screenWidth) {
                clearTimeout(self.bgTimer);
            } else {
                imgBar.style.transform = `translate3d(${self.imgOffset}px, 0, 0)`;
                bgAni();
            }
        }, 5);
    })()
}
//人物动画方法
Animation.prototype.manAnimation = function() {
    clearTimeout(this.manTimer);
    const self = this;
    const man = document.querySelector(this.man);

    (function manAni() {
        self.manTimer = setTimeout(() => {
            self.manOffset -= self.manEachWidth;
            self.manOffset <= -self.manTotalWidth ? self.manOffset = 0 : self.manOffset;
            man.style.backgroundPositionX = `${self.manOffset}rem`;
            manAni();
        }, self.manMs);
    })();
}
//动画还原方法
Animation.prototype.initialization = function() {
    clearAllTimer();
    const man = document.querySelector(this.man);
    const imgBar = document.querySelector(this.imgBar);
    this.imgOffset = 0;
    man.style.backgroundPositionX = "0";
    imgBar.style.transform = `translate3d(${this.imgOffset}px, 0, 0)`;
    imgBar.style.transition = "all 1s ease 0s";
    imgBar.addEventListener("transitionend", () => {
        imgBar.style.transition = "all 0s linear 0s";
    }, false)
}
//时间线动画函数
function timeLineAnimationMobile() {
    //时间轴动画函数
    (function timeLineAni() {
        clearTimeout(timeLineTimer);
        timeLineTimer = setTimeout(() => {
            lineHeight += 1;
            if (lineHeight <= 239) {
                timeLine.style.height = `${lineHeight}px`;
                timeLineAni();
            } else {
                clearTimeout(timeLineTimer);
            }
        }, 50);
    })();
    //文本框和时间点根据时间轴长度分别淡出和显示
    (function contentAni() {
        clearInterval(contentTimer);
        dots[0].style.display = "block";
        textDiv1.className = "text";
        contentTimer = setInterval(() => {
            lineLength = timeLine.offsetHeight;
            switch (lineLength) {
                case 70:
                    dots[1].style.display = "block";
                    textDiv2.className = "text";
                    break;
                case 150:
                    dots[2].style.display = "block";
                    textDiv3.className = "text";
                    break;
                case 220:
                    dots[3].style.display = "block";
                    textDiv4.className = "text";
                    break;
                case 239:
                    clearInterval(contentTimer);
                    break;
            }
        }, 30);
    })();
}

function clearAllTimer() {
    clearTimeout(aboutMeObj.manTimer);
    clearTimeout(aboutMeObj.bgTimer);
    clearTimeout(timeLineTimer);
    clearInterval(contentTimer);
}