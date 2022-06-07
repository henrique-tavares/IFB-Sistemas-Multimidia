import 'phaser';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_26 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_26',
      {},
      {
        up: 'graveyard:room_06_07_16_17',
        right: 'graveyard:room_27',
        down: 'graveyard:room_35_36',
        left: 'graveyard:room_25',
      },
      generateNextRoomData({
        up: {
          mode: 'single',
        },
        right: {
          mode: 'single',
        },
        down: {
          mode: 'single',
          offset: 50,
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
