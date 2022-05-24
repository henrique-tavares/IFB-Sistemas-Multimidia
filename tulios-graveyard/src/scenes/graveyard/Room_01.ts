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
      },
      {
        left: {
          x: {
            relative: true,
            value: 100,
          },
          y: {
            relative: false,
          },
        },
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
