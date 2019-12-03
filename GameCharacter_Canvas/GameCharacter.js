class Character {
    constructor(hero) {
        this.ctx = document.querySelector(hero.canvasNode).getContext("2d");
        this.image = new Image();
        this.image.src = hero.imageSrc;

        this.imageCol = hero.imageCol;
        this.imageRow = hero.imageRow;


        this.timer = null;
        this.index = hero.index;

        this.wardSpeed = 100;
        this.standSpeed = 300;

        this.downCol = 0;
        this.rightCol = 1;
        this.leftCol = 2;
        this.upCol = 3;

        this.standStart = 0;
        this.wardStart = 4;
        this.wardEnd = 12;
    }

    downWard() {
        this.index = this.wardStart;
        const eachWidth = this.image.width / this.imageCol;
        const eachHeight = this.image.height / this.imageRow;
        const canCenterX = this.ctx.canvas.width / 2 - eachWidth / 2;
        const canCenterY = this.ctx.canvas.height / 2 - eachHeight / 2;

        const downWard = () => {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.index++;
                if (this.index >= this.wardEnd) {
                    this.index = this.wardStart;
                }

                this.ctx.clearRect(
                    canCenterX, canCenterY,
                    eachWidth, eachHeight
                );
                this.ctx.drawImage(
                    this.image,
                    this.index * eachWidth, this.downCol * eachHeight,
                    eachHeight, eachHeight,
                    canCenterX, canCenterY,
                    eachHeight, eachHeight
                );
                downWard();
            }, this.wardSpeed)
        };
        downWard();
    }

    rightWard() {
        this.index = this.wardStart;
        const eachWidth = this.image.width / this.imageCol;
        const eachHeight = this.image.height / this.imageRow;
        const canCenterX = this.ctx.canvas.width / 2 - eachWidth / 2;
        const canCenterY = this.ctx.canvas.height / 2 - eachHeight / 2;

        const rightWard = () => {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.index++;
                if (this.index >= this.wardEnd) {
                    this.index = this.wardStart;
                }

                this.ctx.clearRect(
                    canCenterX, canCenterY,
                    eachWidth, eachHeight
                );
                this.ctx.drawImage(
                    this.image,
                    this.index * eachWidth, this.rightCol * eachHeight,
                    eachHeight, eachHeight,
                    canCenterX, canCenterY,
                    eachHeight, eachHeight
                );
                rightWard();
            }, this.wardSpeed)
        };
        rightWard();
    }

    leftWard() {
        this.index = this.wardStart;
        const eachWidth = this.image.width / this.imageCol;
        const eachHeight = this.image.height / this.imageRow;
        const canCenterX = this.ctx.canvas.width / 2 - eachWidth / 2;
        const canCenterY = this.ctx.canvas.height / 2 - eachHeight / 2;

        const leftWard = () => {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.index++;
                if (this.index >= this.wardEnd) {
                    this.index = this.wardStart;
                }

                this.ctx.clearRect(
                    canCenterX, canCenterY,
                    eachWidth, eachHeight
                );
                this.ctx.drawImage(
                    this.image,
                    this.index * eachWidth, this.leftCol * eachHeight,
                    eachHeight, eachHeight,
                    canCenterX, canCenterY,
                    eachHeight, eachHeight
                );
                leftWard();
            }, this.wardSpeed)
        };
        leftWard();
    }

    upWard() {
        this.index = this.wardStart;
        const eachWidth = this.image.width / this.imageCol;
        const eachHeight = this.image.height / this.imageRow;
        const canCenterX = this.ctx.canvas.width / 2 - eachWidth / 2;
        const canCenterY = this.ctx.canvas.height / 2 - eachHeight / 2;

        const upWard = () => {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.index++;
                if (this.index >= this.wardEnd) {
                    this.index = this.wardStart;
                }

                this.ctx.clearRect(
                    canCenterX, canCenterY,
                    eachWidth, eachHeight
                );
                this.ctx.drawImage(
                    this.image,
                    this.index * eachWidth, this.upCol * eachHeight,
                    eachHeight, eachHeight,
                    canCenterX, canCenterY,
                    eachHeight, eachHeight
                );
                upWard();
            }, this.wardSpeed)
        };
        upWard();
    }


    downWardStand() {
        this.index = this.standStart;
        const eachWidth = this.image.width / this.imageCol;
        const eachHeight = this.image.height / this.imageRow;
        const canCenterX = this.ctx.canvas.width / 2 - eachWidth / 2;
        const canCenterY = this.ctx.canvas.height / 2 - eachHeight / 2;

        const downWardStand = () => {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.index++;
                if (this.index >= this.wardStart) {
                    this.index = this.standStart;
                }

                this.ctx.clearRect(
                    canCenterX, canCenterY,
                    eachWidth, eachHeight
                );
                this.ctx.drawImage(
                    this.image,
                    this.index * eachWidth, this.downCol * eachHeight,
                    eachHeight, eachHeight,
                    canCenterX, canCenterY,
                    eachHeight, eachHeight
                );
                downWardStand();
            }, this.standSpeed)
        };
        downWardStand();
    }


}

const hero = new Character({
    canvasNode: "canvas",
    imageSrc: "css_sprites.png",
    index: 4,
    imageCol: 12,
    imageRow: 4
})
window.onload = () => {
    hero.upWard();
}