import 'phaser';
import { RoomSize } from '../../types';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_11 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_11',
      {},
      {
        up: 'graveyard:room_01',
        right: 'graveyard:room_12',
        left: 'graveyard:room_10',
        down: 'graveyard:room_21',
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
