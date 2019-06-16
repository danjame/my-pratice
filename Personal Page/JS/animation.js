const container = getEle("#container");
const bgBox = getEle("#bgBox");
container.style.width = bgBox.style.width = eachImg.offsetWidth + "px";

// bgBox.style.height = getEle("#imgGroup li:first-child img").offsetHeight + "px";

window.onresize = () => {
    imgGroup.style.width = `${eachImg.offsetWidth * imgNum}px`;
    container.style.width = bgBox.style.width = eachImg.offsetWidth + "px";
    bgBox.style.height = getEle("#imgGroup li:first-child img").offsetHeight + "px";
}


let skateTimer;
let i = 0;

let bgTimer;
let offset = 0;

let textTimer;
let contentTimer;
// let timeLineTimer;

function bgAnimation() { //背景动画函数
    const imgGroup = getEle("#imgGroup");
    clearTimeout(bgTimer);
    bgTimer = setTimeout(() => {
        offset -= 1;
        if (offset < -imgGroup.offsetWidth + imgGroup.children[0].offsetWidth) {
            clearTimeout(bgTimer);
        } else {
            imgGroup.style.left = `${offset}px`;
            bgAnimation();
        }
    }, 1);
};

function skateAnimation(firstImg, lastImg, mS) { //滑板动画函数
    const skateMan = getEle("#skateMan");
    clearTimeout(skateTimer);
    skateTimer = setTimeout(() => {
        i++;
        if (i <= lastImg) {
            skateMan.src = `img/transparent/skateMan${i}.jpg`;
        } else {
            i = firstImg;
        }
        skateAnimation(1, 29, 50);
    }, mS);
};

function timeLineAnimation() { //时间轴动画函数
    const timeLine = getEle("#timeLine");
    let lineWidth = timeLine.offsetWidth;
    timeLine.style.display = "block";
    timeLineTimer = setTimeout(() => {
        lineWidth += 1;
        if (lineWidth <= 390) {
            timeLine.style.width = `${lineWidth}px`;
            timeLineAnimation();
        } else {
            clearTimeout(timeLineTimer);
        }
    }, 35);
};

function textAnimation(ele, mS) { //文本框淡出动画函数
    let opacity = getEle(ele).style.opacity * 10;
    let textTimer = setInterval(() => {
        opacity += 1 / 10;
        if (opacity <= 1) {
            getEle(ele).style.opacity = opacity;
            textAnimation(ele, mS);
        } else {
            clearInterval(textTimer);
        }
    }, mS)
}

function contentAnimation() { //文本框和时间点根据时间轴长度分别淡出和显示
    const dots = document.querySelectorAll(".timeDots>li");
    dots[0].style.display = "block";
    textAnimation("#text1", 150);
    contentTimer = setInterval(() => {
        let lineWidth = getEle("#timeLine").offsetWidth;
        switch (lineWidth) {
            case 110:
                dots[1].style.display = "block";
                textAnimation("#text2", 150);
                break;
            case 220:
                dots[2].style.display = "block";
                textAnimation("#text3", 150);
                break;
            case 330:
                dots[3].style.display = "block";
                textAnimation("#text4", 150);
                break;
            case 390:
                clearInterval(contentTimer);
                break;
        }
    }, 10);
};

// getEle("#btn3").addEventListener("click", () => { //绑定重载事件
//     location.reload()
// }, false);

// getEle("#btn1").addEventListener("click", () => { //监听点击事件, 开启动画
//     skateAnimation(1, 29, 50);
//     bgAnimation();
//     timeLineAnimation();
//     contentAnimation()
// }, false);

// getEle("#btn2").addEventListener("click", () => { //监听点击事件, 停止动画
//     clearTimeout(skateTimer);
//     clearTimeout(bgTimer);
//     clearTimeout(timeLineTimer)
// }, false);