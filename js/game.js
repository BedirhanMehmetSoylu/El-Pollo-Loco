let canvas;
let world;
let keyboard = new Keyboard();
let isPaused = false;
let intervalIds = [];

function init() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block'
    canvas = document.getElementById('canvas');
    canvas.style.display = 'block';
    world = new World(canvas, keyboard);

    setTimeout(() => {
        setPauseAnimationForAllMovableObjects();
    }, 100);
}

function setPauseAnimationForAllMovableObjects() {
    if (!world) return;

    let allMovableObjects = [
        world.character,
        world.endboss,
        ...(world.level?.enemies || []),
        ...(world.level?.coins || []),
        ...(world.level?.bottles || []),
        ...(world.level?.clouds || [])
    ];

    allMovableObjects.forEach(obj => {
        if (obj instanceof MovableObject) {
            obj.pauseAnimation = false;
        }
    });
}

function togglePause() {
    if (isPaused) {
        resumeGame();
    } else {
        pauseGame();
    }
}

function pauseGame() {
    if (!world) return;
    
    isPaused = true;
    
    let allMovableObjects = [
        world.character,
        world.endboss,
        ...(world.level?.enemies || []),
        ...(world.level?.coins || []),
        ...(world.level?.bottles || []),
        ...(world.level?.clouds || [])
    ];
    
    allMovableObjects.forEach(obj => {
        if (obj instanceof MovableObject) {
            obj.pauseAnimation = true;
        }
    });

    let pauseButton = document.querySelector('.pause');
    if (pauseButton) {
        pauseButton.src = "./img/11_buttons/play.png";
        pauseButton.setAttribute("onclick", "resumeGame()");
    }
}

function resumeGame() {
    if (!world) return;

    isPaused = false;

    let allMovableObjects = [
        world.character,
        world.endboss,
        ...(world.level?.enemies || []),
        ...(world.level?.coins || []),
        ...(world.level?.bottles || []),
        ...(world.level?.clouds || [])
    ];

    allMovableObjects.forEach(obj => {
        if (obj instanceof MovableObject) {
            obj.pauseAnimation = false;
        }
    });

    let pauseButton = document.querySelector('.pause');
    if (pauseButton) {
        pauseButton.src = "./img/11_buttons/pause.png";
        pauseButton.setAttribute("onclick", "pauseGame()");
    }
}

function gameOver() {
    document.getElementById('gameoverOverlay').style.display = 'block';
    document.getElementById('gameoverOptions').style.display = 'flex';
}

function restartGame() {
    // world.character.lost = false;

    document.getElementById('gameoverOverlay').style.display = 'none';
    document.getElementById('gameoverOptions').style.display = 'none';

    let canvas = document.getElementById('canvas');
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    const level1 = new Level();
    world = new World(canvas, keyboard);
    setTimeout(() => {
        setPauseAnimationForAllMovableObjects();
    }, 100);
}

document.addEventListener('keydown', (event) => {    
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 69) {
        keyboard.E = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 69) {
        keyboard.E = false;
    }
});