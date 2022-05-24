import 'phaser';
import BaseRoom from './baseRoom';

export default class Room_01 extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_01',
      {
        hasTop: true,
        hasBottom: true,
      },
      {
        up: 'dungeon:room_00',
      },
      {
        up: {
          x: {
            relative: false,
          },
          y: {
            relative: true,
            value: 100,
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
