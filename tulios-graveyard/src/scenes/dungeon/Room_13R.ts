import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_13R extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_13R',
      {
        hasTop: true,
        hasBottom: true,
      },
      {
        left: 'dungeon:room_15',
        right: 'dungeon:room_11R',
      },
      generateNextRoomData({
        left: 50,
        right: 0
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
