const container = document.getElementById("container");
const slideBar = document.getElementById("slideBar");
const imgWidth = slideBar.children[0].offsetWidth;
const barChildren = slideBar.querySelectorAll("#slideBar>li");
slideBar.style.width = barChildren.length * imgWidth + "px";

const buttons = document.querySelectorAll(".button");
const prevButton = document.getElementById("prevSlide");
const nextButton = document.getElementById("nextSlide");
const dotsChildren = document.querySelectorAll("#dots>span");

let imgIndex = 0;
let timer;

function transform(node, offsetX, offsetY, offsetZ) { //封装变形属性
    node.style.transform = `translate3d(${offsetX}px, ${offsetY}px, ${offsetZ}px)`
}

function transition(node, time) { //封装过度属性
    node.style.transition = `${time}ms`
}

function bothTrans() {
    transform(slideBar, imgIndex * -imgWidth, 0, 0);
    transition(slideBar, 700);
}

function animation() { //轮播动画
    transform(slideBar, imgIndex * -imgWidth, 0, 0);
    if (!imgIndex) {
        transition(slideBar, 0);
    } else {
        transition(slideBar, 700);
    }
    dotsAni();
};


function dotsAni() { //圆点动画
    for (let i = 0; i < dotsChildren.length; i++) {
        dotsChildren[i].style.background = "#FFC60B";
    }
    if (imgIndex == dotsChildren.length) {
        dotsChildren[0].style.background = "#FF8B00";
    } else {
        dotsChildren[imgIndex].style.background = "#FF8B00";
    }
};

function playAnimation() { //自动轮播
    timer = setTimeout(() => {
        imgIndex++;
        animation();
        playAnimation();
    }, 1500)
};

playAnimation(); //开启轮播

slideBar.addEventListener("transitionend", () => { //监听动画结束事件, 伪图一换成真图一
    if (imgIndex >= barChildren.length - 3) {
        imgIndex = 0;
        animation();
    }
});

container.onmouseover = () => { //鼠标进入事件
    clearTimeout(timer);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.visibility = "visible";
    }
};

container.onmouseout = () => { //鼠标离开事件
    playAnimation();
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.visibility = "hidden";
    }
};

nextButton.onclick = () => { //下一张
    imgIndex++;
    animation();
};


prevButton.onclick = () => { //上一张
    imgIndex--;
    if (imgIndex < 0) {
        imgIndex = 4;
        transform(slideBar, -2000, 0, 0);
        transition(slideBar, 0); //第一张切回最后一张 待实现
    }
    bothTrans();
    dotsAni();

};

(function clickDots() { //点击圆点事件
    for (let i = 0; i < dotsChildren.length; i++) {
        dotsChildren[i].onclick = () => {
            imgIndex = i;
            bothTrans();
            dotsAni();
        }
    }
})();