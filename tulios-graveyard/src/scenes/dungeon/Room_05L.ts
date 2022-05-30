import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_05L extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_05L',
      {
        hasRight: true,
        hasBottom: true,
      },
      {
        up: 'dungeon:room_04L',
        left: 'dungeon:room_06L',
      },
      generateNextRoomData({
        up: 50,
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
