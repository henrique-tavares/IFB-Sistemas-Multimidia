import BaseProp from './baseProp';

export default class Tree extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number, variant: 1 | 2 | 3) {
    super(scene, x, y, `graveyard:tree-${variant}`);

    this.resize({
      width: 0.2,
      height: 0.1,
    });

    this.origin(0.5, 0.95);
  }
}
