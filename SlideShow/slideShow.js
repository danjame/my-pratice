var container=document.getElementById("container");
var slideImg=document.getElementById("slideImg");
var preButton=document.getElementById("preSlide");
var nextButon=document.getElementById("nextSlide");
var buttons=document.getElementsByClassName("button");
var imgPoints=document.getElementsByTagName("span");
var current=0;
var timer;

function switchImgDot(){//图和点的变化函数
	slideImg.style.left=current+"px";//获取图片组的位移数据
	for(var i=0;i<imgPoints.length;i++){//图片对应圆点的css样式变化
		imgPoints[i].style.background="#FFC60B";
		imgPoints[current/(-500)].style.background="#FF8B00";
	}
};

function slideTimer(){//设置定时器
	timer=setInterval(function(){
		if(current<=-1500){//如果焦点于第四张图片,则输出第二张图片的位移数据
			current=500;
		};
		current-=500;//1.直接进行计算,移动一张图距离;2.若焦点于第四张图片,仍然进行计算,则回到零位移点;
		switchImgDot();//更变图片和圆点样式
	},1000);
};

preSlide.onclick=function(){//前一张图事件绑定
	if(current>=0){//判断是否为零位移点
		current=-1500;//若为零位移点则回到第四张图
	}else{
		current+=500;//否则直接右移动一张图的距离
	}
	switchImgDot()//更变图片和圆点样式
};

nextSlide.onclick=function(){//后一张图事件绑定
	if(current<=-1500){//判断是否为第四张图片的位移点
		current=0;//判断是否为零位移点
	}else{
		current-=500;//若为零位移点则回到第四张图
	}
	switchImgDot();//更变图片和圆点样式
};

container.onmouseover=function(){//鼠标经过事件绑定
	clearInterval(timer);//消除定时器,图片静止
	for(var i=0;i<buttons.length;i++){
		buttons[i].style.visibility="visible";//向前向后的按钮由隐藏变为可视
	}
};

container.onmouseout=function(){//鼠标离开事件绑定
	slideTimer();//重置定时器
	for(var i=0;i<buttons.length;i++){
		buttons[i].style.visibility="hidden";//向前向后的按钮变回隐藏状态
	}
};

function clickPoints(){//圆点点击按钮事件函数
	for(var i=0;i<imgPoints.length;i++){//遍历所有圆点
		imgPoints[i].index=i;//创立index属性并且通过下标赋值
		imgPoints[i].onclick=function(){//绑定点击事件
			for (var j=0;j<imgPoints.length;j++) {//再次遍历所有圆点
				imgPoints[j].style.background="#FFC60B";//还原所有圆点的样式
			}
			this.style.background="#FF8B00";//通过this的指向设置触发点击事件的圆点的样式
			current=-500*this.index;//同时改变图片的位移数据
			slideImg.style.left=current+"px";//移动图片组
		}
	}
};

clickPoints();//触发圆点点击事件函数

slideTimer();//启动定时器









