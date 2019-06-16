function Animation(obj) {  //背景人物动画对象
    this.imgBar = obj.imgBar;
    this.imgLis = obj.imgLis;
    this.anyImg = obj.anyImg;
    this.offset = obj.offset || 0;

    this.man = obj.man;
    this.manIndex = obj.manIndex || 0;
    this.firstIndex = obj.firstIndex;
    this.lastIndex = obj.lastIndex;
    this.manMs = obj.manMs || 50;

    this.manTimer = null;
    this.bgTimer = null;
}

Animation.prototype.bgAnimation = function() { //背景动画方法
    clearTimeout(this.bgTimer);
    const self = this;
    const imgBar = document.querySelector(this.imgBar);
    const imgNum = document.querySelectorAll(this.imgLis).length;
    const eachWidth = document.querySelector(this.anyImg).offsetWidth; 
    const screenWidth = document.documentElement.clientWidth;
    const imgBarWidth = eachWidth * imgNum;

    function bgAni() {
        self.bgTimer = setTimeout(() => {
            self.offset -= 1;
            if (self.offset < -imgBarWidth + screenWidth) {
                clearTimeout(self.bgTimer);
            } else {
                imgBar.style.left = `${self.offset}px`;
                bgAni();
            }
        }, 1);
    }
    bgAni();
}

Animation.prototype.manAnimation = function() { //人物动画方法
    clearTimeout(this.manTimer);
    const self = this;
    const man = document.querySelector(this.man);

    (function manAni() {
        self.manTimer = setTimeout(() => {
            self.manIndex++;
            if (self.manIndex <= self.lastIndex) {
                man.src = `img/transparent/skateMan${self.manIndex}.jpg`;
            } else {
                self.manIndex = self.firstIndex;
            }
            manAni();
        }, self.manMs);
    })();
}

let timeLineTimer; //时间线计时器

function timeLineAnimationMobile() { //时间轴动画函数
    const timeLine = document.querySelector("#timeLine");
    let lineLength = timeLine.offsetHeight;
    timeLine.style.display = "block";

    timeLineTimer = setTimeout(() => {
        lineLength += 1;
        if (lineLength <= 239) {
            timeLine.style.height = `${lineLength}px`;
            timeLineAnimationMobile();
        } else {
            clearTimeout(timeLineTimer);
        }
    }, 63);
};

function textAnimationMobile(ele, mS) { //文本框淡出动画函数
    let opacity = getEle(ele).style.opacity * 10;
    let textTimer = setInterval(() => {
        opacity += 1 / 10;
        if (opacity <= 9 / 10) {
            getEle(ele).style.opacity = opacity;
            textAnimationMobile(ele, mS);
        } else {
            clearInterval(textTimer);
        }
    }, mS)
}

function contentAnimationMobile() { //文本框和时间点根据时间轴长度分别淡出和显示
    const dots = document.querySelectorAll(".timeDots>li");
    dots[0].style.display = "block";
    textAnimationMobile("#text1", 150);
    contentTimer = setInterval(() => {
        let lineLength = getEle("#timeLine").offsetHeight;
        switch (lineLength) {
            case 70:
                dots[1].style.display = "block";
                textAnimationMobile("#text2", 150);
                break;
            case 150:
                dots[2].style.display = "block";
                textAnimationMobile("#text3", 150);
                break;
            case 220:
                dots[3].style.display = "block";
                textAnimationMobile("#text4", 150);
                break;
            case 239:
                clearInterval(contentTimer);
                break;
        }
    }, 10);
};