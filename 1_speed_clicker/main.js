const config = {
  type: Phaser.AUTO,
  width: 450,
  height: 800,
  scene: { preload, create, update },
};

const game = new Phaser.Game(config);

let graphics;

const initDelay = 2000;
const decreseFactor = 1.002;
let gameOverDelay = initDelay;

let scoreText;
let bestScoreText;
let score = 0;
let bestScore = 0;

let cookieImage;

let gameOver = false;
let gameOverText;
let clickToRestartText;

const respawnCookie = () => {
  halfW = cookieImage.displayWidth / 2;
  halfH = cookieImage.displayHeight / 2;
  const x = getRandomInt(halfW, config.width - halfW);
  const y = getRandomInt(halfH, config.height - halfH);
  cookieImage.setPosition(x, y);
};

const updateScoreText = () => {
  scoreText.setText(score.toString());
  scoreText.setPosition(config.width / 2 - scoreText.displayWidth / 2, 10);
};

const getRandomInt = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
};

const restart = () => {
  score = 0;
  gameOverDelay = initDelay;
  updateScoreText();
  respawnCookie();
  cookieImage.setVisible(true);
  gameOverText.setVisible(false);
  clickToRestartText.setVisible(false);
  gameOver = false;
};

const updateBestScore = () => {};

function preload() {
  this.load.setPath('assets/');
  this.load.image('cookie', 'cookie.png');
}

function create() {
  this.input.on('pointerdown', () => {
    if (gameOver) {
      restart();
    }
  });

  graphics = this.add.graphics();

  cookieImage = this.add.image(0, 0, 'cookie').setInteractive();
  cookieImage.setScale(0.1);
  cookieImage.on('pointerdown', () => {
    score += 1;
    gameOverDelay = initDelay / Math.pow(decreseFactor, score);
    updateScoreText();
    respawnCookie();
  });

  respawnCookie();

  scoreText = this.add.text(0, 0, score.toString(), {
    fontFamily: 'Open Sans',
    fontSize: '64px',
  });
  updateScoreText();

  gameOverText = this.add.text(0, 0, 'GAME OVER', {
    fontFamily: 'Open Sans',
    fontSize: '64px',
  });
  gameOverText.setPosition(
    config.width / 2 - gameOverText.displayWidth / 2,
    config.height / 2 - gameOverText.displayHeight
  );
  gameOverText.setVisible(false);

  clickToRestartText = this.add.text(0, 0, 'CLICK TO RESTART', {
    fontFamily: 'Open Sans',
    fontSize: '32px',
    align: 'center',
  });
  clickToRestartText.setPosition(
    config.width / 2 - clickToRestartText.displayWidth / 2,
    config.height / 2
  );
  clickToRestartText.setVisible(false);
}

function update(time, delta) {
  gameOverDelay -= delta;

  const heightFactor = Phaser.Math.Clamp(gameOverDelay / initDelay, 0, 1);
  rectHeight = heightFactor * config.height;

  graphics.clear();

  graphics.fillStyle(0x6cbec7, 1);
  graphics.fillRect(0, 0, config.width, config.height);

  graphics.fillStyle(0x81dae3, 1);
  graphics.fillRect(0, config.height - rectHeight, config.width, rectHeight);

  if (!gameOver && gameOverDelay <= 0) {
    gameOver = true;
  }

  if (gameOver) {
    cookieImage.setVisible(false);
    gameOverText.setVisible(true);
    clickToRestartText.setVisible(true);
  }
}
