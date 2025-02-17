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

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndexHealth()];
        this.img = this.imageCache[path];
    }

    resolveImageIndexHealth() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
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

    setPercentageBottle(percentageBottle) {
        this.percentageBottle = percentageBottle;
        let path = this.IMAGES[this.resolveImageIndexBottle()];
        this.img = this.imageCache[path];
    }

    resolveImageIndexBottle() {
        if (this.percentageBottle <= 0) {
            return 0;
        } else if (this.percentageBottle <= 1) {
            return 1;
        } else if (this.percentageBottle <= 4) {
            return 2;
        } else if (this.percentageBottle <= 6) {
            return 3;
        } else if (this.percentageBottle <= 9) {
            return 4;
        } else if (this.percentageBottle >= 10) {
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

    setPercentageCoin(percentageCoin) {
        this.percentageCoin = percentageCoin;
        let path = this.IMAGES[this.resolveImageIndexCoins()];
        this.img = this.imageCache[path];
    }

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

    setPercentage(percentageEndboss) {
        this.percentageEndboss = percentageEndboss;
        let path = this.IMAGES[this.resolveImageIndexHealth()];
        this.img = this.imageCache[path];
    }

    resolveImageIndexHealth() {
        if (this.percentageEndboss == 100) {
            return 5;
        } else if (this.percentageEndboss > 80) {
            return 4;
        } else if (this.percentageEndboss > 60) {
            return 3;
        } else if (this.percentageEndboss > 40) {
            return 2;
        } else if (this.percentageEndboss > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
