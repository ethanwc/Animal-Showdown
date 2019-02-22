let AM = new AssetManager();
let gameEngine = undefined;

AM.downloadAll(function () {
    let canvas = document.getElementById("gameWorld");
    let ctx = canvas.getContext("2d");


    document.getElementById("gameWorld").width = width;
    // noinspection JSSuspiciousNameCombination
    document.getElementById("gameWorld").height = width;

    gameEngine = new GameEngine();

    let assets = [];

    gameEngine.init(ctx);
    gameEngine.start();

    for (let i = 0; i < assets.length; i++) {
        gameEngine.addEntity(assets[i]);
    }
    gameEngine.addEntity(new Cat());
});
