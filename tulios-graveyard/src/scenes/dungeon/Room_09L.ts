import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_09L extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_09L',
      {
        hasLeft: true,
        hasRight: true,
      },
      {
        up: 'dungeon:room_07L',
        down: 'dungeon:room_10L',
      },
      generateNextRoomData({
        up: 0,
        down: 50,
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
