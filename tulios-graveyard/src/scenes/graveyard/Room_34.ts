import 'phaser';
import { RoomDifficulty, RoomSize } from '../../types';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_34 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_34',
      {},
      {
        up: 'graveyard:room_24',
        right: 'graveyard:room_35_36',
        down: 'graveyard:room_44_54',
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
          offset: 50,
        },
      }),
      RoomSize['1x1'],
      RoomDifficulty.Medium
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
