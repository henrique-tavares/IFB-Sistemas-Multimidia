import BaseProp from './baseProp';

export default class HomeLamp extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, `graveyard:home-lamp`);

    this.resize({
      width: 0.75,
      height: 0.18,
    });

    this.setOrigin(0.5, 0.82);
  }
}
