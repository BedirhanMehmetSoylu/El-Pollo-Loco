class Endboss extends MovableObject {
    activated = false;
    character = null;
    height = 400;
    width = 250;
    y = 55;
    speed = 3.5;
    isDeadStatus = false;
    isHurtStatus = false;

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    SOUND_HURT = new Audio('./sounds/endboss-hurt.mp3');

    offset = {
        top: 60,
        bottom: 0,
        left: 15,
        right: 5
    }

    /**
     * Creates an instance of the Endboss.
     * 
     * @param {Object} character The character (player) interacting with the Endboss.
     */
    constructor(character) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2800;
        this.character = character;
        this.isWalking = true;
        this.alertMode = false;
        this.alertAnimationPlayed = false;
    }

    /**
     * Activates the Endboss.
     * 
     * @param {Object} character The character (player) interacting with the Endboss.
     */
    activate(character) {
        this.activated = true;
        this.character = character;
        this.animate();
    }

    /**
     * Handles the animation for the enemy.
     * Animates movement, alert mode, hurt status, and death sequence.
     * 
     * @function animate
     * @memberof Enemy
     */
    animate() {
        this.handleMovementAnimation();
        this.handleAlertAnimation();
        this.handleAlertModeTrigger();
        this.handleHurtAnimation();
        this.handleDeathAnimation();
    }

    /**
     * Handles the movement animation of the enemy, including direction and walking animation.
     * 
     * @function handleMovementAnimation
     * @memberof Enemy
     */
    handleMovementAnimation() {
        setInterval(() => {
            if (!this.alertMode && !this.attacking && !this.isDeadStatus && !this.pauseAnimation) {
                this.moveTowardsCharacter();
                if (this.isWalking) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 1000 / 60);
    }

    /**
     * Moves the enemy towards the character based on position.
     * 
     * @function moveTowardsCharacter
     * @memberof Enemy
     */
    moveTowardsCharacter() {
        if (this.x < this.character.x) {
            this.moveRight();
            this.otherDirection = true;
        } else {
            this.moveLeft();
            this.otherDirection = false;
        }
    }

    /**
     * Plays the alert animation when alert mode is active.
     * 
     * @function handleAlertAnimation
     * @memberof Enemy
     */
    handleAlertAnimation() {
        setInterval(() => {
            if (this.alertMode && !this.alertAnimationPlayed && !this.pauseAnimation) {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 150);
    }

    /**
     * Triggers alert mode when the enemy reaches a certain x position.
     * 
     * @function handleAlertModeTrigger
     * @memberof Enemy
     */
    handleAlertModeTrigger() {
        setInterval(() => {
            if (this.x <= 2600 && !this.alertAnimationPlayed && !this.pauseAnimation) {
                this.enterAlertMode();
            }
        }, 1000 / 60);
    }

    /**
     * Handles the hurt animation when the enemy is hurt.
     * 
     * @function handleHurtAnimation
     * @memberof Enemy
     */
    handleHurtAnimation() {
        setInterval(() => {
            if (this.isHurtStatus && !this.pauseAnimation) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 100);
    }

    /**
     * Handles the death animation and actions after the enemy dies.
     * 
     * @function handleDeathAnimation
     * @memberof Enemy
     */
    handleDeathAnimation() {
        setInterval(() => {
            if (this.isDeadStatus && !this.pauseAnimation) {
                this.playAnimation(this.IMAGES_DEAD);
                this.character.bottles = 0;
                gameWon();
            }
        }, 100);
    }

    /**
     * Triggers the alert mode for the Endboss.
     * The Endboss will stop walking and play an alert animation.
     */
    enterAlertMode() {
        this.isWalking = false;
        this.alertMode = true;
        this.alertAnimationPlayed = false;

        setTimeout(() => {
            this.alertMode = false;
            this.alertAnimationPlayed = true;
            this.isWalking = true;
        }, 1000);
    }

    /**
     * Makes the Endboss attack the player.
     * Stops walking and plays an attack animation.
     */
    attack() {
        if (this.attacking) return;
    
        this.attacking = true;
        this.isWalking = false;
        this.alertMode = false;  
        if (!this.pauseAnimation) {
            this.playAnimation(this.IMAGES_ATTACK);    
        }
        setTimeout(() => {
            this.attacking = false;
            this.isWalking = true;
        }, 1000 / 30);
    }

    /**
     * Makes the Endboss take damage and play a hurt animation.
     * The Endboss will stop walking during this animation.
     */
    takeDamage() {
        if (this.isHurtStatus) return;
    
        this.isHurtStatus = true;
        this.isWalking = false;
        if (!this.pauseAnimation) {
            this.playAnimation(this.IMAGES_HURT);  
            this.playHurtSound();
        }
        setTimeout(() => {
            this.isHurtStatus = false;
            this.isWalking = true;
        }, 500);
    }

    /**
     * Plays the hurt sound when the Endboss takes damage.
     */
    playHurtSound() {
        if (this.playSounds && !this.hurtSoundCooldown || Date.now() - this.hurtSoundCooldown > 1000) {
            this.SOUND_HURT.currentTime = 1;
            this.SOUND_HURT.play();
            this.hurtSoundCooldown = Date.now();
        }
    }

    /**
     * Marks the Endboss as dead and stops all actions.
     * The Endboss stops walking and attacking.
     */
    die() {
        this.isDeadStatus = true;
        this.attacking = false;
        this.isWalking = false;
        this.alertMode = false;
    }
}
