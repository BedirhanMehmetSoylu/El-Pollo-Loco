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

    /**
     * Creates an instance of ThrowableObject.
     * @param {number} x - The initial x-coordinate of the bottle.
     * @param {number} y - The initial y-coordinate of the bottle.
     * @param {boolean} otherDirection - Whether the bottle is thrown to the left.
     */
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

    /**
     * Handles the animation of the bottle.
     * If the bottle is above a certain height, it plays the rotation animation.
     * Otherwise, it switches to the splash animation.
     */
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

    /**
     * Initiates the throw by setting the vertical speed and applying gravity.
     * Also determines the direction of the throw.
     */
    throw() {
        if (!this.isThrowing) return;

        this.speedY = 25;
        this.applyGravity();
        this.setThrowDirection();
    }

    /**
     * Determines the throw direction and moves the bottle accordingly.
     */
    setThrowDirection() {
        const moveDistance = 12;
        const intervalTime = 25;

        if (this.otherDirection) {
            this.x -= 100;
            this.startMovement(-moveDistance, intervalTime);
        } else {
            this.startMovement(moveDistance, intervalTime);
        }
    }

    /**
     * Moves the bottle in the specified horizontal direction at a fixed interval.
     * @param {number} distance - The horizontal distance to move per interval.
     * @param {number} interval - The interval time in milliseconds.
     */
    startMovement(distance, interval) {
        setInterval(() => {
            this.x += distance;
        }, interval);
    }

    /**
     * Plays the bottle splash sound effect when the bottle lands.
     */
    playSplashSound() {
        if (this.playSounds) {
            this.SOUND_SPLASH.currentTime = 0.5;
            this.SOUND_SPLASH.play();
        }
    }
}