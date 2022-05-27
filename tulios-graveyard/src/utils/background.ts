import { BackgroundBorder, BackgroundBorderConfig } from '../types';
import Screen from './screen';

export default class Background {
  readonly image: Phaser.GameObjects.Image;
  readonly bounds: Phaser.Geom.Rectangle | null = null;
  readonly border: BackgroundBorder;

  constructor(scene: Phaser.Scene, key: string, borderConfig?: BackgroundBorder) {
    this.image = scene.add.image(0, 0, key).setOrigin(0);
    scene.cameras.main.setBounds(0, 0, this.image.width, this.image.height, true);
    this.border = borderConfig ?? {};

    if (borderConfig) {
      this.bounds = this.setBounds();
    }
  }

  private setBounds(): Phaser.Geom.Rectangle {
    const x = (this.image.width * (this.border.left ?? 0)) / 100;
    const y = (this.image.height * (this.border.top ?? 0)) / 100;
    const width = this.image.width - x;
    const height = this.image.height - y;

    return new Phaser.Geom.Rectangle(x, y, width, height);
  }

  applyBoundsOnSprite(sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    sprite.body.setBoundsRectangle(this.bounds);
  }
}
