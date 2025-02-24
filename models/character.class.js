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
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
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

    isJumpingOn(enemy) {
        return (
            this.y + this.height - this.offset.bottom < enemy.y + enemy.height / 2 &&
            this.speedY < 0
        );
    }

    animate() {
        setInterval(() => {
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

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)

        setInterval(() => {
            if (this.isDead() && !this.isGameOver) {
                this.isGameOver = true;
                this.playAnimation(this.IMAGES_DEAD);
                this.lost = true;
                pauseGame();
                gameOver();
            } else if (this.isHurt() && !this.pauseAnimation) {
                this.playAnimation(this.IMAGES_HURT);
                this.playHurtSound();
            } else if (this.isAboveGround() && !this.pauseAnimation) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.playJumpSound();
            } else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.pauseAnimation) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (!this.pauseAnimation) {
                this.handleIdleAnimation();
            }
        }, 100);
    }

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

    resetIdleTimer() {
        this.idleTime = 0;
        this.isLongIdle = false;
        this.stopSnoringSound();
    }

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

    playSnoringSound() {
        if (this.playSounds) {
            this.SOUND_SNORING.play();
        } else {
            this.SOUND_SNORING.pause();
        }
    }

    stopSnoringSound() {
        if (this.playSounds) {
            this.SOUND_SNORING.pause(); 
            this.SOUND_SNORING.currentTime = 0;
        }
    }

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