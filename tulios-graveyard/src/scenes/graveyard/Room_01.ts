import 'phaser';
import BaseRoom from './baseRoom';

export default class Room_01 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_01',
      {
        hasTop: true,
      },
      {
        left: 'graveyard:room_00',
        right: 'graveyerd:room_02_03',
        down: 'graveyard:room_11',
      }
    );
  }

  create() {
    this.input.keyboard.resetKeys();
    super.create();
  }

  update() {
    super.update();
  }
}
