import 'phaser';
import { RoomDifficulty, RoomSize } from '../../types';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_20_30 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_20_30',
      {
        hasLeft: true,
      },
      {
        up: 'graveyard:room_10',
        right: ['graveyard:room_21', 'graveyard:room_31_32'],
        down: 'graveyard:room_40_50_41_51',
      },
      generateNextRoomData({
        up: {
          mode: 'single',
        },
        right: {
          mode: 'double',
          offsets: [0, -100],
        },
        down: {
          mode: 'single',
        },
      }),
      RoomSize['2x1'],
      RoomDifficulty.Easy
    );
  }

  create() {
    super.create();

    super.generateRandomProps(10);
  }

  update() {
    super.update();
  }
}
