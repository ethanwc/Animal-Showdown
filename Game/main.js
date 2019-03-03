let AM = new AssetManager();
AM.queueDownload("./img/cat.png");
AM.queueDownload("./img/tiger.png");
AM.queueDownload("./img/chicken.png");
AM.queueDownload("./img/squirrel.png");
AM.queueDownload("./img/owl.png");
AM.queueDownload("./img/dragon.png");
AM.queueDownload("./img/squirrel.png");

let animalcap = 500;
let gameOver = false;
let gameEngine = undefined;
let debug = true;
let pause = false;

function toggleDebug() {
    debug = !debug;
}

window.onload = function () {
    var socket = io.connect("http://24.16.255.56:8888");

    socket.on("load", function (data) {
        reloadGame(data);
    });

    var saveButton = document.getElementById("save");
    var loadButton = document.getElementById("load");

    saveButton.onclick = function () {
        // if (pause) {
            let info = getState();
            console.log("save");
            console.log(info);
            socket.emit("save", {
                studentname: "Ethan Cheatham",
                statename: "jlkjro3jr0932",
                data: info
            });
        // }
    };

    loadButton.onclick = function () {
        // if (pause) {
            console.log("load");
            socket.emit("load", {
                studentname: "Ethan Cheatham",
                statename: "jlkjro3jr0932"
            });
        // }
    };
};

function getState() {
    let animals = [];
    for (let i = 0; i < gameEngine.entities.length; i++) {
        let entity = gameEngine.entities[i];
        if (entity instanceof Animal && !(entity instanceof Squirrel)) {
            let animal = {
                "type": entity.type,
                "health": entity.health,
                "x": entity.x,
                "y": entity.y,
                "targetx": entity.target.x,
                "targety": entity.target.y
            };
            animals.push(animal);
            // console.log(entity);
        }
    }
    return animals;
}

function reloadGame(data) {
    //first, clear existing entities.
    gameEngine.entities = [];
    pause = true;
    for (let i = 0; i < data.data.length; i++) {
        let animal = data.data[i];
        let x = animal.x;
        let y = animal.y;
        let health = animal.health;
        let type = animal.type;

        let newEntity = undefined;

        if (type === "cat") newEntity = new Cat(x, y);
        if (type === "chicken") newEntity = new Chicken(x, y);
        if (type === "dragon") newEntity = new Dragon(x, y);
        if (type === "owl") newEntity = new Owl(x, y);
        if (type === "squirrel") newEntity = new Squirrel(x, y);
        if (type === "tiger") newEntity = new Tiger(x, y);

        newEntity.health = health;
        gameEngine.addEntity(newEntity);
    }

    setTargets(data);
    gameOver = false;
    pause = false;
}

function setTargets(data) {
    let found = 0;
    for (let i = 0; i < gameEngine.entities.length; i++) {
        for (let j = 0; j < data.data.length; j++)
        {
            let possibleTarget = gameEngine.entities[i];
            let animal = data.data[j];

            if (animal.targetx === possibleTarget.x && animal.targety === possibleTarget.y) {
                console.log("target cords: " + animal.targetx + " " + possibleTarget.x + " : " +  animal.targety + " " + possibleTarget.y);
                found++;
                animal.target = possibleTarget;
                // possibleTarget.target = animal;
                // animal.target = possibleTarget;

            }
        }

    }
    for (let i = 0; i < gameEngine.entities.length; i++) {
        console.log(gameEngine.entities[i].targety)
    }

        console.log("size: " + gameEngine.entities.length + " size: " + data.data.length + " found x: " + found);
}

AM.downloadAll(function () {


    let canvas = document.getElementById("gameWorld");
    let ctx = canvas.getContext("2d");
    let width = screen.width * .6;

    document.getElementById("gameWorld").width = width;
    // noinspection JSSuspiciousNameCombination
    document.getElementById("gameWorld").height = width;

    gameEngine = new GameEngine();

    let assets = [];

    gameEngine.init(ctx);

    for (let i = 0; i < assets.length; i++) {
        gameEngine.addEntity(assets[i]);
    }

    for (let i = 0; i < 2; i++) {
        let x = Math.ceil((Math.random()) * 100);
        let y = Math.ceil((Math.random()) * 100);
        x = Math.ceil((Math.random()) * 100);
        y = Math.ceil((Math.random()) * 100);
        gameEngine.addEntity(new Cat(0 + x, 0 + y));
        x = Math.ceil((Math.random()) * 100);
        y = Math.ceil((Math.random()) * 100);
        gameEngine.addEntity(new Tiger(0 + x, 1000 + y));
        x = Math.ceil((Math.random()) * 1000);
        y = Math.ceil((Math.random()) * 1000);
        gameEngine.addEntity(new Squirrel(x, y));
        x = Math.ceil((Math.random()) * 100);
        y = Math.ceil((Math.random()) * 100);
        gameEngine.addEntity(new Owl(1000 + x, 1000 + y));
        x = Math.ceil((Math.random()) * 100);
        y = Math.ceil((Math.random()) * 100);
        gameEngine.addEntity(new Chicken(1000 + x, 0 + y));
        x = Math.ceil((Math.random()) * 100);
        y = Math.ceil((Math.random()) * 100);
        gameEngine.addEntity(new Dragon(500 + x, 1000 + y));
    }
    gameEngine.start();
});