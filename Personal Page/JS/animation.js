let bgTimer;
let textTimer;
let skateTimer;
let i = 0;
let offset = 0;

function forDeskTop() {
    bgBox.style.height = `${eachImg.offsetHeight}px`;
    container.style.width = bgBox.style.width = `${eachImg.offsetWidth}px`;
    imgGroup.style.width = `${eachImg.offsetWidth * imgNum}px`;

    window.addEventListener("resize", () => {
        bgBox.style.height = `${eachImg.offsetHeight}px`;
        imgGroup.style.width = `${eachImg.offsetWidth * imgNum}px`;
        container.style.width = bgBox.style.width = `${eachImg.offsetWidth}px`;
    }, false)

}

const screenWidth = document.documentElement.clientWidth;

function forTablet() {
    bgBox.style.height = `${eachImg.offsetHeight}px`;
    imgGroup.style.width = `${eachImg.offsetWidth * imgNum}px`;
    container.style.width = bgBox.style.width = `${screenWidth}px`;

};

function bgAnimationTablet(distance, ms) { //背景动画函数
    clearTimeout(bgTimer);
    bgTimer = setTimeout(() => {
        offset -= distance;
        if (offset < -imgGroup.offsetWidth + screenWidth) {
            clearTimeout(bgTimer);
        } else {
            imgGroup.style.transform = `translate3d(${offset}px, 0, 0)`;
            bgAnimationTablet(distance, ms);
        }
    }, ms);
};

function bgAnimation(distance, ms) { //背景动画函数
    clearTimeout(bgTimer);
    bgTimer = setTimeout(() => {
        offset -= distance;
        if (offset < -imgGroup.offsetWidth + eachImg.offsetWidth) {
            clearTimeout(bgTimer);
        } else {
            imgGroup.style.transform = `translate3d(${offset}px, 0, 0)`;
            bgAnimation(distance, ms);
        }
    }, ms);
};

function creatImg() {
    mainLeft.innerHTML = "<img src='img/transparent/skateMan0.jpg' alt='' />"
};


function skateAnimation(firstImg, lastImg, mS) { //滑板动画函数
    const skateMan = getEle("#mainLeft>img");
    clearTimeout(skateTimer);
    skateTimer = setTimeout(() => {
        i++;
        if (i <= lastImg) {
            skateMan.src = `img/transparent/skateMan${i}.jpg`;
        } else {
            i = firstImg;
        }
        skateAnimation(firstImg, lastImg, mS);
    }, mS);
};

function timeAnimation(firstWidth, secondWidth, thirdWidth, totalWidth, timeLineMS) {
    (function lineAnimation() { //时间轴动画函数
        let lineWidth = timeLine.offsetWidth;
        timeLineTimer = setTimeout(() => {
            lineWidth += 1;
            if (lineWidth <= totalWidth) {
                timeLine.style.width = `${lineWidth}px`;
                lineAnimation();
            } else {
                clearTimeout(timeLineTimer);
            }
        }, timeLineMS);
    })();

    (function contentAnimation() { //文本框和时间点根据时间轴长度分别淡出和显示
        dots[0].style.display = "block";
        textDiv1.className = "text";
        contentTimer = setInterval(() => {
            let lineWidth = timeLine.offsetWidth;
            switch (lineWidth) {
                case firstWidth:
                    dots[1].style.display = "block";
                    textDiv2.className = "text";
                    break;
                case secondWidth:
                    dots[2].style.display = "block";
                    textDiv3.className = "text";
                    break;
                case thirdWidth:
                    dots[3].style.display = "block";
                    textDiv4.className = "text";
                    break;
                case totalWidth:
                    clearInterval(contentTimer);
                    break;
            }
        }, 10);
    })();
}

// function TimeLine (obj){
//     this.firstWidth = obj.firstWidth;
//     this.secondWidth = obj.secondWidth;
//     this.thirdWidth = obj.thirdWidth;
//     this.totalWidth = obj.totalWidth;
//     this.timeLineMS = obj.timeLineMS;
//     this.timeLine = "#timeLine";
//     this.lineWidth ="0";

//     this.timeLineTimer =null;
//     this.contentTimer =null;
//     this.timeLineAnimation();
// }



// TimeLine.prototype.timeLineAnimation = function() { //时间线动画函数
//     const self=this;
//     const timeLine = document.querySelector(this.timeLine);
//     console.log("1");

//     (function timeLineAni() { //时间轴动画函数
//         clearTimeout(self.timeLineTimer);
//         timeLine.style.display = "block";
//         console.log("3");
//         self.timeLineTimer = setTimeout(() => {
//             console.log("4");
//            self.lineWidth += 1;
//             console.log("5");
//             if (self.lineWidth <= self.totalWidth) {
//                 console.log("6");
//                 timeLine.style.offsetWidth = `${self.lineWidth}px`;
//                 console.log("7");
//                 timeLineAni();
//             } else {
//                 clearTimeout(timeLineTimer);
//             }
//         }, this.timeLineMS);
//     })();

//     (function contentAni() { //文本框和时间点根据时间轴长度分别淡出和显示
//         let lineWidth = timeLine.offsetWidth;
//         dots[0].style.display = "block";
//         textDiv1.className = "text";
//         const self=this;
//         this.contentTimer = setInterval(() => {
//             // self.lineWidth = timeLine.offsetWidth;
//             switch (self.lineWidth) {
//                 case self.firstWidth:
//                     dots[1].style.display = "block";
//                     textDiv2.className = "text";
//                     break;
//                 case self.secondWidth:
//                     dots[2].style.display = "block";
//                     textDiv3.className = "text";
//                     break;
//                 case self.thirdWidth:
//                     dots[3].style.display = "block";
//                     textDiv4.className = "text";
//                     break;
//                 case self.totalWidth:
//                     clearInterval(contentTimer);
//                     break;
//             }
//         }, 30);
//     })();
// }