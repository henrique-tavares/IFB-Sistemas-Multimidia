import { BackgroundBorder } from '../types';

export default class Background {
  readonly image: Phaser.GameObjects.Image;
  readonly bounds: Phaser.Geom.Rectangle | null = null;
  readonly border: BackgroundBorder;

  constructor(scene: Phaser.Scene, key: string, borderConfig?: BackgroundBorder) {
    this.image = scene.add.image(0, 0, key).setOrigin(0);
    scene.cameras.main.setBounds(0, 0, this.image.width, this.image.height, true);
    this.border = borderConfig ?? {};

    this.bounds = this.setBounds();
  }

  private setBounds(): Phaser.Geom.Rectangle {
    const xl = (800 * this.border?.left) / 100;
    const yl = (600 * this.border?.top) / 100;
    const xr = (800 * this.border?.right) / 100;
    const yr = (600 * this.border?.bottom) / 100;

    const width = this.image.width - xl - xr;
    const height = this.image.height - yl - yr;

    return new Phaser.Geom.Rectangle(xl, yl, width, height);
  }

  applyBoundsOnSprite(sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    sprite.body.setBoundsRectangle(this.bounds);
  }
}
