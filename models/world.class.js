class World {
    character = new Character();
    endboss = new Endboss(this.character);
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.lastThrowTime = new Date().getTime();
        this.draw();
        this.setWorld();
        this.run();
        this.checkCollisionCoins();
        this.checkCollisionBottles();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionsEndboss();
            this.checkThrowObjects();
            this.checkForEndbossActivation();
            this.checkCollisionsThrowableObject();
        }, 1000 / 60);
    }

    checkForEndbossActivation() {
        if (!this.endboss.activated && this.character.x >= 2190) { 
            this.endboss.activate(this.character);
        }
    }

    checkThrowObjects() {
        const currentTime = new Date().getTime();
        const throwDelay = 500;
    
        if (this.keyboard.E && this.character.bottles > 0 && currentTime - this.lastThrowTime >= throwDelay) {
    
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.character.bottles -= 1;
            this.statusBarBottle.setPercentageBottle(this.character.bottles);
            
            this.lastThrowTime = currentTime;
        }
    }
    
    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isJumpingOn(enemy)) {
                    this.character.bounce();
                    enemy.energy = 0;
                    if (enemy.energy <= 0) {
                        enemy.die();
                        setTimeout(() => {
                            this.level.enemies.splice(index, 1);  
                        }, 250)
                    }
                } 
                else if (!this.character.isHurt() && !this.character.pauseAnimation) { 
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }

    checkCollisionsThrowableObject() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (bottle.isColliding(enemy)) {
                bottle.playSplashSound();
                enemy.energy = 0;
                if (enemy.energy <= 0) {
                    enemy.die();
                    setTimeout(() => {
                        this.level.enemies.splice(enemyIndex, 1);
                    }, 250);
                }
                this.throwableObjects.splice(bottleIndex, 1);
            }
        });

        if (bottle.isColliding(this.endboss)) {
            bottle.playSplashSound();
            this.endboss.energy -= 20;
            this.statusBarEndboss.setPercentage(this.endboss.energy);
            this.endboss.takeDamage();
            if (this.endboss.energy <= 0) {
                this.endboss.die();
            }
            this.throwableObjects.splice(bottleIndex, 1);
            }
        });
    }

    checkCollisionsEndboss() {
        if (this.endboss.isColliding(this.character) && !this.endboss.pauseAnimation) {
            this.character.hit();
            this.statusBarHealth.setPercentage(this.character.energy);
            this.endboss.attack();
        }
    }
    
    checkCollisionCoins() {
        setInterval(() => {
            this.level.coins.forEach((coin) => {
                 if (this.character.isColliding(coin)) {
                     coin.playCollectSound(); // Sound abspielen
                     this.character.collectCoin();
                     this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                     this.statusBarCoin.setPercentageCoin(this.character.coins);
                 }
            }) 
         }, 200);
    }

    checkCollisionBottles() {
        setInterval(() => {
            this.level.bottles.forEach((bottle) => {
                 if (this.character.isColliding(bottle)) {
                     bottle.playCollectSound();
                     this.character.collectBottle();
                     this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                     this.statusBarBottle.setPercentageBottle(this.character.bottles);
                     this.bottlesCount += 1;
                 }
            }) 
         }, 200);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        if (this.endboss.activated) {
            this.addToMap(this.statusBarEndboss);
        }        
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}