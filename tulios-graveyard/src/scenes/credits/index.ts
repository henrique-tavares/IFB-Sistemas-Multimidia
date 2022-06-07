import 'phaser';
import Screen from '../utils/screen';

export default class Credits extends Phaser.Scene {
  screen: Screen;

  bg: Phaser.GameObjects.Image;

  constructor() {
    super('start');
  }

  preload() {
    this.load.image('background', 'assets/title_screen/background.png');
  }

  create() {
    this.screen = new Screen(this.scale.width, this.scale.height);

    this.bg = this.add.image(0, 0, 'background').setOrigin(0.5);
    this.bg
      .setScale(this.screen.height / this.bg.height)
      .setPosition(this.screen.relativeX(50), this.screen.relativeY(50));
  }

  update() {}
}
