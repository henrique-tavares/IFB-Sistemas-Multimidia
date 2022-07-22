import BaseProp from './baseProp';

export default class HangingLight extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, `graveyard:hanging-light`);

    this.resize({
      width: 0.1,
      height: 0.1,
    });
    
    this.setOrigin(0.5, 0);
  }
}
