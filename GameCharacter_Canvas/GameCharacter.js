class Character {
    constructor(hero) {
        this.ctx = document.querySelector(hero.canvasNode).getContext("2d");
        this.image = new Image();
        this.image.src = hero.imageSrc;

        this.imageCol = hero.imageCol;
        this.imageRow = hero.imageRow;


        this.timer = null;
        this.index = hero.index;

        this.dnCol = 0;
        this.dnStandStart = 0;
        this.dnWardStart = 4;
        this.dnWardEnd = 12;
    }

    downWard() {
        this.index = this.dnWardStart;
        const eachWidth = this.image.width / this.imageCol;
        const eachHeight = this.image.height / this.imageRow;
        const canCenterX = this.ctx.canvas.width / 2 - eachWidth / 2;
        const canCenterY = this.ctx.canvas.height / 2 - eachHeight / 2;

        const downWard = () => {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.index++;
                if (this.index >= this.dnWardStart) {
                    this.index = this.dnWardStart;
                }

                this.ctx.clearRect(
                    canCenterX, canCenterY,
                    eachWidth, eachHeight
                );
                this.ctx.drawImage(
                    this.image,
                    this.index * eachWidth, this.downCol,
                    eachHeight, eachHeight,
                    canCenterX, canCenterY,
                    eachHeight, eachHeight
                );
                downWard();
            }, 100)
        };
        downWard();
    }

    rightWard() {

    }

    leftWard() {

    }

    backWard() {

    }


    downWardStand() {
        this.index = this.dnStandStart;
        const eachWidth = this.image.width / this.imageCol;
        const eachHeight = this.image.height / this.imageRow;
        const canCenterX = this.ctx.canvas.width / 2 - eachWidth / 2;
        const canCenterY = this.ctx.canvas.height / 2 - eachHeight / 2;

        const downWardStand = () => {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.index++;
                if (this.index >= this.dnWardStart) {
                    this.index = this.dnStandStart;
                }

                this.ctx.clearRect(
                    canCenterX, canCenterY,
                    eachWidth, eachHeight
                );
                this.ctx.drawImage(
                    this.image,
                    this.index * eachWidth, this.downCol,
                    eachHeight, eachHeight,
                    canCenterX, canCenterY,
                    eachHeight, eachHeight
                );
                downWardStand();
            }, 300)
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
    hero.downWard();
}