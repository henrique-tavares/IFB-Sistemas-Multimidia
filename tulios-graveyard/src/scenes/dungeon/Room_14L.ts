import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_14L extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_14L',
      {
        hasTop: true,
        hasBottom: true,
      },
      {
        left: 'dungeon:room_13L',
        right: 'dungeon:room_15',
      },
      generateNextRoomData({
        left: 0,
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
