import 'phaser';
import BaseRoom from './baseRoom';

export default class Room_00 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_00',
      {
        top: 8,
        left: 6,
      },
      {
        right: 'graveyerd:room_01',
        down: 'graveyard:room_10',
      }
    );
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
