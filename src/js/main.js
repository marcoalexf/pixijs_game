import Phaser from 'phaser'

const randomNumberInInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

const game = new Phaser.Game(config);
let particles, cursors, rocket, enemies, survivedTime, survivedTimeText, bestTimeText, startTime;
let bestTime = 0;

function preload ()
{
    this.load.image('fire', 'assets/Fire.png');
    this.load.image('rocket', 'assets/rocket.png');
    this.load.image('logo', 'assets/nasa.png');
    this.load.image('enemy', 'assets/enemy.png');
}

function create ()
{
    survivedTime = 0;
    const tick = setInterval(() => {
        survivedTime += 1;
        survivedTimeText.setText(`Current: ${survivedTime}s`);
    }, 1000);
    startTime = Date.now();
    particles = this.add.particles('fire');

    const logo = this.add.sprite(400, 300, 'logo');
    logo.setOrigin(0.5, 0.5);
    logo.setScale(.2);

    const combustion = particles.createEmitter({
        alpha: { start: 1, end: 0 },
        scale: { start: 0.5, end: 1 },
        tint: { start: 0xff945e, end: 0xff945e },
        speed: 20,
        accelerationY: 400,
        angle: { min: -85, max: -95 },
        rotate: { min: -180, max: 180 },
        lifespan: 3000,
        blendMode: 'ADD',
        frequency: 110,
        x: 400,
        y: 300,
        collideBottom: true,
    });

    rocket = this.physics.add.image(250, 550, 'rocket');
    rocket.setScale(.2);
    rocket.setCollideWorldBounds(true);
    
    this.physics.world.enable([ rocket, logo ]);
    combustion.startFollow(rocket);

    cursors = this.input.keyboard.createCursorKeys();

    enemies = this.physics.add.group();

    this.physics.add.collider(rocket, enemies, () => {
        this.scene.restart();
        clearInterval(tick);
        debugger;
        if (survivedTime > bestTime) {
            bestTime = survivedTime
            bestTimeText.setText(`Previous record: ${bestTime}s`);
        }
    });

    const style = { font: "bold 14px Arial", fill: "white" };
    bestTimeText = this.add.text(0, 0, `Previous record: ${bestTime || 0}s`, style);
    survivedTimeText = this.add.text(0, 10, `Current: ${survivedTime || 0}s`, style);
}

function update ()
{
    const isOdd = randomNumberInInterval(1, 14) % 5 == 0;

    if (isOdd) {
        const enemy = this.physics.add.image(randomNumberInInterval(50, 750), 0, 'enemy');
        enemy.setScale(.05);
        enemies.add(enemy);
    }

    if (cursors.left.isDown)
    {
        rocket.body.velocity.x -= 50 * 0.3;
    }
    else if (cursors.right.isDown)
    {
        rocket.body.velocity.x += 50 * 0.3;
    }

    if (cursors.up.isDown)
    {
        rocket.body.velocity.y -= 50 * 0.3;
    }
    else if (cursors.down.isDown)
    {
        rocket.body.velocity.y += 50 * 0.3;
    }

}