import BaseProp from './baseProp';

export default class BlueChest extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, `graveyard:blue-chest`);

    this.resize({
      width: 0.9,
      height: 0.8,
    });
  }
}
