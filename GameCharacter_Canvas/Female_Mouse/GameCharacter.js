class Character {
    constructor(hero) {
        this.canvas = document.querySelector(hero.canvasNode);
        this.ctx = this.canvas.getContext("2d");
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
        //动作速率
        this.fwSpeed = hero.fwSpeed;
        this.stSpeed = hero.stSpeed;
        this.fwStep = hero.fwStep;
        this.timer = null;
        //人物脚底坐标
        this.stepPointX = 244;
        this.stepPointY = 290;
        //方向（初始化向下）
        this.direction = hero.direction || 3;
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
            0, 0, this.ctx.canvas.width, this.ctx.canvas.height
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
            0, 0, this.ctx.canvas.width, this.ctx.canvas.height
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
                    0, 0, this.ctx.canvas.width, this.ctx.canvas.height
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

    direHandler(offsetX, offsetY) {
        if (offsetX >= 0 && offsetY >= 0) { //左上
            console.log("Top Left");
            const targetX = this.canCenterX - Math.abs(offsetX);
            const targetY = this.canCenterY - Math.abs(offsetY);
            const move = () => {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    if (this.canCenterX > targetX) {
                        this.canCenterX -= this.fwStep;
                    }
                    if (this.canCenterY > targetY) {
                        this.canCenterY -= this.fwStep;
                    }
                    if (Math.abs(offsetX) > Math.abs(offsetY)) {
                        this.direction = 1;
                        if (this.canCenterX <= targetX && this.canCenterY <= targetY) {
                            clearTimeout(this.timer);
                            this.stand(this.direction);
                            return;
                        }
                        this.forWard(this.direction);
                    } else if (Math.abs(offsetX) < Math.abs(offsetY)) {
                        this.direction = 0;
                        if (this.canCenterX <= targetX && this.canCenterY <= targetY) {
                            clearTimeout(this.timer);
                            this.stand(this.direction);
                            return;
                        }
                        this.forWard(this.direction);
                    }
                    move();
                }, this.fwSpeed)
            }
            move();
        } else if (offsetX >= 0 && offsetY <= 0) { //左下
            console.log("Bottom Left");
            const targetX = this.canCenterX - Math.abs(offsetX);
            const targetY = this.canCenterY + Math.abs(offsetY);
            const move = () => {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    if (this.canCenterX > targetX) {
                        this.canCenterX -= this.fwStep;
                    }
                    if (this.canCenterY < targetY) {
                        this.canCenterY += this.fwStep;
                    }
                    if (Math.abs(offsetX) > Math.abs(offsetY)) {
                        this.direction = 1;
                        if (this.canCenterX <= targetX && this.canCenterY >= targetY) {
                            clearTimeout(this.timer);
                            this.stand(this.direction);
                            return;
                        }
                        this.forWard(this.direction);
                    } else if (Math.abs(offsetX) < Math.abs(offsetY)) {
                        this.direction = 3;
                        if (this.canCenterX <= targetX && this.canCenterY >= targetY) {
                            clearTimeout(this.timer);
                            this.stand(this.direction);
                            return;
                        }
                        this.forWard(this.direction);
                    }
                    move();
                }, this.fwSpeed)
            }
            move();
        } else if (offsetX <= 0 && offsetY >= 0) { //右上
            console.log("Top Right");
            const targetX = this.canCenterX + Math.abs(offsetX);
            const targetY = this.canCenterY - Math.abs(offsetY);
            const move = () => {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    if (this.canCenterX < targetX) {
                        this.canCenterX += this.fwStep;
                    }
                    if (this.canCenterY > targetY) {
                        this.canCenterY -= this.fwStep;
                    }
                    if (Math.abs(offsetX) > Math.abs(offsetY)) {
                        this.direction = 2;
                        if (this.canCenterX >= targetX && this.canCenterY <= targetY) {
                            clearTimeout(this.timer);
                            this.stand(this.direction);
                            return;
                        }
                        this.forWard(this.direction);
                    } else if (Math.abs(offsetX) < Math.abs(offsetY)) {
                        this.direction = 0;
                        if (this.canCenterX >= targetX && this.canCenterY <= targetY) {
                            clearTimeout(this.timer);
                            this.stand(this.direction);
                            return;
                        }
                        this.forWard(this.direction);
                    }
                    move();
                }, this.fwSpeed)
            }
            move();
        } else if (offsetX <= 0 && offsetY <= 0) { //右下
            console.log("Bottom Right");
            const targetX = this.canCenterX + Math.abs(offsetX);
            const targetY = this.canCenterY + Math.abs(offsetY);
            const move = () => {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    if (this.canCenterX < targetX) {
                        this.canCenterX += this.fwStep;
                    }
                    if (this.canCenterY < targetY) {
                        this.canCenterY += this.fwStep;
                    }
                    if (Math.abs(offsetX) > Math.abs(offsetY)) {
                        this.direction = 2;
                        if (this.canCenterX >= targetX && this.canCenterY >= targetY) {
                            clearTimeout(this.timer);
                            this.stand(this.direction);
                            return;
                        }
                        this.forWard(this.direction);
                    } else if (Math.abs(offsetX) < Math.abs(offsetY)) {
                        this.direction = 3;
                        if (this.canCenterX >= targetX && this.canCenterY >= targetY) {
                            clearTimeout(this.timer);
                            this.stand(this.direction);
                            return;
                        }
                        this.forWard(this.direction);
                    }
                    move();
                }, this.fwSpeed)
            }
            move();
        }
    }

    init() {
        this.loadImage();
        window.addEventListener('click', (e) => {
            let rect = this.canvas.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            if (!(x <= 0 || y <= 0 || x >= 752 || y >= 602)) {
                let offsetX = this.canCenterX + this.stepPointX - x;
                let offsetY = this.canCenterY + this.stepPointY - y;
                this.fwIndex = this.fwStart;
                this.direHandler(offsetX, offsetY);
            }
        })
        this.stand(this.direction);
        console.log("Character Ready! Control with the mouse.")
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
    stSpeed: 300,
    fwSpeed: 50,
    fwStep: 8
})

hero.init();