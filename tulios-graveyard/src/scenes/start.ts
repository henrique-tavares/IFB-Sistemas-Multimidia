import 'phaser';
import Direction from '../utils/direction';
import Tulio from '../utils/tulio';

export default class Start extends Phaser.Scene {
  player: Tulio;
  direction: Direction;

  constructor() {
    super('start');
  }

  preload() {
    Tulio.loadSpritesheet(this);
  }

  create() {
    this.player = new Tulio(this);
    this.player.sprite.setCollideWorldBounds(true);
    this.player.sprite.setScale(2);

    this.direction = new Direction(this);
  }

  update() {
    this.player.handleSpriteAnimation(this.direction);
  }
}
