class Level {
    enemies;
    clouds;
    coins;
    bottles
    backgroundObjects;
    level_end_x = 2250;

    /**
     * Creates a new level with the given enemies, clouds, background objects, coins, and bottles.
     * 
     * @param {Enemy[]} enemies - An array of enemies present in the level.
     * @param {Cloud[]} clouds - An array of clouds in the level.
     * @param {BackgroundObject[]} backgroundObjects - An array of background objects (e.g., platforms, obstacles).
     * @param {Coin[]} coins - An array of coin objects present in the level.
     * @param {Bottle[]} bottles - An array of bottle objects present in the level.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}