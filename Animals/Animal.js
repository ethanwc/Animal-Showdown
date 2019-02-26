class Animal {
    constructor(x, y, type) {
        this.type = type;
        // this.color = "#"+((1<<24)*Math.random()|0).toString(16);
        this.health = 100 + Math.ceil(Math.random() * 50);
        this.mana = 100;
        this.isAlive = true;
        this.x = x;
        this.y = y;
        this.speed = 200;
        this.maxRange = 200;
        this.removeFromWorld = false;
        this.animation = undefined;
        this.forward = undefined;
        this.backwards = undefined;
        this.left = undefined;
        this.right = undefined;
        this.target = undefined;
        this.lastAttack = 0;
        this.attackTime = .25;
    }


    update() {
        if (this.health < 0 && this.isAlive) {
            this.isAlive = false;
            this.removeFromWorld = true;
        }

        if (this.checkVictory()) gameOver = true;

        if (this.target !== undefined && this.target.isAlive) {
            this.attack();
            // console.log(this, " is attacking " , this.target);
        }
        else {
            this.pickTarget()
        }
    }

    /*
    Pick the nearest animal, that isn't the same species.
     */
    pickTarget() {
        if (this.isAlive) {
            let animal = this.getAnimal();
            while (!(animal instanceof Animal))
                animal = this.getAnimal();
            this.target = animal;
        }
    }

    attack() {
        if (gameEngine.timer.gameTime - this.lastAttack > this.attackTime) {
            if (this.target !== undefined && this.isAlive) {

                if (Distance(this.x, this.y, this.target.x, this.target.y) > this.maxRange) {
                    let horizontal = this.x - this.target.x;
                    let vertical = this.y - this.target.y;

                    let horDif = Math.abs(horizontal);
                    let verDif = Math.abs(vertical);

                    //if farther to the right, move left
                    if (horDif > 20) {
                        if (horizontal > 0) this.x -= this.speed * gameEngine.clockTick;
                        if (horizontal < 0) this.x += this.speed * gameEngine.clockTick;
                    }

                    //if too far down, move back up
                    if (verDif > 20) {
                        if (vertical > 0) this.y -= this.speed * gameEngine.clockTick;
                        if (vertical < 0) this.y += this.speed * gameEngine.clockTick;
                    }

                    if (horDif > verDif) this.animation = (this.target.x < this.x) ? this.left : this.right;
                    else this.animation = (this.target.y < this.y) ? this.backwards : this.forward;

                }
                //fighting and close enough
                else {
                    if (this.target.type === this.type && gameEngine.entities.length < animalcap) {
                        let x = Math.ceil((Math.random()) * 1000);
                        let y = Math.ceil((Math.random()) * 1000);

                        if (this.type === "cat") gameEngine.addEntity(new Cat(x, y));
                        if (this.type === "chicken") gameEngine.addEntity(new Chicken(x, y));
                        if (this.type === "dragon") gameEngine.addEntity(new Dragon(x, y));
                        if (this.type === "owl") gameEngine.addEntity(new Owl(x, y));
                        if (this.type === "squirrel") gameEngine.addEntity(new Squirrel(x, y));
                        if (this.type === "tiger") gameEngine.addEntity(new Tiger(x, y));
                        this.pickTarget();
                    }
                    else this.target.health -= 50;
                }
            }
            this.lastAttack = gameEngine.timer.gameTime;
        }
    }

    checkVictory() {
        let types = [];
        for (let i = 0; i < gameEngine.entities.length; i++) {
            if (gameEngine.entities[i] instanceof Animal) {
                let animal = gameEngine.entities[i];
                if (!types.includes(animal.type) && animal.isAlive)
                    types.push(animal.type);
            }
        }
        if (types.length < 2) {
            console.log(types[0] + "s Win!");
            gameOver = true;
            return true;
        }
        else return false;
    }

    getAnimal() {
        let length = gameEngine.entities.length;
        let rn = Math.floor(Math.random() * length);
        return gameEngine.entities[rn];
    }
}