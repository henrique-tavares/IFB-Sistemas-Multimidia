import BaseProp from './baseProp';

export default class Tombstone extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number, variant: 1 | 2 | 3) {
    super(scene, x, y, `graveyard:tombstone-${variant}`);

    this.setScale(1.5)
      .refreshBody()
      .setSize(this.displayWidth, this.displayHeight * 0.4)
      .setOffset(0, this.displayHeight * 0.6);
  }
}
