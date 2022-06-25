import 'phaser';
import { RoomDifficulty, RoomSize } from '../../types';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_45 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_45',
      {},
      {
        up: 'graveyard:room_35_36',
        right: 'graveyard:room_46',
        down: 'graveyard:room_55',
        left: 'graveyard:room_44_54',
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
