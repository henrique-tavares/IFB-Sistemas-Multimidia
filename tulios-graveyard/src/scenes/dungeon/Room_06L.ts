import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_06L extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_06L',
      {
        hasTop: true,
        hasLeft: true,
      },
      {
        down: 'dungeon:room_07L',
        right: 'dungeon:room_05L',
      },
      generateNextRoomData({
        down: -100,
        right: 50
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
