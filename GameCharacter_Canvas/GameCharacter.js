class Character {
    constructor(hero) {
        this.ctx = document.querySelector(hero.canvasNode).getContext("2d");
        this.image = new Image();
        this.image.src = hero.imageSrc;
        this.imageCol = hero.imageCol;
        this.imageRow = hero.imageRow;
        this.index = hero.index;

        this.wardSpeed = hero.wardSpeed;
        this.standSpeed = hero.standSpeed;

        this.standStart = hero.standStart;
        this.wardStart = hero.wardStart;
        this.wardEnd = hero.wardEnd;

        this.timer = null;
    }

    forWard(actionRow) {
        this.index = this.wardStart;
        const eachWidth = this.image.width / this.imageCol;
        const eachHeight = this.image.height / this.imageRow;
        const canCenterX = this.ctx.canvas.width / 2 - eachWidth / 2;
        const canCenterY = this.ctx.canvas.height / 2 - eachHeight / 2;

        const forWard = () => {
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
                    eachWidth * this.index, eachHeight * actionRow,
                    eachHeight, eachHeight,
                    canCenterX, canCenterY,
                    eachHeight, eachHeight
                );
                forWard();
            }, this.wardSpeed)
        };
        forWard()
    }

    stand(actionRow) {
        this.index = this.standStart;
        const eachWidth = this.image.width / this.imageCol;
        const eachHeight = this.image.height / this.imageRow;
        const canCenterX = this.ctx.canvas.width / 2 - eachWidth / 2;
        const canCenterY = this.ctx.canvas.height / 2 - eachHeight / 2;

        const stand = () => {
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
                    eachWidth * this.index, eachHeight * actionRow,
                    eachHeight, eachHeight,
                    canCenterX, canCenterY,
                    eachHeight, eachHeight
                );
                stand();
            }, this.standSpeed)
        };
        stand()
    }
};

const hero = new Character({
    canvasNode: "canvas",
    imageSrc: "css_sprites.png",
    index: 4,
    imageCol: 12,
    imageRow: 4,

    wardSpeed: 100,
    standSpeed: 300,

    standStart: 0,
    wardStart: 4,
    wardEnd: 12
})
window.onload = () => {
    hero.stand(2);
}