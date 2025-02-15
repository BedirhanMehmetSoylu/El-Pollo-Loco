// class Endboss extends MovableObject {

//     height = 400;
//     width = 250;
//     y = 55;
//     speed = 2;

//     IMAGES_WALKING = [
//         './img/4_enemie_boss_chicken/1_walk/G1.png',
//         './img/4_enemie_boss_chicken/1_walk/G2.png',
//         './img/4_enemie_boss_chicken/1_walk/G3.png',
//         './img/4_enemie_boss_chicken/1_walk/G4.png',
//     ];

//     IMAGES_ALERT = [
//         './img/4_enemie_boss_chicken/2_alert/G5.png',
//         './img/4_enemie_boss_chicken/2_alert/G6.png',
//         './img/4_enemie_boss_chicken/2_alert/G7.png',
//         './img/4_enemie_boss_chicken/2_alert/G8.png',
//         './img/4_enemie_boss_chicken/2_alert/G9.png',
//         './img/4_enemie_boss_chicken/2_alert/G10.png',
//         './img/4_enemie_boss_chicken/2_alert/G11.png',
//         './img/4_enemie_boss_chicken/2_alert/G12.png'
//     ];

//     constructor() {
//         super().loadImage(this.IMAGES_WALKING[0]);
//         this.loadImages(this.IMAGES_WALKING);
//         this.loadImages(this.IMAGES_ALERT);
//         this.x = 600;
//         this.animate();
//     }

//     animate() {
//         setInterval(() => {
//             this.playAnimation(this.IMAGES_WALKING);
//             this.moveLeft();
//         }, 1000 / 60);
    
//         setTimeout(() => {
//             this.moveLeft();
//         }, 1000);

//         setInterval(() => {
//             this.playAnimation(this.IMAGES_ALERT);
//         }, 150);
//     }
// }

class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 55;
    speed = 3.5;

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    constructor(character) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.x = 600; // Startposition
        this.character = character;
        this.isWalking = true;  // Neue Variable, um zu steuern, ob der Boss läuft oder im Alarmzustand ist
        this.alertMode = false; // Flag, um den Alarmzustand zu verfolgen
        this.alertAnimationPlayed = false; // Sicherstellen, dass der Alarm nur einmal abgespielt wird
        this.animate();
    }

    animate() {
        // Animation für das Gehen (läuft kontinuierlich)
        setInterval(() => {
            if (!this.alertMode) {  // Endboss läuft nur, wenn er nicht im Alarmzustand ist
                if (this.x < this.character.x) {
                    this.moveRight();
                    this.otherDirection = true;
                } else {
                    this.moveLeft();
                    this.otherDirection = false;
                }
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 60);

        // Wenn der Boss im Alarmzustand ist, wird die Alarm-Animation gespielt
        setInterval(() => {
            if (this.alertMode && !this.alertAnimationPlayed) {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 150);

        // Überprüfen, ob der Boss in den Alarmzustand wechselt (z.B. wenn er eine bestimmte Position erreicht)
        setInterval(() => {
            if (this.x <= 400 && !this.alertAnimationPlayed) {
                this.enterAlertMode(); // Wechsel in den Alarmzustand
            }
        }, 1000 / 60);
    }

    // Funktion, die den Boss in den Alarmzustand versetzt
    enterAlertMode() {
        this.isWalking = false; // Der Boss stoppt vorerst
        this.alertMode = true; // Alarm-Flag aktivieren
        this.alertAnimationPlayed = false; // Sicherstellen, dass die Animation nur einmal gespielt wird

        // Alarm-Phase für 2 Sekunden abspielen und dann wieder laufen
        setTimeout(() => {
            this.alertMode = false; // Alarm-Flag deaktivieren
            this.alertAnimationPlayed = true; // Alarm-Animation abgeschlossen
            this.isWalking = true; // Der Boss beginnt wieder zu laufen
        }, 1000); // Alarm-Phase dauert 2 Sekunden
    }
}

