import BaseProp from './baseProp';

export default class Mausoleum extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'graveyard:mausoleum');

    this.rescale(1.25);

    this.resize({
      height: 0.5,
      width: 0.9,
    });

    this.setOrigin(0.5, 0.7);

    this.addExtraArea(
      new Phaser.GameObjects.Rectangle(
        scene,
        this.x + this.relativeX(0),
        this.y + this.relativeY(37.5),
        this.relativeX(25),
        this.relativeY(10),
        0x000,
        0
      ),
      new Phaser.GameObjects.Rectangle(
        scene,
        this.x + this.relativeX(0),
        this.y + this.relativeY(37.5),
        this.relativeX(35),
        this.relativeY(100),
        0x000,
        0
      ).setOrigin(0.5, 0.1),
      (_player, _door) => {
        this.scene.scene.start("graveyard:mausoleum");
      }
    );
  }
}
