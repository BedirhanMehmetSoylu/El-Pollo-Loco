class Chicken extends MovableObject {
    y = 345;
    width = 80;
    height = 80;
    isDeadStatus = false; // Neu hinzugefügt!
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.x = 300 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
    }

    die() {
        this.isDeadStatus = true; // Flag setzen, damit animate() stoppt
        this.playAnimation(this.IMAGES_DEAD);
        
        setTimeout(() => {
            this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]]; // Bleibt auf letztem Bild
        }, this.IMAGES_DEAD.length * 100);
    }
    
    animate() {
        setInterval(() => {
            if (!this.isDeadStatus) {
                this.moveLeft();
            }
        }, 1000 / 60);
    
        setInterval(() => {
            if (!this.isDeadStatus) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }
    
}

class ChickenSmall extends MovableObject {
    y = 385;
    width = 40;
    height = 40;
    isDeadStatus = false; // Neu hinzugefügt!
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.x = 300 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
    }

    die() {
        this.isDeadStatus = true; // Flag setzen, damit animate() stoppt
        this.playAnimation(this.IMAGES_DEAD);
        
        setTimeout(() => {
            this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]]; // Bleibt auf letztem Bild
        }, this.IMAGES_DEAD.length * 100);
    }
    
    animate() {
        setInterval(() => {
            if (!this.isDeadStatus) {
                this.moveLeft();
            }
        }, 1000 / 60);
    
        setInterval(() => {
            if (!this.isDeadStatus) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }
}