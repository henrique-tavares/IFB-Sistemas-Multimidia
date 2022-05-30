import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_18 extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_18',
      {
        hasTop: true,
        hasLeft: true,
        hasRight: true,
      },
      {
        down: 'dungeon:room_16',
      },
      generateNextRoomData({
        down: -100,
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
