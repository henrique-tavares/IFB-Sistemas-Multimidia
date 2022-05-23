import Direction from '../../utils/direction';

export default class UiScene extends Phaser.Scene {
  constructor() {
    super('ui-scene');
  }

  create() {
    this.data.set('direction', new Direction(this));
  }
}
