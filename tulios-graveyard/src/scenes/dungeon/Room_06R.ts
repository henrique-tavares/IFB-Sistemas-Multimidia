import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_06R extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_06R',
      {
        hasTop: true,
        hasBottom: true,
        hasLeft: true,
      },
      {
        right: 'dungeon:room_08R',
      },
      generateNextRoomData({
        right: 50
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
