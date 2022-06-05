import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_11L extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_11L',
      {
        hasLeft: true,
        hasRight: true,
        hasBottom: true,
      },
      {
        up: 'dungeon:room_10L',
      },
      generateNextRoomData({
        up: 0,
      })
    );
  }

  create() {
    super.create();

    handleNextRoomArrows(this.key, this, this.screen, this.nextRoom, {});
  }

  update() {
    super.update();
  }
}
