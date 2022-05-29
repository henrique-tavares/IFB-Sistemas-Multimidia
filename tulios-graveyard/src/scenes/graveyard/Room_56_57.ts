import 'phaser';
import { generateNextRoomData } from '../../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_56_57 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_56_57',
      {
        hasBottom: true,
        hasRight: true,
      },
      {
        up: ['graveyard:room_46', 'graveyard:room_47'],
        left: 'graveyard:room_55',
      },
      generateNextRoomData({
        up: {
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
