import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_17 extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_17',
      {
        hasTop: true,
        hasBottom: true,
        hasRight: true,
      },
      {
        left: 'dungeon:room_16',
      },
      generateNextRoomData({
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
