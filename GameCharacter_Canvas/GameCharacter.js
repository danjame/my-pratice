class Character {
    constructor(hero) {
        this.ctx = document.querySelector(hero.canvasNode).getContext("2d");
        this.imageSrc = hero.imageSrc;
        this.imageCol = hero.imageCol;
        this.imageRow = hero.imageRow;

        this.fwIndex = hero.fwIndex;
        this.stIndex = hero.stIndex;

        // this.fwSpeed = hero.fwSpeed;
        this.stSpeed = hero.stSpeed;

        this.stStart = hero.stStart;
        this.fwStart = hero.fwStart;
        this.fwEnd = hero.fwEnd;

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

    init() {
        this.loadImage();

        window.addEventListener("keypress", (event) => {
            if (event.keyCode === 119) {
                hero.forWard(3);
            }
        }, false)

        window.addEventListener("keyup", (event) => {
            if (event.keyCode === 87) {
                hero.stand(3);
                this.fwIndex = 4;
            }
        }, false)
    }

    forWard(actionRow) {
        clearTimeout(this.timer);
        this.fwIndex++;

        if (this.fwIndex >= this.fwEnd) {
            this.fwIndex = this.fwStart;
        }

        this.ctx.clearRect(
            this.canCenterX, this.canCenterY,
            this.eachWidth, this.eachHeight
        );
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

        const stand = () => {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.stIndex++;
                if (this.stIndex >= this.fwStart) {
                    this.stIndex = this.stStart;
                }

                this.ctx.clearRect(
                    this.canCenterX, this.canCenterY,
                    this.eachWidth, this.eachHeight
                );
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
        stand()
    }
};

const hero = new Character({
    canvasNode: "canvas",
    imageSrc: "css_sprites.png",
    stIndex: 0,
    imageCol: 12,
    imageRow: 4,

    stSpeed: 300,

    stStart: 0,
    fwStart: 4,
    fwEnd: 12,

    fwIndex: 4
})

hero.init();