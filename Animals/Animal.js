class Animal {
    constructor(x, y, type) {
        this.type = type;
        // this.color = "#"+((1<<24)*Math.random()|0).toString(16);
        this.health = 100;// + Math.ceil(Math.random() * 50);
        this.mana = 100;
        this.isAlive = true;
        this.x = x;
        this.y = y;
        this.speed = 400;
        this.maxRange = 200;
        this.removeFromWorld = false;
        this.animation = undefined;
        this.forward = undefined;
        this.backwards = undefined;
        this.left = undefined;
        this.right = undefined;
        this.target = undefined;
        this.lastReproduceCooldown = 10;
        this.lastAttack = 0;
        this.attackTime = .25;
        this.lastReproduce = gameEngine.timer.gameTime;
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
        if (this.isAlive)
            this.target = this.getAnimal();
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
                        //check if reproduce cool down is over.
                        if ((gameEngine.timer.gameTime - this.lastReproduce) > this.lastReproduceCooldown) {
                            let x = this.x + Math.ceil((Math.random()) * 100);
                            let y = this.y + Math.ceil((Math.random()) * 100);

                            if (this.type === "cat") gameEngine.addEntity(new Cat(x, y));
                            if (this.type === "chicken") gameEngine.addEntity(new Chicken(x, y));
                            if (this.type === "dragon") gameEngine.addEntity(new Dragon(x, y));
                            if (this.type === "owl") gameEngine.addEntity(new Owl(x, y));
                            if (this.type === "squirrel") gameEngine.addEntity(new Squirrel(x, y));
                            if (this.type === "tiger") gameEngine.addEntity(new Tiger(x, y));

                            this.lastReproduce = gameEngine.timer.gameTime;
                            this.target.lastReproduce = gameEngine.timer.gameTime;

                            this.pickTarget();
                        }
                    }
                    else this.target.health -= 100;
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

        let dragons = [];
        let tigers = [];
        let cats = [];
        let owls = [];
        let chickens = [];
        let squirrels = [];
        let targets = [];

        let length = gameEngine.entities.length;

        for (let i = 0; i < length; i++) {
            let entity = gameEngine.entities[i];
            //if entity is an animal, and not it's self
            if (entity instanceof Animal && entity !== this) {
                if (entity instanceof Dragon) dragons.push(entity);
                if (entity instanceof Tiger) tigers.push(entity);
                if (entity instanceof Cat) cats.push(entity);
                if (entity instanceof Owl) owls.push(entity);
                if (entity instanceof Chicken) chickens.push(entity);
                if (entity instanceof Squirrel) squirrels.push(entity);
            }
        }

        //dragon's target everything
        if (this.type === "dragon") {
            targets = targets.concat(dragons);
            targets = targets.concat(tigers);
            targets = targets.concat(cats);
            targets = targets.concat(owls);
            targets = targets.concat(chickens);
            targets = targets.concat(squirrels);
        }

        if (this.type === "tiger") {
            targets = targets.concat(tigers);
            targets = targets.concat(cats);
            targets = targets.concat(owls);
            targets = targets.concat(chickens);
            targets = targets.concat(squirrels);
        }

        if (this.type === "cat") {
            targets = targets.concat(cats);
            targets = targets.concat(owls);
            targets = targets.concat(chickens);
            targets = targets.concat(squirrels);
        }

        if (this.type === "owl") {
            targets = targets.concat(owls);
            targets = targets.concat(chickens);
            targets.concat(squirrels);
        }

        if (this.type === "chicken") {
            targets = targets.concat(chickens);
            targets = targets.concat(squirrels);
        }

        if (this.type === "squirrel")
            targets = targets.concat(squirrels);

        let rn = Math.floor(Math.random() * targets.length);


        return targets[rn];
    }
}