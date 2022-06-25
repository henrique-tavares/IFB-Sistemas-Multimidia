import 'phaser';
import { RoomDifficulty, RoomSize } from '../../types';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_13 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_13',
      {},
      {
        up: 'graveyard:room_02_03',
        right: 'graveyard:room_04_14',
        left: 'graveyard:room_12',
        down: 'graveyard:room_23_33',
      },
      generateNextRoomData({
        up: {
          mode: 'single',
          offset: 50,
        },
        right: {
          mode: 'single',
          offset: 50,
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
