let canvas;
let world;
let keyboard = new Keyboard();
let isPaused = false;
let intervalIds = [];

/**
 * Initializes the game by setting up the screen, canvas, sounds, and world.
 * Also sets up the pause animation.
 */
function init() {
    hideIntroScreen();
    showGameScreen();
    setupCanvasDisplay();
    handleSound();
    manageWorld();
    pauseAnimationSetup();
}

/**
 * Hides the introductory screen when the game is started.
 */
function hideIntroScreen() {
    document.getElementById('intro').style.display = 'none';
}

/**
 * Displays the game screen by setting its display property to 'flex'.
 */
function showGameScreen() {
    document.getElementById('gameScreen').style.display = 'flex';
}

/**
 * Sets up the canvas display by making the canvas element visible and ensuring it is properly set up.
 */
function setupCanvasDisplay() {
    canvas = document.getElementById('canvas');
    canvas.style.display = 'block';
}

/**
 * Plays the background music and chicken sound when the game is unmuted.
 */
function playBackgroundMusic() {
    backgroundMusic.play();
    chickenSound.play();
    document.querySelector('.mute').src = "./img/11_buttons/unmute.png";
}

/**
 * Initializes or restarts the world. If the world is already initialized, it restarts the game.
 */
function manageWorld() {
    if (!world) {
        world = new World(canvas, keyboard);
    } else {
        restartGame();
    }
}

/**
 * Displays the game won screen and pauses the game.
 * Plays the game won sound if the sound is enabled.
 */
function gameWon () {
    exitFullscreen();
    document.getElementById('gamewonOptions').style.display ='flex';
    pauseGame();

    if (isSoundOn) {
        gameWonSound.play();
    }
}

/**
 * Displays the game over screen and pauses the game.
 * Plays the game over sound if the sound is enabled.
 */
function gameOver() {
    exitFullscreen();
    document.getElementById('gameoverOverlay').style.display = 'block';
    document.getElementById('gameoverOptions').style.display = 'flex';
    
    if (isSoundOn) {
        gameOverSound.play();
    }
}

/**
 * Resets the game to the main menu, hiding the game screen and displaying the intro screen.
 */
function backToMenu() {
    document.getElementById('intro').style.display = 'block';
    document.getElementById('gameScreen').style.display = 'none'
    document.getElementById('gamewonOptions').style.display ='none';
    canvas = document.getElementById('canvas');
    canvas.style.display = 'none'
    world.endboss.isGameWon = false;
}

/**
 * Adjusts the position of the control buttons based on whether the game is in fullscreen mode.
 * It centers the controls vertically when in fullscreen mode.
 */
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

/**
 * Adjusts the position of the mobile control buttons based on whether the game is in fullscreen mode.
 * It vertically centers the controls when in fullscreen mode.
 */
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

/**
 * Event listener that handles fullscreen change.
 * Adjusts control button positions accordingly when entering or exiting fullscreen.
 */
document.addEventListener("fullscreenchange", () => {
    let gameScreen = document.getElementById("gameScreen");

    if (!document.fullscreenElement) {
        gameScreen.classList.remove("fullscreen-active");
        adjustControlsPosition();
        adjustMobileControlsPosition();
    }
});

/**
 * Event listener that handles keydown events to update the keyboard state.
 * This tracks when keys are pressed for movement and actions.
 * 
 * @param {KeyboardEvent} event - The keydown event object.
 */
document.addEventListener('keydown', (event) => {
    if (event.keyCode == 87) {
        keyboard.SPACE = true;
    }
    
    if (event.keyCode == 68) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 65) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 38) {
        keyboard.SPACE = true;
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

/**
 * Event listener that handles keyup events to update the keyboard state when keys are released.
 * 
 * @param {KeyboardEvent} event - The keyup event object.
 */
document.addEventListener('keyup', (event) => {
    if (event.keyCode == 87) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 65) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 38) {
        keyboard.SPACE = false;
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