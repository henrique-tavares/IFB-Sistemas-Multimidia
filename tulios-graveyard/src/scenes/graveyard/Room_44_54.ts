import 'phaser';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_44_54 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_44_54',
      {
        hasBottom: true,
      },
      {
        up: 'graveyard:room_34',
        right: ['graveyard:room_45', 'graveyard:room_55'],
        left: ['graveyard:room_43', 'graveyard:room_52_53'],
      },
      generateNextRoomData({
        up: {
          mode: 'single',
        },
        right: {
          mode: 'double',
          offsets: [0, -100],
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
