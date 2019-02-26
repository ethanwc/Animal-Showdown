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

    for (let i = 0; i < 10; i++) {
        let x = Math.ceil((Math.random()) * r);
        let y = Math.ceil((Math.random()) * r);
        gameEngine.addEntity(new Cat(x, y));

        x = Math.ceil((Math.random()) * r);
        y = Math.ceil((Math.random()) * r);
        gameEngine.addEntity(new Tiger(x, y));

        x = Math.ceil((Math.random()) * r);
        y = Math.ceil((Math.random()) * r);
        gameEngine.addEntity(new Squirrel(x, y));

        x = Math.ceil((Math.random()) * r);
        y = Math.ceil((Math.random()) * r);
        gameEngine.addEntity(new Owl(x, y));

        x = Math.ceil((Math.random()) * r);
        y = Math.ceil((Math.random()) * r);
        gameEngine.addEntity(new Chicken(x, y));

        x = Math.ceil((Math.random()) * r);
        y = Math.ceil((Math.random()) * r);
        gameEngine.addEntity(new Dragon(x, y));
    }
    gameEngine.start();
});