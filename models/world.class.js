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

    /**
     * Creates a new game world instance.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
     * @param {Object} keyboard - The object handling keyboard input.
     */
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

    /** 
     * Sets a reference to the current game world inside the character class.
     */
    setWorld() {
        this.character.world = this;
    }

    /** 
     * Starts the main game loop and periodically checks for collisions and actions.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionsEndboss();
            this.checkThrowObjects();
            this.checkForEndbossActivation();
            this.checkCollisionsThrowableObject();
        }, 1000 / 60);
    }

    /** 
     * Activates the end boss when the character reaches a certain position.
     */
    checkForEndbossActivation() {
        if (!this.endboss.activated && this.character.x >= 2190) { 
            this.endboss.activate(this.character);
        }
    }

    /** 
     * Checks if a throwable object (bottle) should be thrown and creates a new bottle.
     */
    checkThrowObjects() {
        const currentTime = new Date().getTime();
        const throwDelay = 1000;
    
        if (this.keyboard.E && this.character.bottles > 0 && currentTime - this.lastThrowTime >= throwDelay) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.character.bottles -= 1;
            this.statusBarBottle.setPercentageBottle(this.character.bottles);
            this.lastThrowTime = currentTime;
        }
    }
    
    /** 
     * Checks for collisions between the character and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                this.handleEnemyCollision(enemy, index);
            }
        });
    }
    
    /** 
     * Handles a collision between the character and an enemy.
     * @param {Object} enemy - The colliding enemy.
     * @param {number} index - The index of the enemy in the array.
     */
    handleEnemyCollision(enemy, index) {
        if (this.character.isJumpingOn(enemy)) {
            this.defeatEnemy(enemy, index);
        } else if (!this.character.isHurt() && !this.character.pauseAnimation) {
            this.damageCharacter();
        }
    }
    
    /** 
     * Defeats an enemy and removes it from the game.
     * @param {Object} enemy - The enemy to be defeated.
     * @param {number} index - The index of the enemy in the array.
     */
    defeatEnemy(enemy, index) {
        this.character.bounce();
        enemy.energy = 0;
        enemy.die();
        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 250);
    }
    
    /** 
     * Deals damage to the character.
     */
    damageCharacter() {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
    }    
    
    /** 
     * Checks for collisions between throwable objects (bottles) and enemies or the end boss.
     */
    checkCollisionsThrowableObject() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.checkEnemyCollisions(bottle, bottleIndex);
            this.checkEndbossCollision(bottle, bottleIndex);
        });
    }
    
    /** 
     * Checks for collisions between a bottle and enemies.
     * @param {Object} bottle - The thrown bottle.
     * @param {number} bottleIndex - The index of the bottle in the array.
     */
    checkEnemyCollisions(bottle, bottleIndex) {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (bottle.isColliding(enemy)) {
                this.handleEnemyHit(bottle, bottleIndex, enemy, enemyIndex);
            }
        });
    }
    
    /** 
     * Handles a collision between a bottle and an enemy.
     */
    handleEnemyHit(bottle, bottleIndex, enemy, enemyIndex) {
        bottle.playSplashSound();
        enemy.energy = 0;
        enemy.die();
        setTimeout(() => {
            this.level.enemies.splice(enemyIndex, 1);
        }, 250);
        this.throwableObjects.splice(bottleIndex, 1);
    }
    
    /** 
     * Checks for a collision between a bottle and the end boss.
     */
    checkEndbossCollision(bottle, bottleIndex) {
        if (bottle.isColliding(this.endboss)) {
            this.handleEndbossHit(bottle, bottleIndex);
        }
    }
    
    /** 
     * Handles a collision between a bottle and the end boss.
     */
    handleEndbossHit(bottle, bottleIndex) {
        bottle.playSplashSound();
        this.endboss.energy -= 20;
        this.statusBarEndboss.setPercentage(this.endboss.energy);
        this.endboss.takeDamage();
    
        if (this.endboss.energy <= 0) {
            this.endboss.die();
        }
        
        this.throwableObjects.splice(bottleIndex, 1);
    }    

    /** 
     * Checks for collisions between the character and the end boss.
     */
    checkCollisionsEndboss() {
        if (this.endboss.isColliding(this.character) && !this.endboss.pauseAnimation) {
            this.character.hit();
            this.statusBarHealth.setPercentage(this.character.energy);
            this.endboss.attack();
        }
    }
    
    /**
     * Checks for collisions between the character and coins at regular intervals.
     * If a collision is detected, the coin is collected, removed from the game, 
     * and the coin status bar is updated.
     */
    checkCollisionCoins() {
        setInterval(() => {
            this.level.coins.forEach((coin) => {
                 if (this.character.isColliding(coin)) {
                     coin.playCollectSound();
                     this.character.collectCoin();
                     this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                     this.statusBarCoin.setPercentageCoin(this.character.coins);
                 }
            }) 
         }, 200);
    }

    /**
     * Checks for collisions between the character and bottles at regular intervals.
     * If a collision is detected, the bottle is collected, removed from the game, 
     * and the bottle status bar is updated.
     */
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

    /** 
     * Draws the game and updates the visuals.
     */
    draw() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.drawBackground();
        this.drawObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.drawUI();
        this.requestNextFrame();
    }
    
    /** 
     * Clears the canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    /** 
     * Draws the background.
     */
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }
    
    /** 
     * Draws all objects.
     */
    drawObjects() {
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
    }
    
    /** 
     * Draws the user interface.
     */
    drawUI() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        if (this.endboss.activated) {
            this.addToMap(this.statusBarEndboss);
        }
    }
    
    /** 
     * Requests the next frame in the animation loop.
     */
    requestNextFrame() {
        requestAnimationFrame(() => this.draw());
    } 

    /**
     * Adds multiple objects to the game map by drawing each object.
     * @param {Array<Object>} objects - The array of objects to be drawn on the canvas.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the game map, handling its drawing and mirroring if needed.
     * @param {Object} mo - The movable object to be drawn.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an object's image horizontally before drawing.
     * @param {Object} mo - The object to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the object's original position after flipping.
     * @param {Object} mo - The object to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}