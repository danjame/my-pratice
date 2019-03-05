//SkateMan动画函数
function skateAnimation(startNum,endNum,mS,startEle,startEve,stopEle,stopEve) {
    var timer;
    var i=startNum;
    //定义滑板动画事件，定义定时器
    function startTimer() {
        clearInterval(timer);
        timer=setInterval(function () {
            if (i<=endNum) {
                getId("skateMan").src="img/transparent/skateMan"+i+".jpg";
                i++;
            }else{
                i=startNum;
            }
        },mS);
    }
    //定义停止动画事件，消除定时器
    function stopTimer(){
        clearInterval(timer);
    }
    //绑定动画事件，启动定时器
    getId(startEle).addEventListener(startEve,startTimer,false);
    //绑定清除动画事件，消除定时器
    getId(stopEle).addEventListener(stopEve,stopTimer,false);
}

//背景动画函数
function bgAnimation(speed,mS,startEle,startEve,stopEle,stopEve) {
    var timer;
    var current=0;
    //定义背景图片动画定时器
    function bgMove() {
        clearInterval(timer);
        timer=setInterval(function () {
            var getUl=getId("container").children[0];
            current-=speed;
            if(current<=-3600){
                clearInterval(timer);
            }else{
                getUl.style.left=current+"px";
            }
        },mS);
    }
    //消除动画定时器
    function stopBgMove(){
        clearInterval(timer);
    }
    //绑定启动定时器和消除定时器事件
    getId(startEle).addEventListener(startEve,bgMove,false);
    getId(stopEle).addEventListener(stopEve,stopBgMove,false);
}

//时间标签淡出函数
function pointTagAnimation(ele,mS) {
    var opacity=getId(ele).style.opacity*10;
    var counter=setInterval(function () {
        opacity+=1/10;
        if(opacity<=1){
            getId(ele).style.opacity=opacity;
        }else{
            clearInterval(counter);
        }
    },mS)
}



