import BaseProp from './baseProp';

export default class House extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'graveyard:house');

    this.resize({
      width: 0.82,
      height: 0.5,
    });

    this.offset({
      x: 0.08,
      y: 0.3,
    });

    scene.events.emit(
      'add-extra-hitbox',
      new Phaser.GameObjects.Rectangle(
        scene,
        this.x + this.relativeX(26),
        this.y + this.relativeY(32),
        this.relativeX(28),
        this.relativeY(12),
        0x000,
        0
      )
    );
  }
}
