let canvas;
let world;
let keyboard = new Keyboard();
let isPaused = false;
let intervalIds = [];

function init() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'flex';
    canvas = document.getElementById('canvas');
    canvas.style.display = 'block';

    if (isSoundOn) {
        backgroundMusic.play();
        chickenSound.play();
        document.querySelector('.mute').src = "./img/11_buttons/unmute.png";
    } else {
        document.querySelector('.mute').src = "./img/11_buttons/mute.png";
    }

    restartGame();

    setTimeout(() => {
        setPauseAnimationForAllMovableObjects();
        setPlaySoundForAllMovableObjects();
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
    console.log('2222');
    
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

    if (isSoundOn) {
        backgroundMusic.pause();
        chickenSound.pause();
    }

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

    if (isSoundOn) {
        backgroundMusic.play();
        chickenSound.play();
    }

    let pauseButton = document.querySelector('.pause');
    if (pauseButton) {
        pauseButton.src = "./img/11_buttons/pause.png";
        pauseButton.setAttribute("onclick", "pauseGame()");
    }
}


function gameWon () {
    exitFullscreen();
    document.getElementById('gamewonOptions').style.display ='flex';
    pauseGame();

    if (isSoundOn) {
        gameWonSound.play();
    }
}

function gameOver() {
    exitFullscreen();
    document.getElementById('gameoverOverlay').style.display = 'block';
    document.getElementById('gameoverOptions').style.display = 'flex';
    
    if (isSoundOn) {
        gameOverSound.play();
    }
}

function backToMenu() {
    document.getElementById('intro').style.display = 'block';
    document.getElementById('gameScreen').style.display = 'none'
    document.getElementById('gamewonOptions').style.display ='none';
    canvas = document.getElementById('canvas');
    canvas.style.display = 'none'
    world.endboss.isGameWon = false;
}

function openControlsView() {
    document.getElementById('keyboardControls').style.display = 'flex';
    pauseGame();
}

function closeControlsView() {
    document.getElementById('keyboardControls').style.display = 'none';
    resumeGame();
}

function restartGame() {
    if (world) {
        world = null;
    }

    const newLevel = new Level(
        [
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
        ],
        [
            new Cloud(),
        ],
        [
            new BackgroundObject('./img/5_background/layers/air.png', -719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('./img/5_background/layers/air.png', 0),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/air.png', 719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('./img/5_background/layers/air.png', 719*2),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719*2),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719*2),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719*2),
            new BackgroundObject('./img/5_background/layers/air.png', 719*3),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719*3),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719*3),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719*3)
        ],
        [
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins()
        ],
        [
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle()
        ]
    );


    world = new World(canvas, keyboard);
    world.level = newLevel;
    world.setWorld();
    world.run();
    document.getElementById('gameoverOverlay').style.display = 'none';
    document.getElementById('gameoverOptions').style.display = 'none';
    resumeGame();
}

function toggleFullscreen() {
    let gameScreen = document.getElementById("gameScreen");

    if (!document.fullscreenElement) {
        gameScreen.requestFullscreen().then(() => {
            gameScreen.classList.add("fullscreen-active");
            adjustControlsPosition();
            adjustMobileControlsPosition();
        });
    } else {
        document.exitFullscreen();
        gameScreen.classList.remove("fullscreen-active");
        adjustControlsPosition();
        adjustMobileControlsPosition();
    }
}

function exitFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

function adjustControlsPosition() {
    let gameScreen = document.getElementById("gameScreen");
    let canvas = document.getElementById("canvas");
    let controls = document.querySelector(".controls");

    if (document.fullscreenElement) {
        let gameScreenHeight = gameScreen.clientHeight;
        let canvasHeight = canvas.clientHeight;

        let newTop = (gameScreenHeight - canvasHeight) / 2;
        controls.style.top = `${newTop + 24}px`;
    } else {
        controls.style.top = "24px";
    }
}

function adjustMobileControlsPosition() {
    let gameScreen = document.getElementById("gameScreen");
    let canvas = document.getElementById("canvas");
    let mobileControls = document.querySelector(".mobile-controls-container");

    if (document.fullscreenElement) {
        let gameScreenHeight = gameScreen.clientHeight;
        let canvasHeight = canvas.clientHeight;

        let newBottom = (gameScreenHeight - canvasHeight) / 2;
        mobileControls.style.bottom = `${newBottom + 8}px`;
    } else {
        mobileControls.style.bottom = "8px";
    }
}

document.addEventListener("fullscreenchange", () => {
    let gameScreen = document.getElementById("gameScreen");

    if (!document.fullscreenElement) {
        gameScreen.classList.remove("fullscreen-active");
        adjustControlsPosition();
        adjustMobileControlsPosition();
    }
});

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