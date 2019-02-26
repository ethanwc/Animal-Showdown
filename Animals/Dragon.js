class Dragon extends Animal {

    constructor(x, y) {
        super(x, y, "dragon");
        this.spritesheet = AM.getAsset("./img/dragon.png");
        this.w = 144;
        this.h = 96;
        this.scale = 1;
        this.color = "green";
        this.attackSpeed = 1;
        this.defineAnimations();
        this.animation = this.forward;
    }

    update() {
        super.update();
    }

    draw(ctx) {
            this.animation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y, this.scale);
        if (this.target !== undefined && !gameOver) {
                ctx.strokeStyle = this.color;
                ctx.beginPath();
                ctx.lineWidth = 2;
                let x1 = this.x + this.w/2 * this.scale;
                let y1 = this.y + this.h/2 * this.scale;
                ctx.moveTo(x1, y1);
                let x2 = this.target.x + this.target.w/2 * this.target.scale;
                let y2 = this.target.y + this.target.h/2 * this.target.scale;
                ctx.lineTo(x2,y2);
                ctx.stroke();
        }
    }

    defineAnimations() {
        this.forward = new Animation(this.spritesheet, 0, 0, this.w, this.h, 3, .22, 3, true, false);
        this.left = new Animation(this.spritesheet, 0, this.h, this.w, this.h, 3, .22, 3, true, false);
        this.right = new Animation(this.spritesheet, 0, this.h * 2, this.w, this.h, 3, .22, 3, true, false);
        this.backwards = new Animation(this.spritesheet, 0, this.h * 3, this.w, this.h, 3, .22, 3, true, false);
    }
}