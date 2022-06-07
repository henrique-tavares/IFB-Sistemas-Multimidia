import 'phaser';
import Start from './scenes/start';
import Graveyard from './scenes/graveyard';
import Dungeon from './scenes/dungeon';
import Preloader from './scenes/preloader';
import GUIScene from './scenes/gui';

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#000',
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
  scene: [Preloader, Start, GUIScene, ...Graveyard, ...Dungeon],
};

const game = new Phaser.Game(config);
