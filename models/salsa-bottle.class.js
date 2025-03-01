class SalsaBottle extends MovableObject {
    width = 100;
    height = 100;
    y = 350;

    IMAGES_BOTTLE = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    SOUND_COLLECT = new Audio('./sounds/bottle-clink.mp3');

    offset = {
        top: 15,
        bottom: 10,
        left: 25,
        right: 15
    }

    /**
     * Creates a new instance of the SalsaBottle object.
     * Loads the bottle image and starts the animation.
     */
    constructor() {
        super().loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.animate();
        this.x = 260 + Math.random() * 2000;
    }

    /**
     * Starts the animation of the salsa bottle by alternating between its images.
     * Runs at a set interval and stops if `pauseAnimation` is true.
     */
    animate() {
        setInterval(() => {
            if (!this.pauseAnimation) {
                this.playAnimation(this.IMAGES_BOTTLE);
            }
        }, 400);
    }

    /**
     * Plays the sound effect when the salsa bottle is collected.
     * The sound plays only if the `playSounds` property is true.
     */
    playCollectSound() {
        if (this.playSounds) {
            this.SOUND_COLLECT.volume = 0.4;
            this.SOUND_COLLECT.play();
        }
    }
}