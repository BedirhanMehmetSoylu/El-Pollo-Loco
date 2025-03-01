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

    /**
     * Creates an instance of a cloud and initializes its position and animation.
     * 
     * @constructor
     */
    constructor() {
        super();
        this.x = Math.random() * 500;
        this.images = this.IMAGES_CLOUD.map(src => this.loadNewImage(src));
        this.animate();
    }

    /**
     * Loads an image from the given source path and returns the image element.
     * 
     * @param {string} src - The path to the image source.
     * @returns {HTMLImageElement} The image element.
     */
    loadNewImage(src) {
        let img = new Image();
        img.src = src;
        return img;
    }

    /**
     * Animates the cloud by moving it to the left at a set interval.
     * 
     * @private
     */
    animate() {
        setInterval(() => {
            if (!this.pauseAnimation) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    /**
     * Draws the cloud on the canvas by rendering each image in the cloud's image array.
     * The images will be drawn in a sequence, creating a moving effect.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    draw(ctx) {
        this.images.forEach((img, index) => {
            ctx.drawImage(img, this.x + index * this.width, this.y, this.width, this.height);
        });
    }
}
