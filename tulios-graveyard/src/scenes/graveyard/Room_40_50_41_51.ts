import 'phaser';
import { RoomDifficulty, RoomSize } from '../../types';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_40_50_41_51 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_40_50_41_51',
      {
        hasLeft: true,
        hasBottom: true,
      },
      {
        up: ['graveyard:room_20_30', 'graveyard:room_31_32'],
        right: ['graveyard:room_42', 'graveyard:room_52_53'],
      },
      generateNextRoomData({
        up: {
          mode: 'double',
          offsets: [0, -50],
        },
        right: {
          mode: 'double',
          offsets: [0, 0],
        },
      }),
      RoomSize['2x2'],
      RoomDifficulty.Medium
    );
  }

  create() {
    super.create();

    super.generateRandomProps(20);
  }

  update() {
    super.update();
  }
}
