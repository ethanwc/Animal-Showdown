class Squirrel extends Animal {
    //spritesheet is (3 by 4 per position) 4 by 3 - 12 different assets, each with 4 states
    constructor(x, y) {
        super(x, y, "squirrel");
        this.spritesheet = AM.getAsset("./img/squirrel.png");
        this.w = 48;
        this.h = 48;
        this.attackSpeed = 1;
        this.scale = 4;
        this.color = "orange";
        this.defineAnimations();
        this.animation = this.left;
    }

    update() {
        super.update();
    }

    draw(ctx) {
        if (this.isAlive) {
            this.animation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y, this.scale);
            if (this.target !== undefined) {
                ctx.strokeStyle = this.color;
                ctx.beginPath();
                ctx.lineWidth = 12;
                let x1 = this.x + this.w/2 * this.scale;
                let y1 = this.y + this.h/2 * this.scale
                ctx.moveTo(x1, y1);
                let x2 = this.target.x + this.target.w/2 * this.target.scale;
                let y2 = this.target.y + this.target.h/2 * this.target.scale;
                ctx.lineTo(x2,y2);
                ctx.stroke();
            }
        }
    }

    defineAnimations() {
        //generate two random numbers (0-1) and (0-3) to pick the cat's sub sprite sheet image
        let r = Math.floor(Math.random() * 4);
        let c = Math.floor(Math.random());
        let xoff = r * this.w * 3;
        let yoff = c * this.h * 4;

        this.forward = new Animation(this.spritesheet, xoff, yoff, this.w, this.h, 3, .22, 3, true, false);
        this.left = new Animation(this.spritesheet, xoff, yoff + this.h, this.w, this.h, 3, .22, 3, true, false);
        this.right = new Animation(this.spritesheet, xoff, yoff + this.h * 2, this.w, this.h, 3, .22, 3, true, false);
        this.backwards = new Animation(this.spritesheet, xoff, yoff + this.h * 3, this.w, this.h, 3, .22, 3, true, false);
    }

}