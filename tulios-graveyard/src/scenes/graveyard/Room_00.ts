import 'phaser';
import AudioHandler from '../../utils/audioHandler';
import Direction from '../../utils/direction';
import Tulio from '../../utils/tulio';

export default class Room_00 extends Phaser.Scene {
  player: Tulio;
  direction: Direction;

  constructor() {
    super('graveyard:room_00');
  }

  preload() {}

  create() {
    this.player = new Tulio(this);
    this.player.sprite.setCollideWorldBounds(true);
    this.player.sprite.setScale(2);

    this.direction = new Direction(this);

    const audioHandler = this.cache.custom['handlers'].get('audioHandler') as AudioHandler;
    audioHandler.handleBackgroundMusic(this);
  }

  update() {
    this.player.handleSpriteAnimation(this.direction);
  }
}
