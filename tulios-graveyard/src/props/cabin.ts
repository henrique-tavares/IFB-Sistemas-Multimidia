import BaseProp from './baseProp';

export default class Cabin extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'graveyard:cabin');

    this.resize({
      height: 0.4,
      width: 0.925,
    });
    this.setOrigin(0.5, 0.75);

    this.addExtraArea(
      new Phaser.GameObjects.Rectangle(
        scene,
        this.x + this.relativeX(3),
        this.y + this.relativeY(27),
        this.relativeX(20),
        this.relativeY(7),
        0x000,
        0
      ),
      new Phaser.GameObjects.Rectangle(
        scene,
        this.x + this.relativeX(3),
        this.y + this.relativeY(27),
        this.relativeX(30),
        this.relativeY(100),
        0x000,
        0
      ).setOrigin(0.5, 0.05),
      (player, door) => {
        // TODO: Go to cabin interior
      }
    );
  }
}
