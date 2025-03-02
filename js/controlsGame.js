/**
 * Sets up the animation pause for all movable objects with a slight delay.
 * This function ensures that animations are paused after the pause state is set.
 */
function pauseAnimationSetup() {
    setTimeout(() => {
        setPauseAnimationForAllMovableObjects();
        setPlaySoundForAllMovableObjects();
    }, 100);
}

/**
 * Pauses the animation for all movable objects in the world.
 * This function is responsible for pausing the animation of all objects that can move in the world.
 */
function setPauseAnimationForAllMovableObjects() {
    if (!world) return;

    let allMovableObjects = getAllMovableObjects();
    allMovableObjects.forEach(resumeAnimationForMovableObject);
}

/**
 * Retrieves all movable objects from the world.
 * This includes characters, enemies, coins, bottles, throwable objects, and clouds.
 *
 * @returns {Array} An array of all movable objects in the world.
 */
function getAllMovableObjects() {
    return [
        world.character,
        world.endboss,
        ...(world.level?.enemies || []),
        ...(world.level?.coins || []),
        ...(world.level?.bottles || []),
        ...(world.throwableObjects || []),
        ...(world.level?.clouds || [])
    ];
}

/**
 * Toggles the pause state of the game.
 * If the game is paused, it will resume; if the game is running, it will pause.
 */
function togglePause() {
    if (isPaused) {
        resumeGame();
    } else {
        pauseGame();
    }
}

/**
 * Pauses the game by setting the pause state to true, pausing all movable objects and sounds.
 * Also updates the pause button to show the play icon.
 */
function pauseGame() {
    if (!world) return;

    isPaused = true;
    pauseMovableObjects();
    pauseSounds();
    updatePauseButton();
}

/**
 * Pauses the animation for all movable objects in the game.
 * This ensures that all objects stop moving when the game is paused.
 */
function pauseMovableObjects() {
    let allMovableObjects = getAllMovableObjects();
    allMovableObjects.forEach(pauseAnimationForMovableObject);
}

/**
 * Pauses the animation of a specific movable object.
 * 
 * @param {MovableObject} obj - The object whose animation needs to be paused.
 */
function pauseAnimationForMovableObject(obj) {
    if (obj instanceof MovableObject) {
        obj.pauseAnimation = true;
    }
}

/**
 * Updates the pause button to reflect the game's paused state.
 * Changes the button icon to the play icon and sets its click event to resume the game.
 */
function updatePauseButton() {
    let pauseButton = document.querySelector('.pause');
    if (pauseButton) {
        pauseButton.src = "./img/11_buttons/play.png";
        pauseButton.setAttribute("onclick", "resumeGame()");
    }
}

/**
 * Resumes the game by setting the pause state to false, resuming movable object animations, and playing sounds.
 * Also updates the pause button to reflect the resumed state.
 */
function resumeGame() {
    if (!world) return;

    isPaused = false;
    resumeMovableObjects();
    resumeSounds();
    updateResumeButton();
}

/**
 * Resumes the animation for all movable objects in the game.
 * This ensures that all objects resume moving when the game is unpaused.
 */
function resumeMovableObjects() {
    let allMovableObjects = getAllMovableObjects();
    allMovableObjects.forEach(resumeAnimationForMovableObject);
}

/**
 * Resumes the animation of a specific movable object.
 * 
 * @param {MovableObject} obj - The object whose animation needs to be resumed.
 */
function resumeAnimationForMovableObject(obj) {
    if (obj instanceof MovableObject) {
        obj.pauseAnimation = false;
    }
}

/**
 * Updates the pause button to reflect the game's resumed state.
 * Changes the button icon to the pause icon and sets its click event to pause the game.
 */
function updateResumeButton() {
    let pauseButton = document.querySelector('.pause');
    if (pauseButton) {
        pauseButton.src = "./img/11_buttons/pause.png";
        pauseButton.setAttribute("onclick", "pauseGame()");
    }
}

/**
 * Opens the control view to show the keyboard controls while pausing the game.
 */
function openControlsView() {
    document.getElementById('keyboardControls').style.display = 'flex';
    pauseGame();
}

/**
 * Closes the control view and resumes the game.
 */
function closeControlsView() {
    document.getElementById('keyboardControls').style.display = 'none';
    resumeGame();
}

/**
 * Restarts the game by resetting the world and loading a new level.
 * It sets up all the game objects (e.g., enemies, coins, background objects) and starts the game again.
 */
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
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken()
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
    document.getElementById('gamewonOverlay').style.display = 'none';
    document.getElementById('gamewonOptions').style.display = 'none';
    document.getElementById('gameoverOverlay').style.display = 'none';
    document.getElementById('gameoverOptions').style.display = 'none';
    document.getElementById('mobileButtons').removeAttribute('style');
    resumeGame();
    setPlaySoundForAllMovableObjects();
}

/**
 * Toggles fullscreen mode for the game screen. 
 * If the game is not in fullscreen, it will request fullscreen; otherwise, it will exit fullscreen.
 */
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

/**
 * Exits fullscreen mode if the game is currently in fullscreen.
 */
function exitFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

/**
 * Handles the start of a touch event and sets the corresponding keyboard key to `true`.
 * Prevents default behavior to eliminate delay and avoid triggering the context menu.
 *
 * @param {TouchEvent} event - The touch event object.
 * @param {string} key - The key in the `keyboard` object to be set to `true`.
 */
function startTouch(event, key) {
    event.preventDefault(); // Verhindert Verzögerung und Kontextmenü
    keyboard[key] = true;
}

/**
 * Handles the end of a touch event and sets the corresponding keyboard key to `false`.
 * Prevents default behavior to ensure smooth interaction.
 *
 * @param {TouchEvent} event - The touch event object.
 * @param {string} key - The key in the `keyboard` object to be set to `false`.
 */
function endTouch(event, key) {
    event.preventDefault();
    keyboard[key] = false;
}