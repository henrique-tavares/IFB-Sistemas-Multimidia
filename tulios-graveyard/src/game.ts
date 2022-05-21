import 'phaser';
import Start from './scenes/start';
import Graveyard from './scenes/graveyard';
import Preloader from './utils/preloader';

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
  scale: {
    mode: Phaser.Scale.FIT,
    width: 800,
    height: 600,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Preloader, Start, ...Graveyard],
};

const game = new Phaser.Game(config);
