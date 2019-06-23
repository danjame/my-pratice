const header = getEle("#header");
const slideBox = getEle("#slideBox");
const eachSlide = getAll("#slideBar>div");
const navBox = getEle(".navBox");
const contentNav = document.querySelector(".contentNav");
const contentNavAni = document.querySelector(".navBox>ul:last-child");
let clientHeight = document.documentElement.clientHeight;

autoAdjust();
//自适应函数
function autoAdjust() {
    //轮播导航自适应
    contentNav.style.marginTop = `${(clientHeight-header.offsetHeight-contentNav.offsetHeight)/2}px`;
    //每张幻灯片高度自适应
    for (let i = 0; i < eachSlide.length; i++) {
        eachSlide[i].style.height = `${clientHeight-header.offsetHeight}px`;
    }
    //幻灯片div与导航div高度自适应
    slideBox.style.height = navBox.style.height = `${clientHeight-header.offsetHeight}px`;
    //轮播副本导航自适应
    contentNavAni.style.marginTop = `${contentNav.style.marginTop}`;
}

window.addEventListener("resize", () => {
    clientHeight = document.documentElement.clientHeight;
    autoAdjust();
}, false);

function SlideImg(obj) { //定义构造函数
    this.container = obj.container;
    this.barNode = obj.barNode; //图片组节点
    this.totalNum = obj.totalNum; //图片数
    this.iniPosition = obj.iniPosition || 0; //图片组初始x坐标
    this.dotsFather = obj.dotsFather; //图片点父元素节点
    this.dotNodes = obj.dotNodes; //图片点
    this.dotNodesAni = obj.dotNodesAni; // 图片点动画层
    this.dotActived = obj.dotActived; //图片点出现动画
    this.dotUnactived = obj.dotUnactived; //图片点消失动画

    this.index = obj.initIndex || 0; //初始下标
    this.speed = obj.speed || 80; //轮播速度
    this.interval = obj.timeMs || 4000; //时间间隔
    this.slideTimer = null; //单张滑动定时器
    this.iniTimer = null; //全局定时器

    this.stopEvent = obj.stopEvent || "mouseover"; //停止轮播事件类型
    this.startEvent = obj.startEvent || "mouseout"; //启动轮播事件类型
    this.dotsEventType = obj.dotsEventType || "click"; //图片点事件类型

    this.colorForActivedDot = obj.colorForActivedDot; //图片点激活颜色
    this.colorForUnactivedDot = obj.colorForUnactivedDot; //图片点未激活颜色

    this.autoSlide(); //全局动画初始化方法
    this.slideEngine(); //停止与启动轮播控制方法
    this.dotsEvent(); //图片点控制方法
};
//单张图片动画方法
SlideImg.prototype.slideAnimation = function() {
    const slideBar = document.querySelector(this.barNode);
    const iniPosition = this.iniPosition;
    const speed = this.speed;
    let index = this.index;
    clearInterval(this.slideTimer);
    //单张图片动画定时器
    this.slideTimer = setInterval(
        () => {
            console.log(slideBar.style.top);
            let targetPosition = index * (-clientHeight + header.offsetHeight) + iniPosition;
            let currentPosition = slideBar.offsetTop;
            let step = (targetPosition - currentPosition) / speed;
            if (!step) {
                clearInterval(this.slideTimer);
                return;
            }
            step > 0 ? step = Math.ceil(step) : step = Math.floor(step);
            currentPosition += step;
            slideBar.style.top = `${currentPosition}px`;
            console.log(slideBar.style.top);
        }, 1)
    //图片点动画方法
    this.dotsAnimation();
};
//轮播首尾过度方法
SlideImg.prototype.reStore = function() {
    const slideBar = document.querySelector(this.barNode);
    if (this.index >= this.totalNum + 1) {
        this.index = 1;
        slideBar.style.top = `${this.iniPosition}px`;
    }
};
//全局动画初始化方法
SlideImg.prototype.autoSlide = function() {
    const self = this;

    function iniTimer() {
        self.iniTimer = setTimeout(function() {
            self.index += 1;
            self.reStore();
            self.slideAnimation();
            iniTimer();
        }, self.interval);
    }
    iniTimer();
};
//停止与启动轮播控制方法
SlideImg.prototype.slideEngine = function() {
    const self = this;
    const container = document.querySelector(this.container);
    container.addEventListener(this.stopEvent, function() {
        clearTimeout(self.iniTimer);
    }, false);

    container.addEventListener(this.startEvent, function() {
        self.autoSlide();
    }, false);
};
//图片点控制方法
SlideImg.prototype.dotsEvent = function() {
    const self = this;
    const dotNodes = document.querySelectorAll(this.dotNodes);
    const dotsFather = document.querySelector(this.dotsFather);
    dotsFather.addEventListener(self.dotsEventType, function() {
        const targetNode = event.target;
        if (targetNode.nodeName === dotsFather.children[0].nodeName) {
            for (let i = 0; i < self.dotNodes.length; i++) {
                if (dotNodes[i] === targetNode)
                    self.index = i;
            }
            self.slideAnimation();
        }
    }, false);
};
//图片点动画方法
SlideImg.prototype.dotsAnimation = function() {
    const dotNodesAni = document.querySelectorAll(this.dotNodesAni);
    for (let i = 0; i < dotNodesAni.length; i++) {
        if (dotNodesAni[i].className === this.dotActived) {
            dotNodesAni[i].className = this.dotUnactived;
        }
        if (this.index === dotNodesAni.length) {
            dotNodesAni[0].className = this.dotActived;
        } else {
            dotNodesAni[this.index].className = this.dotActived;
        }
    }
};