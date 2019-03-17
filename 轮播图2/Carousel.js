const container = document.getElementById("container");
const slideBar = document.getElementById("slideBar");
const imgWidth = slideBar.children[0].offsetWidth;
const barChildren = slideBar.querySelectorAll("#slideBar li");
slideBar.style.width = barChildren.length * imgWidth + "px";

const dotsChildren = document.querySelectorAll("#dots span");

let imgIndex = 1;
let offset;
let timer;

function animation(duration) {
    offset = imgIndex * -imgWidth;
    slideBar.style.transform = `translate3d(${offset}px,0px,0px)`;
    dotsAni();
    if (!imgIndex) {
        slideBar.style.transition = `none`;
    } else {
        slideBar.style.transition = `${duration}ms`;
    };
    imgIndex += 1;
};

function dotsAni() {
    for (let i = 0; i < dotsChildren.length; i++) {
        dotsChildren[i].style.background = "#FFC60B";
    }
    if (imgIndex == 4) {
        dotsChildren[0].style.background = "#FF8B00";
    } else {
        dotsChildren[imgIndex].style.background = "#FF8B00";
    };
};

function playAnimation() {
    timer = setInterval(() => {
        animation(700);
    }, 1000);
};

slideBar.addEventListener("transitionend", function() {
    if (imgIndex >= barChildren.length - 2) {
        imgIndex = 0;
        animation();
    }
});

container.onmouseover = () => {
    clearInterval(timer);
};

container.onmouseout = () => {
    playAnimation();
};

playAnimation();