import 'phaser';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_52_53 extends BaseRoom {
  constructor() {
    super(
      'graveyard:room_52_53',
      {
        hasBottom: true,
      },
      {
        up: ['graveyard:room_42', 'graveyard:room_43'],
        right: 'graveyard:room_44_54',
        left: 'graveyard:room_40_50_41_51',
      },
      generateNextRoomData({
        up: {
          mode: 'double',
          offsets: [0, -100],
        },
        right: {
          mode: 'single',
          offset: 50,
        },
        left: {
          mode: 'single',
          offset: 50,
        },
      })
    );
  }

  create() {
    super.create();

    super.generateRandomProps(10);
  }

  update() {
    super.update();
  }
}
