function SlideImg(obj) { //定义构造函数
    this.container = obj.containerNode; //图片容器
    this.imgsNode = obj.ulNode; //图片组节点
    this.dotsFather = obj.dotsFather; //图片点父元素节点
    this.dotNodes = obj.dotNodes; //图片点
    this.sideBtns = obj.buttons; //两次按钮
    this.nextButton = obj.nextButton; //右侧按钮
    this.prevButton = obj.prevButton; //左侧按钮

    this.imgWidth = obj.eachWidth; //每张图片宽度
    this.imgsNum = obj.imgsNum; //图片数
    this.iniPosition = obj.iniPosition; //图片组初始x坐标
    this.index = obj.initIndex || 0; //初始下标
    this.speed = obj.speed || 50; //轮播速度
    this.interval = obj.timeMs || 2000; //时间间隔
    this.slideTimer = null; //单张滑动定时器
    this.iniTimer = null; //全局定时器

    this.stopEvent = obj.stopEvent || "mouseover"; //停止轮播事件类型
    this.stopEventProperty = obj.stopEventProperty || "visible"; //停止轮播按钮属性变化
    this.startEvent = obj.startEvent || "mouseout"; //启动轮播事件类型
    this.startEventProperty = obj.startEventProperty || "hidden"; //启动轮播按钮属性变化
    this.btnsEventType = obj.btnsEventType || "click"; //左右按钮事件类型
    this.dotsEventType = obj.dotsEventType || "click"; //图片点事件类型

    this.colorForActivedDot = obj.colorForActivedDot; //图片点激活颜色
    this.colorForUnactivedDot = obj.colorForUnactivedDot; //图片点未激活颜色

    this.autoSlide(); //全局动画初始化方法
    this.slideEngine(); //停止与启动轮播控制方法
    this.dotsEvent(); //图片点控制方法
    this.btnsEvent(); //左右按钮控制方法
};

SlideImg.prototype.slideAnimation = function() { //单张图片动画方法
    const slideBar = document.querySelector(this.imgsNode);
    const imgWidth = this.imgWidth;
    const iniPosition = this.iniPosition;
    const speed = this.speed;
    let index = this.index;

    clearInterval(this.slideTimer);
    this.slideTimer = setInterval( //单张图片动画定时器
        () => {
            let targetPosition = index * -imgWidth + iniPosition;
            let currentPosition = slideBar.offsetLeft
            let step = (targetPosition - currentPosition) / speed;
            if (!step) {
                clearInterval(this.slideTimer);
                return;
            }
            step > 0 ? step = Math.ceil(step) : step = Math.floor(step);
            currentPosition += step;
            slideBar.style.left = `${currentPosition}px`;
        }, 1)
    this.dotsAnimation(); //图片点动画方法
};

SlideImg.prototype.reStore = function() { //轮播首尾过度方法
    const slideBar = document.querySelector(this.imgsNode);
    if (this.index >= this.imgsNum + 1) {
        this.index = 1;
        slideBar.style.left = `${this.iniPosition}px`;
    }
};

SlideImg.prototype.autoSlide = function() { //全局动画初始化方法
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

SlideImg.prototype.slideEngine = function() { //停止与启动轮播控制方法
    const self = this;
    const container = document.querySelector(this.container);
    const sideBtns = document.querySelectorAll(this.sideBtns);

    container.addEventListener(this.stopEvent, function() { //停止轮播事件
        clearTimeout(self.iniTimer);
        for (let i = 0; i < sideBtns.length; i++) {
            sideBtns[i].style.visibility = self.stopEventProperty;
        }
    }, false);

    container.addEventListener(this.startEvent, function() { //启动轮播事件
        self.autoSlide();
        for (let i = 0; i < sideBtns.length; i++) {
            sideBtns[i].style.visibility = self.startEventProperty;
        };
    }, false);
};

SlideImg.prototype.dotsAnimation = function() { //图片点动画方法
    const dotNodes = document.querySelectorAll(this.dotNodes);
    for (let i = 0; i < dotNodes.length; i++) {
        dotNodes[i].style.background = this.colorForUnactivedDot;
        if (this.index === dotNodes.length) {
            dotNodes[0].style.background = this.colorForActivedDot;
        } else {
            dotNodes[this.index].style.background = this.colorForActivedDot;
        }
    }
};

SlideImg.prototype.dotsEvent = function() { //图片点控制方法
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

SlideImg.prototype.btnsEvent = function() { //左右按钮控制方法
    const self = this;
    const nextButton = document.querySelector(this.nextButton);
    const prevButton = document.querySelector(this.prevButton);
    const slideBar = document.querySelector(this.imgsNode);

    nextButton.addEventListener(self.btnsEventType, function() { //右侧按钮事件监听
        self.index++;
        self.reStore();
        self.slideAnimation();
    }, false)

    prevButton.addEventListener(self.btnsEventType, function() { //左侧按钮事件监听
        self.index--;
        if (self.index < 0) {
            self.index = self.imgsNum - 1;
            slideBar.style.left = `${(self.index+1) * -self.imgWidth + self.iniPosition}px`;
        }
        self.slideAnimation();
    }, false)
};