import BaseProp from './baseProp';

export default class Sofa extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, `graveyard:sofa`);

    this.resize({
      width: 1,
      height: 0.55,
    });

    this.setOrigin(0.5, 0.7);
  }
}
