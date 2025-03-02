class StatusBarHealth extends DrawableObject {
    IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ]

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 0;
        this.width = 240;
        this.height = 64;
        this.setPercentage(100);
    }

    /**
     * Updates the health bar to reflect the given percentage.
     * @param {number} percentage - The player's health percentage (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndexHealth()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the correct health bar image index based on the current percentage.
     * @returns {number} The index of the corresponding image.
     */
    resolveImageIndexHealth() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 1) {
            return 1;
        } else {
            return 0;
        }
    }
};

class StatusBarBottle extends DrawableObject {
    IMAGES = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ]

    percentageBottle = 0

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 56;
        this.width = 240;
        this.height = 64;
        this.setPercentageBottle(0);
    }

    /**
     * Updates the bottle status bar to reflect the current count.
     * @param {number} percentageBottle - The number of bottles collected.
     */
    setPercentageBottle(percentageBottle) {
        this.percentageBottle = percentageBottle;
        let path = this.IMAGES[this.resolveImageIndexBottle()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the correct bottle bar image index based on the current count.
     * @returns {number} The index of the corresponding image.
     */
    resolveImageIndexBottle() {
        if (this.percentageBottle <= 0) {
            return 0;
        } else if (this.percentageBottle <= 1) {
            return 1;
        } else if (this.percentageBottle <= 2) {
            return 2;
        } else if (this.percentageBottle <= 3) {
            return 3;
        } else if (this.percentageBottle <= 4) {
            return 4;
        } else if (this.percentageBottle >= 5) {
            return 5;
        }
    }
}

class StatusBarCoin extends DrawableObject {
    IMAGES = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ]
    percentageCoin = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 112;
        this.width = 240;
        this.height = 64;
        this.setPercentageCoin(0);
    }

    /**
     * Updates the coin status bar to reflect the current count.
     * @param {number} percentageCoin - The number of coins collected.
     */
    setPercentageCoin(percentageCoin) {
        this.percentageCoin = percentageCoin;
        let path = this.IMAGES[this.resolveImageIndexCoins()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the correct coin bar image index based on the current count.
     * @returns {number} The index of the corresponding image.
     */
    resolveImageIndexCoins() {
        if (this.percentageCoin <= 0) {
            return 0;
        } else if (this.percentageCoin <= 1) {
            return 1;
        } else if (this.percentageCoin <= 4) {
            return 2;
        } else if (this.percentageCoin <= 6) {
            return 3;
        } else if (this.percentageCoin <= 9) {
            return 4;
        } else if (this.percentageCoin >= 10) {
            return 5;
        }
    }
}

class StatusBarEndboss extends DrawableObject {
    IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/green/0.png',
        './img/7_statusbars/2_statusbar_endboss/green/20.png',
        './img/7_statusbars/2_statusbar_endboss/green/40.png',
        './img/7_statusbars/2_statusbar_endboss/green/60.png',
        './img/7_statusbars/2_statusbar_endboss/green/80.png',
        './img/7_statusbars/2_statusbar_endboss/green/100.png'
    ];

    percentageEndboss = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 460;
        this.y = 8;
        this.width = 240;
        this.height = 64;
        this.setPercentage(100);
    }

    /**
     * Updates the Endboss health bar to reflect the given percentage.
     * @param {number} percentageEndboss - The Endboss's health percentage (0-100).
     */
    setPercentage(percentageEndboss) {
        this.percentageEndboss = percentageEndboss;
        let path = this.IMAGES[this.resolveImageIndexHealth()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the correct health bar image index based on the Endboss's current percentage.
     * @returns {number} The index of the corresponding image.
     */
    resolveImageIndexHealth() {
        if (this.percentageEndboss == 100) {
            return 5;
        } else if (this.percentageEndboss > 80) {
            return 4;
        } else if (this.percentageEndboss > 60) {
            return 3;
        } else if (this.percentageEndboss > 40) {
            return 2;
        } else if (this.percentageEndboss > 1) {
            return 1;
        } else {
            return 0;
        }
    }
}
