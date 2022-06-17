import 'phaser';
import { RoomSize } from '../../types';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_47 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_47',
      {
        hasRight: true,
      },
      {
        up: 'graveyard:room_37',
        down: 'graveyard:room_56_57',
        left: 'graveyard:room_46',
      },
      generateNextRoomData({
        up: {
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
  }

  update() {
    super.update();
  }
}
