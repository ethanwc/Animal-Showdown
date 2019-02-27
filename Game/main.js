let AM = new AssetManager();
let pause = false;
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
let debug = false;

window.onkeydown = function(e) {
    if (e.keyCode === 80) pause = !pause;
};


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
    let r = 500;

    for (let i = 0; i < assets.length; i++) {
        gameEngine.addEntity(assets[i]);
    }

    for (let i = 0; i < 5; i++) {
        let x = Math.ceil((Math.random()) * 100);
        let y = Math.ceil((Math.random()) * 100);
        x = Math.ceil((Math.random()) * 100);
        y = Math.ceil((Math.random()) * 100);
        gameEngine.addEntity(new Cat(0 + x , 0 + y));
        x = Math.ceil((Math.random()) * 100);
        y = Math.ceil((Math.random()) * 100);
        gameEngine.addEntity(new Tiger(0 + x, 1000 + y));
        x = Math.ceil((Math.random()) * 100);
        y = Math.ceil((Math.random()) * 100);
        gameEngine.addEntity(new Squirrel(500 + x, 500 + y));
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