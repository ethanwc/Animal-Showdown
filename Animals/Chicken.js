class Chicken extends Animal {
    //spritesheet is (3 by 4 per position) 4 by 3 - 12 different assets, each with 4 states
    constructor(x, y) {
        super(x, y, "chicken");
        this.spritesheet = AM.getAsset("./img/chicken.png");
        this.w = 48;
        this.h = 48;
        this.attackSpeed = 2;
        this.scale = 3;
        this.color = "red";
        this.defineAnimations();
        this.animation = this.forward;
    }

    update() {
        if (this.health < 0 && this.isAlive) {
            this.isAlive = false;
            // playChicken();
        }

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
                let y1 = this.y + this.h/2 * this.scale;
                ctx.moveTo(x1, y1);
                let x2 = this.target.x + this.target.w/2 * this.target.scale;
                let y2 = this.target.y + this.target.h/2 * this.target.scale;
                ctx.lineTo(x2,y2);
                ctx.stroke();
            }
        }
    }

    defineAnimations() {
        //start x and y offset
        //generate two random numbers (0-1) and (0-3) to pick the cat's spritesheet

        let r = Math.floor(Math.random() * 4);
        let c = Math.floor(Math.random() * 1);

        let xoff = r * this.w * 3;
        let yoff = c * this.h * 4;
        console.log(r,c);
        console.log(xoff, yoff);

        this.forward = new Animation(this.spritesheet, xoff, yoff, this.w, this.h, 3, .22, 3, true, false);
    }

}