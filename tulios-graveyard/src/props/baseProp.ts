export default abstract class BaseProp extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, `prop:${texture}`);

    scene.add.existing(this);
    scene.physics.add.existing(this, true);
  }

  relativeX(x: number) {
    return (this.displayWidth * x) / 100;
  }

  relativeY(y: number) {
    return (this.displayWidth * y) / 100;
  }

  rescale(scale: number) {
    this.setScale(scale).refreshBody();
  }

  resize({ width = 1, height = 1 }: { width?: number; height?: number }) {
    this.setSize(this.displayWidth * width, this.displayHeight * height);
  }

  offset({ x = 0, y = 0 }: { x?: number; y?: number }) {
    this.setOffset(this.displayWidth * x, this.displayHeight * y);
  }
}
