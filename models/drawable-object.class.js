class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 200;
    height = 200;
    width = 100;

    /**
     * Loads an image from the provided path and sets it as the current image of the object.
     * 
     * @param {string} path - The path to the image file to load.
     */
    loadImage(path) {
        this.img = new Image()
        this.img.src = path;
    }

    /**
     * Draws the current image of the object onto the specified canvas context.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw the image onto.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads an array of images into the image cache, indexed by their respective paths.
     * 
     * @param {string[]} array - An array of image file paths to load.
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}