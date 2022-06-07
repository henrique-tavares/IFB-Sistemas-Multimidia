import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_04L extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_04L',
      {
        hasTop: true,
        hasLeft: true,
      },
      {
        right: 'dungeon:room_03L',
        down: 'dungeon:room_05L',
      },
      generateNextRoomData({
        down: 0,
        right: 0,
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
