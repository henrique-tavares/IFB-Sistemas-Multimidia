import 'phaser';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_15 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_15',
      {},
      {
        up: 'graveyard:room_05',
        right: 'graveyard:room_06_07_16_17',
        left: 'graveyard:room_04_14',
        down: 'graveyard:room_25',
      },
      generateNextRoomData({
        up: {
          mode: 'single',
        },
        right: {
          mode: 'single',
          offset: 50,
        },
        down: {
          mode: 'single',
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

    super.generateRandomProps(5);
  }

  update() {
    super.update();
  }
}
