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

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0; // Verhindert, dass `speedY` weiter negativ wird
                this.y = 150; // Standardwert für den Boden -> Setze Y zurück!
            }
        }, 1000 / 60);
    }    

    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable Objects should always fall
            return true;
        } else {
            return this.y < 150;
        }
    }

    isColliding(mo) {
        let currentTime = new Date().getTime();
        if (currentTime - this.lastBounce < 100) {
            return false; // Keine Kollision für 100ms nach einem Bounce
        }
    
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
               this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
               this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
               this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

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

    collectCoin() {
        this.coins += 1;

        if (this.coins > 10) {
            this.coins = 10
        }        
    }

    collectBottle() {
        this.bottles += 1;

        if (this.bottles > 10) {
            this.bottles = 10
        }        
        console.log(this.bottles);
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Diffrence in ms
        timepassed = timepassed / 1000; // Difference ins s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 25;
    }

    bounce() {
        this.speedY = 20;
        this.lastBounce = new Date().getTime();  // Merkt sich die Zeit des letzten Sprungs
    }    
}