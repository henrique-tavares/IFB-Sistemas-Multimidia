import 'phaser';
import { generateNextRoomData } from '../../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_00 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_13',
      {},
      {
        up: 'graveyard:room_02_03',
        right: 'graveyard:room_04_14',
        left: 'graveyard:room_12',
        down: 'graveyard:room_23_33',
      },
      generateNextRoomData({
        up: {
          mode: 'single',
          offset: 50,
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
