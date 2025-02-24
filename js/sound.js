let isSoundOn = localStorage.getItem("isSoundOn") === "true" ? true : false;

let backgroundMusic = new Audio('./sounds/background.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.025;

let chickenSound = new Audio('./sounds/chicken-background.mp3');
chickenSound.loop = true;
chickenSound.volume = 0.1;

let gameWonSound = new Audio('./sounds/gamewon.mp3');
let gameOverSound = new Audio('./sounds/gameover.mp3');

function toggleSound() {
    isSoundOn = !isSoundOn;

    localStorage.setItem("isSoundOn", isSoundOn);

    if (isSoundOn) {
        backgroundMusic.play();
        chickenSound.play();

        document.querySelector('.mute').src = "./img/11_buttons/unmute.png";
    } else {
        backgroundMusic.pause();""
        chickenSound.pause();

        document.querySelector('.mute').src = "./img/11_buttons/mute.png";
    }

    setPlaySoundForAllMovableObjects();
}

function setPlaySoundForAllMovableObjects() {
    if (!world) return;

    let allMovableObjects = [
        world.character,
        world.endboss,
        ...(world.level?.enemies || []),
        ...(world.level?.coins || []),
        ...(world.level?.bottles || []),
        ...(world.level?.throwableObjects || []),
        ...(world.level?.clouds || [])
    ];

    allMovableObjects.forEach(obj => {
        if (obj instanceof MovableObject) {
            obj.playSounds = isSoundOn;
        }
    });
}