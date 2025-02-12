class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    IMAGES_CLOUD = [
        './img/5_background/layers/4_clouds/1.png',
        './img/5_background/layers/4_clouds/2.png',
        './img/5_background/layers/4_clouds/1.png',
        './img/5_background/layers/4_clouds/2.png',
        './img/5_background/layers/4_clouds/1.png',
        './img/5_background/layers/4_clouds/2.png',
        './img/5_background/layers/4_clouds/1.png',
        './img/5_background/layers/4_clouds/2.png'
    ];

    constructor() {
        super();
        this.x = Math.random() * 500;
        this.images = this.IMAGES_CLOUD.map(src => this.loadNewImage(src));
        this.animate();
    }

    loadNewImage(src) {
        let img = new Image();
        img.src = src;
        return img;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    draw(ctx) {
        this.images.forEach((img, index) => {
            ctx.drawImage(img, this.x + index * this.width, this.y, this.width, this.height);
        });
    }
}
