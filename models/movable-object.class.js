class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    coins = 0;
    bottles = 0;
    lastHit = 0;
    lastBounce = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
    pauseAnimation = true;
    playSounds = false;

    /**
     * Applies gravity to the object, updating its vertical position based on speed and acceleration.
     * This method runs at a fixed interval to simulate gravity.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
                this.y = 150;
            }
        }, 1000 / 60);
    }    

    /**
     * Determines whether the object is above the ground or not.
     * 
     * @returns {boolean} True if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
    }

    /**
     * Checks whether the object has landed (i.e., moved from a higher position to a lower position).
     * 
     * @returns {boolean} True if the object has landed, otherwise false.
     */
    isLanded() {
        return this.previousY < this.y && !this.isAboveGround();
    }    

    /**
     * Checks if the object is colliding with another object.
     * 
     * @param {MovableObject} mo - The object to check for collision with.
     * @returns {boolean} True if the objects are colliding, otherwise false.
     */
    isColliding(mo) {
        let currentTime = new Date().getTime();
        if (currentTime - this.lastBounce < 100) {
            return false;
        }
    
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
               this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
               this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
               this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Applies damage to the object, reducing its energy.
     * The damage is applied only if the object hasn't been hit recently (to prevent multiple hits in a short time).
     */
    hit() {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastHit > 200) {
            this.energy -= 5;
            if (this.energy < 0) {
                this.energy = 0;
            }
            this.lastHit = currentTime;
        }
    }    

    /**
     * Increases the number of coins collected by the object.
     * The number of coins cannot exceed 10.
     */
    collectCoin() {
        this.coins += 1;

        if (this.coins > 10) {
            this.coins = 10
        }        
    }

    /**
     * Increases the number of bottles collected by the object.
     * The number of bottles cannot exceed 10.
     */
    collectBottle() {
        this.bottles += 1;

        if (this.bottles > 10) {
            this.bottles = 10
        }        
    }

    /**
     * Checks if the object has been hurt recently (within 0.5 seconds after being hit).
     * 
     * @returns {boolean} True if the object has been recently hurt, otherwise false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
     * Checks if the object is dead (i.e., has no energy left).
     * 
     * @returns {boolean} True if the object is dead, otherwise false.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays an animation by cycling through a list of images.
     * 
     * @param {string[]} images - The images to animate through.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right by its speed value.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed value.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by applying a vertical speed.
     */
    jump() {
        this.speedY = 25;
    }

    /**
     * Makes the object bounce by applying a vertical speed.
     */
    bounce() {
        this.speedY = 20;
        this.lastBounce = new Date().getTime();
    }    

    /**
     * Plays a sound from the specified source if sounds are enabled.
     * 
     * @param {string} src - The source path of the sound file to play.
     */
    playSound(src) {
        if (this.playSounds) {
            let sound = new Audio(src);
            sound.volume = 0.15;
            sound.play(); 
        }
    }
}