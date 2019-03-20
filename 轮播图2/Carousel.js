const container = document.getElementById("container");
const slideBar = document.getElementById("slideBar");
const imgWidth = slideBar.children[0].offsetWidth;
const barChildren = slideBar.querySelectorAll("#slideBar li");
slideBar.style.width = barChildren.length * imgWidth + "px";

const buttons = document.querySelectorAll(".button");
const prevButton = document.getElementById("prevSlide");
const nextButton = document.getElementById("nextSlide");
const dotsChildren = document.querySelectorAll("#dots>span");

let imgIndex = 0;
let timer;

function animation(duration) { //轮播动画
    let offset = imgIndex * -imgWidth;
    slideBar.style.transform = `translate3d(${offset}px,0px,0px)`;
    if (!imgIndex) {
        slideBar.style.transition = `none`;
    } else {
        slideBar.style.transition = `${duration}ms`;
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
    timer = setInterval(() => {
        imgIndex++;
        animation(700);
    }, 1500);
};

playAnimation(); //开启轮播

slideBar.addEventListener("transitionend", function() { //监听动画结束事件, 伪图一变真图一
    if (imgIndex >= barChildren.length - 3) {
        imgIndex = 0;
        animation();
    }
    // else if(imgIndex==0){ //可以使用prevButton但是有bug
    //     imgIndex=4;
    //     slideBar.style.transform = `translate3d(${imgIndex*-imgWidth}px,0px,0px)`;
    //     slideBar.style.transition = `none`;
    // } 
});

container.onmouseover = () => { //鼠标进入事件
    clearInterval(timer);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.visibility = "visible";
    }
};

container.onmouseout = () => { //鼠标离开事件
    // if(imgIndex==4){ //可以使用prevButton但是有bug
    //     imgIndex=-1;
    // }; 
    playAnimation();
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.visibility = "hidden";
    }
};

nextButton.onclick = () => { //下一张
    imgIndex++;
    animation(700);
};

prevButton.onclick = () => { //上一张
    imgIndex--;
    slideBar.style.transform = `translate3d(${imgIndex*-imgWidth}px,0px,0px)`;
    slideBar.style.transition = `700ms`;
    dotsAni();
};

(function clickDots() { //点击圆点事件
    for (let i = 0; i < dotsChildren.length; i++) {
        dotsChildren[i].onclick = () => {
            imgIndex = i;
            let offset = imgIndex * -imgWidth;
            slideBar.style.transform = `translate3d(${offset}px,0px,0px)`;
            slideBar.style.transition = `700ms`;
            dotsAni();
        }
    }
})();