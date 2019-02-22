class Cat {
    constructor() {
        this.animation = new Animation(AM.getAsset("./img/cat.png"), 0, 0, 48, 42, 3, .1, 1, true, false);
        this.x = 200;
        this.y = 200;
    }

    update() {

    }

    draw(ctx) {
        this.animation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y, 1);
    }
}