import 'phaser';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_37 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_37',
      {
        hasRight: true,
      },
      {
        up: 'graveyard:room_27',
        down: 'graveyard:room_47',
        left: 'graveyard:room_35_36',
      },
      generateNextRoomData({
        up: {
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
