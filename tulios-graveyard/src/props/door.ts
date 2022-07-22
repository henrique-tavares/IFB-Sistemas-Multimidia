import BaseProp from './baseProp';

export default class Door extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number, variant: 1 | 2 | 3, destiny: string) {
    super(scene, x, y, `graveyard:door-${variant}`, destiny);

    this.resize({
      width: 1,
      height: 1,
    });

    this.setOrigin(0.52, 0.5);
  }
}
