import 'phaser';
import Start from './scenes/start';

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#f9f9f9',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0,
      },
      debug: true,
    },
  },
  width: 800,
  height: 600,
  scene: Start,
};

const game = new Phaser.Game(config);
