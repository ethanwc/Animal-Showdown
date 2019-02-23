class Animal {
    constructor(x, y, type) {
        this.type = type;
        // this.color = "#"+((1<<24)*Math.random()|0).toString(16);
        this.health = 100 + Math.ceil(Math.random() * 50);
        this.mana = 100;
        this.isAlive = true;
        this.x = x;
        this.y = y;
        this.speed = 100;
        this.removeFromWorld = false;
        this.forward = undefined;
        this.backwards = undefined;
        this.left = undefined;
        this.right = undefined;
        this.target = undefined;
        this.lastAttack = 0;
        this.attackTime = .05;
    }


    update() {
        if (this.health < 0 && this.isAlive) {
            this.isAlive = false;
        }

        if (!gameOver && this.checkVictory()) {
            gameOver = true;
            console.log("Game Over");
        }

        else if (this.target === undefined || !this.target.isAlive) {
            this.pickTarget();
            // console.log(this, " is attacking " , this.target);
        }
        else {
            this.attack();
        }
    }

    /*
    Pick the nearest animal, that isn't the same species.
     */
    pickTarget() {
        let target = undefined;
        let nearest = undefined;
        let distance = 1000000000;

        for (let i = 0; i < gameEngine.entities.length; i++) {
            if (gameEngine.entities[i] instanceof Animal) {
                let animal = gameEngine.entities[i];
                if (this.type !== animal.type && animal.isAlive) {
                    let tempDistance = Distance(this.x, this.y, animal.x, animal.y);
                    if (tempDistance < distance) {
                        distance = tempDistance;
                        target = animal;
                    }
                }
            }
        }
        this.target = target;
        // console.log(this.type, " should be attacking ", this.target.type, " Distance: ", Distance(this.x, this.y, this.target.x, this.target.y));
        this.attack();
    }

    attack() {
        if (gameEngine.timer.gameTime - this.lastAttack > this.attackTime) {
        if (this.target !== undefined && this.isAlive)
        this.target.health -= 1;
        this.lastAttack = gameEngine.timer.gameTime;
        }
        // console.log(this.type, " did ", 1, " damage to ", this.target.type);
    }

    checkVictory() {
        let a = [];
        for (let i = 0; i < gameEngine.entities.length; i++) {
            if (gameEngine.entities[i] instanceof Animal) {
                let animal = gameEngine.entities[i];
                if (!a.includes(animal.type) && animal.isAlive) a.push(animal.type);
            }
        }

        if (a.length < 2) {
            console.log(a[0]+ "s Win!");
            return true;
        }

        else return false;
    }
}