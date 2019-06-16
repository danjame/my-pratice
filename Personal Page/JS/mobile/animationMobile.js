function Animation(obj) { //背景人物动画对象
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

Animation.prototype.bgAnimation = function() { //背景动画方法
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

Animation.prototype.manAnimation = function() { //人物动画方法
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

Animation.prototype.initialization = function(){
    clearTimeout(aboutMeObj.manTimer);
    clearTimeout(aboutMeObj.bgTimer);
    clearTimeout(timeLineTimer);
    clearInterval(contentTimer);
    const man = document.querySelector(this.man);
    const imgBar = document.querySelector(this.imgBar);
    this.imgOffset = 0;
    man.style.backgroundPositionX = "0";
    imgBar.style.transform = `translate3d(${this.imgOffset}px, 0, 0)`;
    imgBar.style.transition = "all 1s ease 0s";
    imgBar.addEventListener("transitionend",()=>{
        imgBar.style.transition = "all 0s linear 0s";
    },false)
}

let timeLineTimer = null; //时间线计时器
let contentTimer = null;
const timeLine = document.querySelector("#timeLine");
let lineLength = timeLine.offsetHeight;

function timeLineAnimationMobile() { //时间线动画函数   
    // const timeLine = document.querySelector("#timeLine");
    // let lineLength = timeLine.offsetHeight;

    (function timeLineAni() { //时间轴动画函数
        clearTimeout(timeLineTimer);
        timeLine.style.display = "block";
        timeLineTimer = setTimeout(() => {
            lineLength += 1;
            if (lineLength <= 239) {
                timeLine.style.height = `${lineLength}px`;
                timeLineAni();
            } else {
                clearTimeout(timeLineTimer);
            }
        }, 50);
    })();

    (function contentAni() { //文本框和时间点根据时间轴长度分别淡出和显示
        const dots = document.querySelectorAll(".timeDots>li");
        dots[0].style.display = "block";
        document.querySelector("#text1").className = "text";

        contentTimer = setInterval(() => {
            lineLength = timeLine.offsetHeight;
            switch (lineLength) {
                case 70:
                    dots[1].style.display = "block";
                    getEle("#text2").className = "text";
                    break;
                case 150:
                    dots[2].style.display = "block";
                    getEle("#text3").className = "text";
                    break;
                case 220:
                    dots[3].style.display = "block";
                    getEle("#text4").className = "text";
                    break;
                case 239:
                    clearInterval(contentTimer);
                    break;
            }
        }, 30);
    })();
}