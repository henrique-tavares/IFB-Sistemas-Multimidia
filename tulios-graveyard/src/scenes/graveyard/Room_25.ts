import 'phaser';
import { generateNextRoomData } from '../../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_25 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_25',
      {},
      {
        up: 'graveyard:room_15',
        right: 'graveyard:room_26',
        down: 'graveyard:room_35_36',
        left: 'graveyard:room_24',
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
