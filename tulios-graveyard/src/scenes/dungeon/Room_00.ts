import 'phaser';
import { handleNextRoomArrows, generateNextRoomData } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_00 extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_00',
      {
        hasTop: true,
        hasLeft: true,
        hasRight: true,
      }, 
      {
        down: 'dungeon:room_01',
      },
      generateNextRoomData({down: 50})
    );
  }

  create() {
    super.create();

    // console.log("Room 00 - nextRoom", Object.entries(this.nextRoom));
    handleNextRoomArrows(this.key, this, this.screen, this.nextRoom, {});
  }

  update() {
    super.update();
  }
}
