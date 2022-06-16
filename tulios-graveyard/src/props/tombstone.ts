import BaseProp from './baseProp';

export default class Tombstone extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number, variant: 1 | 2 | 3) {
    super(scene, x, y, `graveyard:tombstone-${variant}`);

    this.rescale(1.5);

    const resizeFactor: { [k in typeof variant]: { width?: number; height?: number } } = {
      1: {
        height: 0.45,
      },
      2: {
        height: 0.4,
      },
      3: {
        height: 0.65,
      },
    };

    const currentresizeFactor = resizeFactor[variant];

    this.resize(currentresizeFactor);

    this.origin(0.5, 1 - currentresizeFactor.height + currentresizeFactor.height / 2);
  }
}
