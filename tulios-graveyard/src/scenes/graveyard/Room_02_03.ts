import 'phaser';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_02_03 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_02_03',
      {
        hasTop: true,
      },
      {
        left: 'graveyard:room_01',
        right: 'graveyard:room_04_14',
        down: ['graveyard:room_12', 'graveyard:room_13'],
      },

      generateNextRoomData({
        left: {
          mode: 'single',
        },
        right: {
          mode: 'single',
        },
        down: {
          mode: 'double',
          offsets: [0, -100],
        },
      })
    );
  }

  create() {
    super.create();

    super.generateRandomProps(10);
  }

  update() {
    super.update();
  }
}
