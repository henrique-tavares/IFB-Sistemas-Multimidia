import 'phaser';
import { RoomDifficulty, RoomSize } from '../../types';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_46 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_46',
      {},
      {
        up: 'graveyard:room_35_36',
        right: 'graveyard:room_47',
        down: 'graveyard:room_56_57',
        left: 'graveyard:room_45',
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
      RoomDifficulty.Hard
    );
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
