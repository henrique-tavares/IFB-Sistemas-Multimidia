import 'phaser';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_31_32 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_31_32',
      {},
      {
        up: ['graveyard:room_21', 'graveyard:room_22'],
        right: 'graveyard:room_23_33',
        down: ['graveyard:room_40_50_41_51', 'graveyard:room_42'],
        left: 'graveyard:room_20_30',
      },
      generateNextRoomData({
        up: {
          mode: 'double',
          offsets: [0, -100],
        },
        right: {
          mode: 'single',
          offset: 50,
        },
        down: {
          mode: 'double',
          offsets: [50, -100],
        },
        left: {
          mode: 'single',
          offset: 50,
        },
      })
    );
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
