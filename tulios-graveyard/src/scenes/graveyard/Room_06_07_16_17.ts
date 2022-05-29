import 'phaser';
import { generateNextRoomData } from '../../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_06_07_16_17 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_06_07_16_17',
      {
        hasTop: true,
        hasRight: true,
      },
      {
        left: ['graveyard:room_05', 'graveyard:room_15'],
        down: ['graveyard:room_26', 'graveyard:room_27'],
      },
      generateNextRoomData({
        left: {
          mode: 'double',
          offsets: [0, -100],
        },
        down: {
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
