import 'phaser';
import { RoomSize } from '../../types';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_24 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_24',
      {},
      {
        up: 'graveyard:room_04_14',
        right: 'graveyard:room_25',
        down: 'graveyard:room_34',
        left: 'graveyard:room_23_33',
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
