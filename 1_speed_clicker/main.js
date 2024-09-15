var config = {
  type: Phaser.AUTO,
  width: 450,
  height: 800,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

let scoreText;
let score = 0;

function preload() {
  this.load.image('cookie', 'assets/cookie.png');
}

function create() {
  const cookie = this.add.image(100, 100, 'cookie').setInteractive();
  cookie.on('pointerdown', cookieClicked);

  scoreText = this.add.text(10, 40, score.toString(), {
    fontSize: '32px',
    fill: '#FFF',
  });

  let graphics = this.add.graphics();
  graphics.fillStyle(0xff0000, 1);
  graphics.fillRect(100, 100, 200, 150);
}

const cookieClicked = () => {
  score += 1;
  scoreText.setText(score.toString());
};

function update() {}
