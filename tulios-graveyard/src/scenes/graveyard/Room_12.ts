import 'phaser';
import { RoomSize } from '../../types';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_12 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_12',
      {},
      {
        up: 'graveyard:room_02_03',
        right: 'graveyard:room_13',
        left: 'graveyard:room_11',
        down: 'graveyard:room_22',
      },
      generateNextRoomData({
        up: {
          mode: 'single',
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
      RoomSize['1x1']
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
