import 'phaser';
import { generateNextRoomData } from '../../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_04_14 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_04_14',
      {
        hasTop: true,
      },
      {
        right: ['graveyard:room_05', 'graveyard:room_15'],
        left: ['graveyard:room_02_03', 'graveyard:room_13'],
        down: 'graveyard:room_04',
      },
      generateNextRoomData({
        right: {
          mode: 'double',
          offsets: [0, 0],
        },
        down: {
          mode: 'single',
        },
        left: {
          mode: 'double',
          offsets: [0, 0],
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
