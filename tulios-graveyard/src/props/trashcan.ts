import BaseProp from './baseProp';

export default class Trashcan extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, `graveyard:trashcan`);

    this.resize({
      width: 0.85,
      height: 0.55,
    });

    this.setOrigin(0.5, 0.7);
  }
}
