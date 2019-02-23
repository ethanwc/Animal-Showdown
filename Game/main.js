let AM = new AssetManager();
AM.queueDownload("./img/cat.png");
AM.queueDownload("./img/tiger.png");
AM.queueDownload("./img/chicken.png");
AM.queueDownload("./img/squirrel.png");
AM.queueDownload("./img/owl.png");
AM.queueDownload("./img/dragon.png");
AM.queueDownload("./img/squirrel.png");


let gameOver = false;
let gameEngine = undefined;

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


    for (let i = 0; i < 4; i++) {
        let x = Math.ceil((Math.random()) * 1000);
        let y = Math.ceil((Math.random()) * 1000);
        gameEngine.addEntity(new Cat(x, y));

        x = Math.ceil((Math.random()) * 1000);
        y = Math.ceil((Math.random()) * 1000);
        gameEngine.addEntity(new Tiger(x, y));

        x = Math.ceil((Math.random()) * 1000);
        y = Math.ceil((Math.random()) * 1000);
        gameEngine.addEntity(new Squirrel(x, y));

        x = Math.ceil((Math.random()) * 1000);
        y = Math.ceil((Math.random()) * 1000);
        gameEngine.addEntity(new Owl(x, y));

        x = Math.ceil((Math.random()) * 1000);
        y = Math.ceil((Math.random()) * 1000);
        gameEngine.addEntity(new Chicken(x, y));

        x = Math.ceil((Math.random()) * 1000);
        y = Math.ceil((Math.random()) * 1000);
        gameEngine.addEntity(new Dragon(x, y));
    }

    gameEngine.start();

});