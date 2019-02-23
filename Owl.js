class Owl extends Animal {
    //spritesheet is (3 by 4 per position) 4 by 3 - 12 different assets, each with 4 states
    constructor(x, y) {
        super(x, y);
        this.spritesheet = AM.getAsset("./img/owl.png");
        this.w = 77;
        this.h = 48;
        this.defineAnimations();
        this.animation = this.forward;
    }

    update() {
        this.y += this.speed * gameEngine.clockTick;
    }

    draw(ctx) {
        this.animation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y, 3);
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