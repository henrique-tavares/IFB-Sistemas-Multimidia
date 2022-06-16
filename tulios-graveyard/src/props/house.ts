import BaseProp from './baseProp';

export default class House extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'graveyard:house');

    this.resize({
      width: 0.82,
      height: 0.5,
    });

    this.setOrigin(0.495, 0.57);

    scene.events.emit(
      'add-extra-hitbox',
      new Phaser.GameObjects.Rectangle(
        scene,
        this.x + this.relativeX(27),
        this.y + this.relativeY(26.5),
        this.relativeX(28),
        this.relativeY(10),
        0x000,
        0
      )
    );
  }
}
