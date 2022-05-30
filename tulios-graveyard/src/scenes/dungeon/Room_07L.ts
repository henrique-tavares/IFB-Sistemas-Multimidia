import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_07L extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_07L',
      {
        hasRight: true,
      },
      {
        up: 'dungeon:room_06L',
        left: 'dungeon:room_08L',
        down: 'dungeon:room_09L',
      },
      generateNextRoomData({
        up: 50,
        down: 0,
        left: -100,
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
