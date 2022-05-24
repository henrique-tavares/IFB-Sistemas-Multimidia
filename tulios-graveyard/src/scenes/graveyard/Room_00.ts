import 'phaser';
import BaseRoom from './baseRoom';

export default class Room_00 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_00',
      {
        hasTop: true,
        hasLeft: true,
      },
      {
        right: 'graveyard:room_01',
        down: 'graveyard:room_10',
      },
      {
        right: {
          x: {
            relative: true,
            value: 0,
          },
          y: {
            relative: false,
          },
        },
        down: {
          x: {
            relative: false,
          },
          y: {
            relative: true,
            value: 0,
          },
        },
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
