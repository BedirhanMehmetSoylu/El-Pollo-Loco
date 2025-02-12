class Coins extends MovableObject {
    width = 110;
    height = 110;
    IMAGES_COINS = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ]
    offset = {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30
    }

    constructor() {
        super().loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.animate();
        this.y = 120 + Math.random() * 150;
        this.x = 120 + Math.random() * 2100;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 200);
    }
}