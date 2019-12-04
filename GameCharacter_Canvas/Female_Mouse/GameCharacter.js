class Character {
    constructor(hero) {
        this.ctx = document.querySelector(hero.canvasNode).getContext("2d");
        this.imageSrc = hero.imageSrc;
        //图片的行列
        this.imageCol = hero.imageCol;
        this.imageRow = hero.imageRow;
        //走动与站立动画帧下标
        this.fwIndex = hero.fwIndex;
        this.stIndex = hero.stIndex;
        //站立起始帧
        this.stStart = hero.stStart;
        //走动起始于结束帧
        this.fwStart = hero.fwStart;
        this.fwEnd = hero.fwEnd;
        this.stSpeed = hero.stSpeed;
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

    forWard(actionRow) {
        clearTimeout(this.timer);
        this.fwIndex++;
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
            this.eachWidth * this.fwIndex, this.eachHeight * actionRow,
            this.eachHeight, this.eachHeight,
            this.canCenterX, this.canCenterY,
            this.eachHeight, this.eachHeight
        )
    }

    stand(actionRow) {
        this.index = this.stStart;
        //立即初始化站立
        this.ctx.clearRect(
            this.canCenterX, this.canCenterY,
            this.eachWidth, this.eachHeight
        );
        this.ctx.drawImage(
            this.image,
            this.eachWidth * this.index, this.eachHeight * actionRow,
            this.eachHeight, this.eachHeight,
            this.canCenterX, this.canCenterY,
            this.eachHeight, this.eachHeight
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
                    this.eachWidth * this.stIndex, this.eachHeight * actionRow,
                    this.eachHeight, this.eachHeight,
                    this.canCenterX, this.canCenterY,
                    this.eachHeight, this.eachHeight
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
                    this.forWard(0);
                    break;
                case 97: //A键向左97
                    this.forWard(1);
                    break;
                case 100: //D键向右100
                    this.forWard(2);
                    break;
                case 115: //S键向下115
                    this.forWard(3);
                    break;
            }
        }, false);

        //站立事件
        window.addEventListener("keyup", (event) => {
            switch (event.keyCode) {
                case 87: //向上87
                    this.stand(0);
                    break;
                case 65: //向左65
                    this.stand(1);
                    break;
                case 68: //向右68
                    this.stand(2);
                    break;
                case 83: //向下83
                    this.stand(3);
                    break;
            }
            this.fwIndex = 4;
        }, false);
        this.stand(3);
        console.log("Character Ready! Control with the mouse.")
    }
};

const hero = new Character({
    canvasNode: "canvas",
    imageSrc: "css_sprites.png",
    imageCol: 12,
    imageRow: 4,
    fwIndex: 4,
    stIndex: 0,
    stStart: 0,
    fwStart: 4,
    fwEnd: 12,
    stSpeed: 300
})

hero.init();