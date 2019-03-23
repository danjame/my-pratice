const container = document.getElementById("container");
const slideBar = document.getElementById("slideBar");
const imgWidth = slideBar.children[0].offsetWidth;
const barChildren = slideBar.querySelectorAll("#slideBar li");
slideBar.style.width = barChildren.length * imgWidth + "px";

const dotsChildren = document.querySelectorAll("#dots span");
const iniPosition = slideBar.offsetLeft;
const buttons = document.querySelectorAll(".button");
const prevButton = document.getElementById("prevSlide");
const nextButton = document.getElementById("nextSlide");
const clickDots = document.querySelectorAll("#dots>span");

let imgIndex = 0;
let aniTimer = null;

function animation() {
    changeImg(50, 1);
    changeDots();
}

function changeImg(speed, time) { //轮播动画
    clearInterval(aniTimer);
    aniTimer = setInterval( //轮播一张的动画定时器
        () => {
            let targetPosition = (imgIndex * -imgWidth);
            let currentPosition = slideBar.offsetLeft - iniPosition;
            let step = (targetPosition - currentPosition) / speed;
            if (!step) {
                clearInterval(aniTimer);
            }
            step > 0 ? step = Math.ceil(step) : step = Math.floor(step);
            currentPosition += step;
            slideBar.style.left = `${currentPosition}px`;
        }, time)
};

function changeDots() { //圆点变化
    for (let i = 0; i < dotsChildren.length; i++) {
        dotsChildren[i].style.background = "#FFC60B";
        if (imgIndex == dotsChildren.length) {
            dotsChildren[0].style.background = "#FF8B00";
        } else {
            dotsChildren[imgIndex].style.background = "#FF8B00";
        }
    }
};

function restore() { //最后一张回到第一张
    imgIndex++;
    if (imgIndex >= barChildren.length - 2) {
        slideBar.style.left = "0px";
        imgIndex = 1;
    }
};

let autoSlide = null;

function autoTimer() {
    autoSlide = setTimeout(() => { //轮播所有图片定时器
        restore();
        animation();
        autoTimer();
    }, 2000);
}

autoTimer();

container.onmouseover = () => { //鼠标进入事件
    clearInterval(autoSlide);
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.visibility = "visible";
    }
};

container.onmouseout = () => { //鼠标离开事件
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.visibility = "hidden";
    };
    autoTimer();
};

nextButton.onclick = () => { //下一张图片
    restore();
    animation();
};

prevButton.onclick = () => { //上一张图片
    imgIndex--;
    if (imgIndex < 0) {
        imgIndex = barChildren.length - 4;
        slideBar.style.left = `${imgIndex * -imgWidth-150}px`;
    }
    animation();
}

(function activeDots() { //点击圆点事件函数
    for (let i = 0; i < clickDots.length; i++) {
        clickDots[i].onclick = () => {
            imgIndex = i;
            animation();
        }
    }
})();