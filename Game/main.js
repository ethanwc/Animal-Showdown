let AM = new AssetManager();
let pause = false;
AM.queueDownload("./img/cat.png");
AM.queueDownload("./img/tiger.png");
AM.queueDownload("./img/chicken.png");
AM.queueDownload("./img/squirrel.png");
AM.queueDownload("./img/owl.png");
AM.queueDownload("./img/dragon.png");
AM.queueDownload("./img/squirrel.png");

let animalcap = 300;
let gameOver = false;
let gameEngine = undefined;

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
        gameEngine.addEntity(new Cat(0, 0));
        gameEngine.addEntity(new Tiger(0, 1000));
        gameEngine.addEntity(new Squirrel(500, 500));
        gameEngine.addEntity(new Owl(1000, 1000));
        gameEngine.addEntity(new Chicken(1000, 0));
        gameEngine.addEntity(new Dragon(500, 1000));
    }
    gameEngine.start();
});