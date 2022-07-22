import BaseProp from './baseProp';

export default class Box extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, `graveyard:box`);
  }
}
