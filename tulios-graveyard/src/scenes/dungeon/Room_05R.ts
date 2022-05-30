import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_05R extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_05R',
      {
        hasLeft: true,
        hasRight: true,
      },
      {
        up: 'dungeon:room_04R',
        down: 'dungeon:room_08R',
      },
      generateNextRoomData({
        up: 0,
        down: 0,
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
