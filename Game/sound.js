let chicken = document.createElement("audio");
chicken.src = "./sound/chicken.mp3";

let tiger = document.createElement("audio");
tiger.src = "./sound/tiger.mp3";


function playChicken() {
    let sound = chicken.cloneNode();
    sound.play();
}

function playTiger() {
    let sound = tiger.cloneNode();
    sound.play();
}