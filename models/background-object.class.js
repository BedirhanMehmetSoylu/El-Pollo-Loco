class BackgroundObject extends MovableObject {
    width =  720;
    height = 480;

    /**
     * Creates an instance of a background object, loads an image, and sets its position.
     * 
     * @param {string} imagePath - The path to the background image to load.
     * @param {number} x - The x-coordinate position of the background object on the canvas.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}