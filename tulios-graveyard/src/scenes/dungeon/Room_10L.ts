import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_10L extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_10L',
      {
        hasLeft: true,
      },
      {
        up: 'dungeon:room_09L',
        down: 'dungeon:room_11L',
        right: 'dungeon:room_12L',
      },
      generateNextRoomData({
        up: 0,
        down: 0,
        right: 0
      })
    );
  }

  create() {
    super.create();

    handleNextRoomArrows(this.key, this, this.screen, this.nextRoom, 1);
    
    this.events.on('wake', this.wake, this);

    setTimeout(() => {
      this.physics.world.emit(`${this.key}:concluded`);
    }, 1000);
  }

  update() {
    super.update();
  }
}
