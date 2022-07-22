import BaseProp from './baseProp';

export default class StoneCoffin extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, `graveyard:stone-coffin`);

    this.resize({
      width: 0.97,
      height: 0.62,
    });

    this.setOrigin(0.5, 0.65);
  }
}
