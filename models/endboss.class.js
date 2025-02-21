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

    offset = {
        top: 60,
        bottom: 0,
        left: 15,
        right: 5
    }

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

    activate(character) {
        this.activated = true;
        this.character = character;
        this.animate();
    }

    animate() {
        if (!this.activated) return;

        setInterval(() => {
            if (!this.alertMode && !this.attacking && !this.isDeadStatus && !this.pauseAnimation) {
                if (this.x < this.character.x) {
                    this.moveRight();
                    this.otherDirection = true;
                } else {
                    this.moveLeft();
                    this.otherDirection = false;
                }
                if (this.isWalking) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.alertMode && !this.alertAnimationPlayed && !this.pauseAnimation) {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 150);

        setInterval(() => {
            if (this.x <= 2600 && !this.alertAnimationPlayed && !this.pauseAnimation) {
                this.enterAlertMode();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isHurtStatus && !this.pauseAnimation) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 100);

        setInterval(() => {
            if (this.isDeadStatus && !this.pauseAnimation) {
                this.playAnimation(this.IMAGES_DEAD);
                gameWon();
            }
        }, 100);
    }

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

    takeDamage() {
        if (this.isHurtStatus) return;
    
        this.isHurtStatus = true;
        this.isWalking = false;
        if (!this.pauseAnimation) {
            this.playAnimation(this.IMAGES_HURT);  
        }
        
        setTimeout(() => {
            this.isHurtStatus = false;
            this.isWalking = true;
        }, 500);
    }

    die() {
        this.isDeadStatus = true;
        this.attacking = false;
        this.isWalking = false;
        this.alertMode = false;
    }
}
