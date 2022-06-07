import 'phaser';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_27 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_27',
      {
        hasRight: true,
      },
      {
        up: 'graveyard:room_06_07_16_17',
        down: 'graveyard:room_37',
        left: 'graveyard:room_26',
      },
      generateNextRoomData({
        up: {
          mode: 'single',
          offset: 50,
        },
        down: {
          mode: 'single',
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
