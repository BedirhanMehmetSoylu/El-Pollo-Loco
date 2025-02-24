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
    SOUND_COLLECT = new Audio('./sounds/coin.mp3');

    constructor() {
        super().loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.animate();
        this.y = 120 + Math.random() * 150;
        this.x = 120 + Math.random() * 2100;
    }

    animate() {
        setInterval(() => {
            if (!this.pauseAnimation) {
                this.playAnimation(this.IMAGES_COINS); 
            }
        }, 200);
    }

    playCollectSound() {
        if (this.playSounds) {
            this.SOUND_COLLECT.volume = 0.4;
            this.SOUND_COLLECT.play();
        }
    }
}