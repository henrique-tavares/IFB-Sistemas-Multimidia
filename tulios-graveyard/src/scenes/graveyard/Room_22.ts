import 'phaser';
import { RoomSize } from '../../types';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_22 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_22',
      {},
      {
        up: 'graveyard:room_12',
        right: 'graveyard:room_23_33',
        down: 'graveyard:room_31_32',
        left: 'graveyard:room_21',
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
          offset: 50,
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
