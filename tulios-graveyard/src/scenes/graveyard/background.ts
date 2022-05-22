import { BackgroundBorder, BackgroundBorderConfig } from '../../types';
import Screen from '../../utils/screen';

export default class Background {
  bg: Phaser.GameObjects.Image;
  bounds: Phaser.Geom.Rectangle | null = null;
  border: BackgroundBorder;

  constructor(scene: Phaser.Scene, screen: Screen, key: string, borderConfig?: BackgroundBorder) {
    this.bg = scene.add.image(0, 0, key).setOrigin(0);
    this.bg.setScale(screen.heightRatio(this.bg.height));
    this.border = borderConfig ?? {};

    if (borderConfig) {
      this.bounds = this.setBounds(screen);
    }
  }

  private setBounds(screen: Screen): Phaser.Geom.Rectangle {
    const x = screen.relativeX(this.border.left ?? 0);
    const y = screen.relativeY(this.border.top ?? 0);
    const width = screen.width * (1 - ((this.border.left ?? 0) + (this.border.right ?? 0)) / 100);
    const height = screen.height * (1 - ((this.border.top ?? 0) + (this.border.bottom ?? 0)) / 100);

    return new Phaser.Geom.Rectangle(x, y, width, height);
  }

  applyBoundsOnSprite(sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    sprite.body.setBoundsRectangle(this.bounds);
  }
}
