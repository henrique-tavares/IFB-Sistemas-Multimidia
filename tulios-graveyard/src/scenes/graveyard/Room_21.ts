import 'phaser';
import { RoomSize } from '../../types';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_21 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_21',
      {},
      {
        up: 'graveyard:room_11',
        right: 'graveyard:room_22',
        down: 'graveyard:room_31_32',
        left: 'graveyard:room_20_30',
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
