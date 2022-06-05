import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_12L extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_12L',
      {
        hasTop: true,
        hasRight: true,
      },
      {
        left: 'dungeon:room_10L',
        down: 'dungeon:room_13L',
      },
      generateNextRoomData({
        down: 0,
        left: 0,
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
