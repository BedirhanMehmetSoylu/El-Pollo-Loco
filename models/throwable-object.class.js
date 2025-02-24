class ThrowableObject extends MovableObject {
    IMAGES_ROTATION = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    SOUND_SPLASH = new Audio('./sounds/bottle-splash.mp3');

    isThrowing = true;

    constructor(x, y, otherDirection) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.otherDirection = otherDirection;
        this.playSounds = isSoundOn;
        this.throw();
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.y <= 150) {
                this.playAnimation(this.IMAGES_ROTATION);   
                this.playSplashSound();
            } else {
                this.playAnimation(this.IMAGES_SPLASH);
                this.isThrowing = false;  
            }
        }, 100);
    }

    throw() {
        if (this.isThrowing) {
            this.speedY = 25;
            this.applyGravity();
            if (this.otherDirection) {
                this.x -= 100;
                setInterval(() => {
                    this.x -= 12;
                }, 25);
            } else {
                setInterval(() => {
                    this.x += 12;
                }, 25);
            }    
        }
    }

    playSplashSound() {
        if (this.playSounds) {
            this.SOUND_SPLASH.currentTime = 0.5;
            this.SOUND_SPLASH.play();
        }
    }
}