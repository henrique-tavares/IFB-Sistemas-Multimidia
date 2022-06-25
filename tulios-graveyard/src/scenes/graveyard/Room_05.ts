import 'phaser';
import { RoomDifficulty, RoomSize } from '../../types';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_05 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_05',
      {
        hasTop: true,
      },
      {
        right: 'graveyard:room_06_07_16_17',
        left: 'graveyard:room_04_14',
        down: 'graveyard:room_15',
      },
      generateNextRoomData({
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
      RoomDifficulty.Easy
    );
  }

  create() {
    super.create();

    super.generateRandomProps(6);
  }

  update() {
    super.update();
  }
}
