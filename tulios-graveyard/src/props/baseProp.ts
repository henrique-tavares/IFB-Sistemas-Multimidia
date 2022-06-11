export default abstract class BaseProp extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, `prop:${texture}`);

    scene.add.existing(this);
    scene.physics.add.existing(this, true);
  }
}
