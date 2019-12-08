class Character {
    constructor(hero) {
        this.ctx = document.querySelector(hero.canvasNode).getContext("2d");
        this.imageSrc = hero.imageSrc;
        //图片的行列
        this.imageCol = hero.imageCol;
        this.imageRow = hero.imageRow;
        //站立起始帧
        this.stStart = hero.stStart;
        //走动起始于结束帧
        this.fwStart = hero.fwStart;
        this.fwEnd = hero.fwEnd;
        //走动与站立动画帧下标
        this.fwIndex = this.fwStart;
        this.stIndex = this.stStart;
        this.stSpeed = hero.stSpeed;
        //方向（初始化向下）
        this.direction = hero.direction || 3;
        this.timer = null;
    }

    loadImage() {
        this.image = new Image();
        this.image.onload = () => {
            this.eachWidth = this.image.width / this.imageCol;
            this.eachHeight = this.image.height / this.imageRow;
            this.canCenterX = this.ctx.canvas.width / 2 - this.eachWidth / 2;
            this.canCenterY = this.ctx.canvas.height / 2 - this.eachHeight / 2
        }
        this.image.src = this.imageSrc;
    }

    forWard(direction) {
        //判断走动帧位置
        if (this.fwIndex >= this.fwEnd) {
            this.fwIndex = this.fwStart;
        }
        //清除画布，否贼重影
        this.ctx.clearRect(
            this.canCenterX, this.canCenterY,
            this.eachWidth, this.eachHeight
        );
        //绘制图片
        this.ctx.drawImage(
            this.image,
            this.eachWidth * this.fwIndex, this.eachHeight * direction,
            this.eachWidth, this.eachHeight,
            this.canCenterX, this.canCenterY,
            this.eachWidth, this.eachHeight
        );
        this.fwIndex++;
    }

    stand(direction) {
        //立即初始化站立
        this.ctx.clearRect(
            this.canCenterX, this.canCenterY,
            this.eachWidth, this.eachHeight
        );
        this.ctx.drawImage(
            this.image,
            this.eachWidth * this.stIndex, this.eachHeight * direction,
            this.eachWidth, this.eachHeight,
            this.canCenterX, this.canCenterY,
            this.eachWidth, this.eachHeight
        );
        //站立动画定时器
        const stand = () => {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.stIndex++;
                if (this.stIndex >= this.fwStart) {
                    this.stIndex = this.stStart;
                }
                //清除画布
                this.ctx.clearRect(
                    this.canCenterX, this.canCenterY,
                    this.eachWidth, this.eachHeight
                );
                //绘制图片
                this.ctx.drawImage(
                    this.image,
                    this.eachWidth * this.stIndex, this.eachHeight * direction,
                    this.eachWidth, this.eachHeight,
                    this.canCenterX, this.canCenterY,
                    this.eachWidth, this.eachHeight
                );
                stand();
            }, this.stSpeed)
        }
        //初始化站立方法
        stand()
    }

    init() {
        this.loadImage();
        //走动事件
        window.addEventListener("keypress", (event) => {
            switch (event.keyCode) {
                case 119: //W键向上119
                    clearTimeout(this.timer);
                    this.direction = 0;
                    this.forWard(this.direction);
                    break;
                case 97: //A键向左97
                    clearTimeout(this.timer);
                    this.direction = 1;
                    this.forWard(this.direction);
                    break;
                case 100: //D键向右100
                    clearTimeout(this.timer);
                    this.direction = 2;
                    this.forWard(this.direction);
                    break;
                case 115: //S键向下115
                    clearTimeout(this.timer);
                    this.direction = 3;
                    this.forWard(this.direction);
                    break;
            };
        }, false);

        //站立事件
        window.addEventListener("keyup", (event) => {
            //复原走路index
            this.fwIndex = this.fwStart;
            this.stand(this.direction);
        }, false);
        this.stand(this.direction);this.
        console.log("Character Ready! Control with WASD.")
    }
};

const hero = new Character({
    canvasNode: "canvas",
    imageSrc: "css_sprites.png",
    imageCol: 12,
    imageRow: 4,
    stStart: 0,
    fwStart: 4,
    fwEnd: 12,
    stSpeed: 300
})

hero.init();