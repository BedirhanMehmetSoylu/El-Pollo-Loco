class Character extends MovableObject {
    height = 280;
    width = 140;
    y = 150;
    speed = 8;
    idleTime = 0;
    lastJumpSoundTime = 0;
    lastHurtSoundTime = 0;
    lastLandingTime = 0;
    previousY = this.y;
    isLongIdle = false;
    lost = false;
    isGameOver = false;
    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_IDLE_LONG = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];
    SOUND_JUMP = new Audio('./sounds/character-jump.mp3');
    SOUND_SNORING = new Audio('./sounds/snoring.mp3');
    SOUND_HURT = new Audio('./sounds/character-hurt.mp3');
    SOUND_LANDING = new Audio('./sounds/landing.mp3');
    world;
    offset = {
        top: 110,
        bottom: 10,
        left: 20,
        right: 20
    }

    /**
     * Constructor for initializing the character.
     * Loads images, applies gravity, and starts the animation loop.
     */
    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    /**
     * Checks if the character is jumping on an enemy.
     * @param {Object} enemy - The enemy object to check collision with.
     * @returns {boolean} True if the character is jumping on the enemy, false otherwise.
     */
    isJumpingOn(enemy) {
        return (
            this.y + this.height - this.offset.bottom < enemy.y + enemy.height / 2 &&
            this.speedY < 0
        );
    }

    /**
     * Initializes the animation for the character by handling movement and camera updates.
     * It also manages the character's animation based on the game state (idle, walking, jumping, etc.).
     * This method runs in intervals for continuous updates.
     * 
     * - `handleMovement()` handles user input and character movement.
     * - `updateCameraPosition()` adjusts the camera to follow the character.
     * - `handleAnimation()` updates the character's animation based on the game state.
     * 
     * @function animate
     * @memberof Character
     */
    animate() {
        setInterval(() => {
            this.handleMovement();
            this.updateCameraPosition();
        }, 1000 / 60);
    
        setInterval(() => {
            this.handleAnimation();
        }, 100);
    }
    
    /**
     * Handles the movement of the character, including left, right, and jump actions.
     * Resets idle timer and plays sound effects as necessary.
     */
    handleMovement() {
        if (this.world.keyboard.LEFT && this.x > 0 && !this.pauseAnimation) {
            this.moveLeft();
            this.otherDirection = true;
            this.resetIdleTimer();
        }
    
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.pauseAnimation) {
            this.moveRight();
            this.otherDirection = false;
            this.resetIdleTimer();
        }
    
        if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.pauseAnimation) {
            this.jump();
            this.resetIdleTimer();
        }
    
        if (this.isLanded()) {
            this.playLandingSound();
        }
    
        this.previousY = this.y;
    }
    
    /**
     * Updates the camera position based on the character's horizontal position.
     */
    updateCameraPosition() {
        this.world.camera_x = -this.x + 100;
    }
    
    /**
     * Handles the animation logic based on the character's current state.
     * This includes playing animations for death, hurt, jumping, walking, and idle.
     */
    handleAnimation() {
        if (this.isDead() && !this.isGameOver) {
            this.handleGameOver();
        } else if (this.isHurt() && !this.pauseAnimation) {
            this.handleHurt();
        } else if (this.isAboveGround() && !this.pauseAnimation) {
            this.handleJumping();
        } else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.pauseAnimation) {
            this.handleWalking();
        } else if (!this.pauseAnimation) {
            this.handleIdleAnimation();
        }
    }
    
    /**
     * Handles the game over animation and logic.
     */
    handleGameOver() {
        this.playAnimation(this.IMAGES_DEAD);
        this.isGameOver = true;
        this.lost = true;
        this.bottles = 0;
        pauseGame();
        gameOver();
    }
    
    /**
     * Handles the hurt animation and sound when the character is hurt.
     */
    handleHurt() {
        this.playAnimation(this.IMAGES_HURT);
        this.playHurtSound();
    }
    
    /**
     * Handles the jumping animation and sound.
     */
    handleJumping() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.playJumpSound();
    }
    
    /**
     * Handles the walking animation.
     */
    handleWalking() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Handles the idle animation. Plays a long idle animation after 5 seconds.
     * Plays the snoring sound if idle time exceeds 5 seconds.
     */
    handleIdleAnimation() {
        this.idleTime += 100;
        if (this.idleTime >= 5000) {
            this.isLongIdle = true;
            this.playAnimation(this.IMAGES_IDLE_LONG);
            this.playSnoringSound();
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Resets the idle timer and stops the snoring sound.
     */
    resetIdleTimer() {
        this.idleTime = 0;
        this.isLongIdle = false;
        this.stopSnoringSound();
    }

    /**
     * Plays the jump sound if the cooldown time has passed.
     */
    playJumpSound() {
        let now = Date.now();
        let cooldown = 350;

        console.log("playJumpSound aufgerufen!");

        if (now - this.lastJumpSoundTime >= cooldown && this.playSounds) {
            this.SOUND_JUMP.volume = 0.5;
            this.SOUND_JUMP.currentTime = 0;
            this.SOUND_JUMP.play();
            this.lastJumpSoundTime = now;
        }
    }

    /**
     * Plays the hurt sound if the cooldown time has passed.
     */
    playHurtSound() {
        let now = Date.now();
        let cooldown = 1000;

        if (now - this.lastHurtSoundTime >= cooldown && this.playSounds) {
            this.SOUND_HURT.volume = 0.5;
            this.SOUND_HURT.currentTime = 0.4;
            this.SOUND_HURT.play();
            this.lastHurtSoundTime = now;
        }
    }

    /**
     * Plays the snoring sound when the character is idle for a long period.
     * Pauses the sound if the character is not idle.
     */
    playSnoringSound() {
        if (this.playSounds) {
            this.SOUND_SNORING.play();
        } else {
            this.SOUND_SNORING.pause();
        }
    }

    /**
     * Stops the snoring sound by pausing it and resetting the time.
     */
    stopSnoringSound() {
        if (this.playSounds) {
            this.SOUND_SNORING.pause(); 
            this.SOUND_SNORING.currentTime = 0;
        }
    }

    /**
     * Plays the landing sound if the cooldown time has passed.
     */
    playLandingSound() {
        let now = Date.now();
        let cooldown = 400;
    
        if (now - this.lastLandingTime >= cooldown && this.playSounds) {
            this.SOUND_LANDING.volume = 0.3;
            this.SOUND_LANDING.currentTime = 0;
            this.SOUND_LANDING.play();
            this.lastLandingTime = now;
        }
    }    
}