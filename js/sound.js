let isSoundOn = localStorage.getItem("isSoundOn") === "true" ? true : false;

let backgroundMusic = new Audio('./sounds/background.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.1;

let chickenSound = new Audio('./sounds/chicken-background.mp3');
chickenSound.loop = true;
chickenSound.volume = 0.1;

let gameWonSound = new Audio('./sounds/gamewon.mp3');
let gameOverSound = new Audio('./sounds/gameover.mp3');

/**
 * Toggles the sound on or off by updating the `isSoundOn` variable.
 * It updates the localStorage to persist the sound state and plays or pauses 
 * background sounds accordingly.
 */
function toggleSound() {
    isSoundOn = !isSoundOn;
    localStorage.setItem("isSoundOn", isSoundOn);

    if (isSoundOn) {
        unmuteSound();
    } else {
        muteSound();
    }

    setPlaySoundForAllMovableObjects();
}

/**
 * Unmutes the sound by playing the background music and chicken sound.
 * It also updates the mute button image to indicate the sound is on.
 */
function unmuteSound() {
    backgroundMusic.play();
    chickenSound.play();
    document.querySelector('.mute').src = "./img/11_buttons/unmute.png";
}

/**
 * Mutes the sound by pausing the background music and chicken sound.
 * It also updates the mute button image to indicate the sound is off.
 */
function muteSound() {
    backgroundMusic.pause();""
    chickenSound.pause();
    document.querySelector('.mute').src = "./img/11_buttons/mute.png";
}

/**
 * Sets the play sound state for all movable objects in the game.
 * It updates the `playSounds` property of each movable object based on the 
 * current sound state (`isSoundOn`).
 * 
 * @param {boolean} isSoundOn - The current state of the sound (true if sound is on, false if muted).
 */
function setPlaySoundForAllMovableObjects() {
    if (!world) return;

    let allMovableObjects = getAllMovableObjects();

    allMovableObjects.forEach(obj => {
        if (obj instanceof MovableObject) {
            obj.playSounds = isSoundOn;
        }
    });
}

/**
 * Handles the sound settings based on the `isSoundOn` state.
 * If the sound is on, it plays the background music; otherwise, it updates the mute button image.
 */
function handleSound() {
    if (isSoundOn) {
        playBackgroundMusic();
    } else {
        imageMuteSound();
    }
}

/**
 * Updates the mute button image to indicate that the sound is muted.
 */
function imageMuteSound() {
    document.querySelector('.mute').src = "./img/11_buttons/mute.png";
}

/**
 * Pauses all active game sounds if the sound is enabled.
 * This includes background music and chicken sound effects.
 */
function pauseSounds() {
    if (isSoundOn) {
        backgroundMusic.pause();
        chickenSound.pause();
    }
}

/**
 * Resumes all previously active game sounds if the sound is enabled.
 * This includes background music and chicken sound effects.
 */
function resumeSounds() {
    if (isSoundOn) {
        backgroundMusic.play();
        chickenSound.play();
    }
}

