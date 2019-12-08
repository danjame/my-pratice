class Character {
    constructor(hero) {
        this.ctx = document.querySelector(hero.canvasNode).getContext("2d");
        this.imageSrc = hero.imageSrc;
        //图片的行列
        this.imageCol = hero.imageCol;
        this.imageRow = hero.imageRow;
        //动作起始帧
        this.stStart = hero.stStart;
        this.fwStart = hero.fwStart;
        this.fwEnd = hero.fwEnd;
        this.atStart = hero.atStart;
        this.atEnd = this.imageCol;
        //动作动画帧下标
        this.fwIndex = this.fwStart;
        this.stIndex = this.stStart;
        this.jpIndex = this.fwEnd;
        this.atIndex = this.atStart;
        //动作速率
        this.stSpeed = hero.stSpeed;
        this.jpSpeed = hero.jpSpeed;
        this.atSpeed = hero.atSpeed;
        this.step = hero.step;
        this.jpDistance = hero.jpDistance;
        this.timer = null;
        this.moveTimer = null;

        this.direction = 1;
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
        };
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
            this.eachWidth * 0, this.eachHeight * direction,
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
                };
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
        stand();
    }

    jump(direction) {
        this.ctx.clearRect(
            0, 0, this.ctx.canvas.width, this.ctx.canvas.height
        );
        this.ctx.drawImage(
            this.image,
            this.eachWidth * this.jpIndex, this.eachHeight * direction,
            this.eachWidth, this.eachHeight,
            this.canCenterX, this.canCenterY,
            this.eachWidth, this.eachHeight
        );
        //站立动画定时器
        const jump = () => {
            this.moveTimer = setTimeout(() => {
                this.jpIndex++;
                if (this.jpIndex >= this.atStart) {
                    this.jpIndex = this.fwEnd;
                    this.stand(direction);
                    this.moveTimer = null;
                    return;
                }
                this.direction === 0 ? this.canCenterX -= this.jpDistance : this.canCenterX += this.jpDistance;
                //清除画布
                this.ctx.clearRect(
                    0, 0, this.ctx.canvas.width, this.ctx.canvas.height
                );
                //绘制图片
                this.ctx.drawImage(
                    this.image,
                    this.eachWidth * this.jpIndex, this.eachHeight * direction,
                    this.eachWidth, this.eachHeight,
                    this.canCenterX, this.canCenterY,
                    this.eachWidth, this.eachHeight
                );
                jump();
            }, this.jpSpeed)
        };
        //初始化站立方法
        jump();
    }

    attack(direction) {
        this.ctx.clearRect(
            0, 0, this.ctx.canvas.width, this.ctx.canvas.height
        );
        this.ctx.drawImage(
            this.image,
            this.eachWidth * this.atIndex, this.eachHeight * direction,
            this.eachWidth, this.eachHeight,
            this.canCenterX, this.canCenterY,
            this.eachWidth, this.eachHeight
        );
        //站立动画定时器
        const attack = () => {
            clearTimeout(this.timer);
            this.moveTimer = setTimeout(() => {
                this.atIndex++;
                // console.log(this.atIndex);
                if (this.atIndex >= this.atEnd) {
                    this.atIndex = this.atStart;
                    this.stand(direction);
                    this.moveTimer = null;
                    return;
                }
                //清除画布
                this.ctx.clearRect(
                    0, 0, this.ctx.canvas.width, this.ctx.canvas.height
                );
                //绘制图片
                this.ctx.drawImage(
                    this.image,
                    this.eachWidth * this.atIndex, this.eachHeight * direction,
                    this.eachWidth, this.eachHeight,
                    this.canCenterX, this.canCenterY,
                    this.eachWidth, this.eachHeight
                );
                attack();
            }, this.atSpeed)
        };
        //初始化站立方法
        attack();
    }

    init() {
        this.loadImage();
        //走动
        window.addEventListener("keypress", (event) => {
            if (!this.moveTimer) {
                if (event.keyCode === 97) {
                    //A键向左97
                    clearTimeout(this.timer);
                    this.direction = 0;
                    this.forWard(this.direction);
                    this.canCenterX -= this.step;
                } else if (event.keyCode === 100) {
                    //D键向右100
                    clearTimeout(this.timer);
                    this.direction = 1;
                    this.forWard(this.direction);
                    this.canCenterX += this.step;
                }
            }
        }, false);
        //跳跃和攻击
        window.addEventListener("keydown", (event) => {
            if (!this.moveTimer) {
                //J键74,K键75
                if (event.keyCode === 74) {
                    clearTimeout(this.timer);
                    this.attack(this.direction);
                } else if (event.keyCode === 75) {
                    clearTimeout(this.timer);
                    this.jump(this.direction);
                }
            }
        }, false)
        //站立
        window.addEventListener("keyup", (event) => {
            //复原走动index
            this.fwIndex = this.fwStart;
            if (!this.moveTimer) {
                if (event.keyCode === 65 || event.keyCode === 68 || event.keyCode === 74 || event.keyCode === 75) {
                    this.stand(this.direction);
                }
            }
        }, false);
        this.stand(this.direction);
        console.log("Character Ready! Move with AD, attack with J and jump with K.")
    }
};

const hero = new Character({
    canvasNode: "canvas",
    imageSrc: "css_sprites.png",
    imageCol: 31,
    imageRow: 2,
    stStart: 0,
    fwStart: 4,
    fwEnd: 12,
    atStart: 23,

    stSpeed: 300,
    jpSpeed: 120,
    atSpeed: 120,
    step: 20,
    jpDistance: 15
})

hero.init();