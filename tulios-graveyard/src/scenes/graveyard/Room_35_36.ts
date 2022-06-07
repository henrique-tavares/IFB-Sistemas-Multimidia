import 'phaser';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_35_36 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_35_36',
      {},
      {
        up: ['graveyard:room_25', 'graveyard:room_26'],
        right: 'graveyard:room_37',
        down: ['graveyard:room_45', 'graveyard:room_46'],
        left: 'graveyard:room_34',
      },
      generateNextRoomData({
        up: {
          mode: 'double',
          offsets: [0, -100],
        },
        right: {
          mode: 'single',
        },
        down: {
          mode: 'double',
          offsets: [0, -100],
        },
        left: {
          mode: 'single',
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
