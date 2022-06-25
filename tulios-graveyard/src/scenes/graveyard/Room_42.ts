import 'phaser';
import { RoomDifficulty, RoomSize } from '../../types';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_42 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_42',
      {},
      {
        up: 'graveyard:room_31_32',
        right: 'graveyard:room_43',
        down: 'graveyard:room_52_53',
        left: 'graveyard:room_40_50_41_51',
      },
      generateNextRoomData({
        up: {
          mode: 'single',
          offset: 50,
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
      }),
      RoomSize['1x1'],
      RoomDifficulty.Medium
    );
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
