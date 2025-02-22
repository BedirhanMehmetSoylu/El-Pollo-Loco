let isSoundOn = true;

let backgroundMusic = new Audio('./sounds/background.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.025;

let chickenSound = new Audio('./sounds/chicken-noises-223056.mp3');
chickenSound.loop = true;
chickenSound.volume = 0.1;

function toggleSound() {
    isSoundOn = !isSoundOn;

    if (isSoundOn) {
        backgroundMusic.play();
        chickenSound.play();

        document.querySelector('.mute').src = "./img/11_buttons/unmute.png";
    } else {
        backgroundMusic.pause();
        chickenSound.pause();

        document.querySelector('.mute').src = "./img/11_buttons/mute.png";
    }
}
