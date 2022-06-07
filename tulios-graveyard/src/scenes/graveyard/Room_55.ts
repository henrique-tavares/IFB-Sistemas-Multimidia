import 'phaser';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_55 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_55',
      {
        hasBottom: true,
      },
      {
        up: 'graveyard:room_45',
        right: 'graveyard:room_56_57',
        left: 'graveyard:room_44_54',
      },
      generateNextRoomData({
        up: {
          mode: 'single',
        },
        right: {
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
  }

  update() {
    super.update();
  }
}
