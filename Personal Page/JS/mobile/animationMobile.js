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

Animation.prototype.initialization = function() {
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
    imgBar.addEventListener("transitionend", () => {
        imgBar.style.transition = "all 0s linear 0s";
    }, false)
}

menu.addEventListener("click", () => { //头部菜单动画
    if (menuList.className === "activedMenu") {
        for (let i = 0; i < menuBars.length; i++) {
            menuBars[i].className = "menuBarsOff";
        };
        menuList.className = "unactivedMenu";
        menu.className = "unclickMenu";
    } else {
        for (let i = 0; i < menuBars.length; i++) {
            menuBars[i].className = "menuBarsOn";
        };
        menuList.className = "activedMenu";
        menu.className = "clickMenu";
    }
}, false);


let lineHeight = timeLine.offsetHeight;
function timeLineAnimationMobile() { //时间线动画函数   
    (function timeLineAni() { //时间轴动画函数
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

    (function contentAni() { //文本框和时间点根据时间轴长度分别淡出和显示
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