import 'phaser';
import BaseRoom from './baseRoom';

export default class Room_00 extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_00',
      {
        hasTop: true,
        hasLeft: true,
        hasRight: true,
      },
      {
        down: 'dungeon:room_01',
      },
      {
        down: {
          x: {
            relative: false,
          },
          y: {
            relative: true,
            value: 20,
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
