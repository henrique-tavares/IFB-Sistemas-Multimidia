import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_16 extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_16',
      {
        hasLeft: true,
      },
      {
        up: 'dungeon:room_18',
        down: 'dungeon:room_15',
        right: 'dungeon:room_17',
      },
      generateNextRoomData({
        up: 25,
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
