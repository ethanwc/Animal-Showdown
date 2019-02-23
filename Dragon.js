class Dragon extends Animal {
    //spritesheet is (3 by 4 per position) 4 by 3 - 12 different assets, each with 4 states
    constructor(x, y) {
        super(x, y);
        this.spritesheet = AM.getAsset("./img/dragon.png");
        this.w = 144;
        this.h = 96;
        this.defineAnimations();
        this.animation = this.forward;
    }

    update() {
        this.y += this.speed * gameEngine.clockTick;
    }

    draw(ctx) {
        this.animation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y, 1);
    }

    defineAnimations() {
        //start x and y offset
        //generate two random numbers (0-1) and (0-3) to pick the cat's spritesheet

        let r = Math.floor(Math.random() * 4);
        let c = Math.floor(Math.random() * 1);

        let yoff = c * this.h * 4;
        yoff = 0;

        this.forward = new Animation(this.spritesheet, 0, yoff, this.w, this.h, 3, .22, 3, true, false);
    }

}