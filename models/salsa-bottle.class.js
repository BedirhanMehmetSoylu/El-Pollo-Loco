class SalsaBottle extends MovableObject {
    width = 100;
    height = 100;
    y = 350;

    IMAGES_BOTTLE = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    offset = {
        top: 15,
        bottom: 10,
        left: 25,
        right: 15
    }

    constructor() {
        super().loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.animate();
        this.x = 120 + Math.random() * 2100;
    }

    animate() {
        setInterval(() => {
            if (!this.pauseAnimation) {
                this.playAnimation(this.IMAGES_BOTTLE);
            }
        }, 400);
    }
}