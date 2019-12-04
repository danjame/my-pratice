class Character {
    constructor(hero) {
        this.canvas = document.querySelector(hero.canvasNode);
        this.ctx = this.canvas.getContext("2d");
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
        this.fwSpeed = hero.fwSpeed;
        this.stSpeed = hero.stSpeed;
        this.timer = null;

        this.curPositionX = 369;
        this.curPositionY = 390;
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
        // const forWard = () => {
        // clearTimeout(this.timer);
        // this.timer = setTimeout(() => {
        this.fwIndex++;
        //判断走动帧位置
        if (this.fwIndex >= this.fwEnd) {
            this.fwIndex = this.fwStart;
        }
        //清除画布，否贼重影
        this.ctx.clearRect(
            0, 0, this.ctx.canvas.width, this.ctx.canvas.height
        );
        //绘制图片
        this.ctx.drawImage(
            this.image,
            this.eachWidth * this.fwIndex, this.eachHeight * actionRow,
            this.eachHeight, this.eachHeight,
            this.canCenterX, this.canCenterY,
            this.eachHeight, this.eachHeight
        )
        // forWard();
        // }, this.fwSpeed)
        // }
        // forWard();
    }

    stand(actionRow) {
        this.index = this.stStart;
        //立即初始化站立
        this.ctx.clearRect(
            0, 0, this.ctx.canvas.width, this.ctx.canvas.height
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
                    0, 0, this.ctx.canvas.width, this.ctx.canvas.height
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

    direction(offsetX, offsetY) {
        //右上
        if (offsetX > 0 && offsetY > 0) {
            this.canCenterX = this.canCenterX - offsetX;
            this.canCenterY = this.canCenterY - offsetY;
            this.forWard(0);
        } else if (offsetX > 0 && offsetY < 0) { //右下
            this.canCenterX = this.canCenterX - offsetX;
            this.canCenterY = this.canCenterY + offsetY;
            this.forWard(0);
        } else if (offsetX < 0 && offsetY > 0) { //左上
            this.canCenterX = this.canCenterX + offsetX;
            this.canCenterY = this.canCenterY - offsetY;
            this.forWard(0);
        } else if (offsetX < 0 && offsetY < 0) { //左下
            this.canCenterX = this.canCenterX + offsetX;
            this.canCenterY = this.canCenterY + offsetY;
            this.forWard(0);
        }
        console.log(this.canCenterX);
        console.log(this.canCenterY);
    }

    init() {
        this.loadImage();
        window.addEventListener('click', (e) => {
            let rect = this.canvas.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            // console.log("x: " + x + " y: " + y);
            if (!(x <= 0 || y <= 0 || x >= 752 || y >= 602)) {
                let offsetX = this.curPositionX - x;
                let offsetY = this.curPositionY - y;
                this.direction(offsetX, offsetY)
            }
        })
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
    fwSpeed: 100,
    stSpeed: 300
})

hero.init();

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
}