import 'phaser';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_23_33 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_23_33',
      {},
      {
        up: 'graveyard:room_13',
        right: ['graveyard:room_24', 'graveyard:room_34'],
        down: 'graveyard:room_43',
        left: ['graveyard:room_22', 'graveyard:room_31_32'],
      },
      generateNextRoomData({
        up: {
          mode: 'single',
        },
        right: {
          mode: 'double',
          offsets: [0, -100],
        },
        down: {
          mode: 'single',
        },
        left: {
          mode: 'double',
          offsets: [0, -100],
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
