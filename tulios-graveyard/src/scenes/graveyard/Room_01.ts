import 'phaser';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_01 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_01',
      {
        hasTop: true,
      },
      {
        left: 'graveyard:room_00',
        right: 'graveyard:room_02_03',
        down: 'graveyard:room_11',
      },
      generateNextRoomData({
        left: {
          mode: 'single',
        },
        right: {
          mode: 'single',
        },
        down: {
          mode: 'single',
        },
      })
    );
  }

  create() {
    super.create();

    super.generateRandomProps(5);
  }

  update() {
    super.update();
  }
}
