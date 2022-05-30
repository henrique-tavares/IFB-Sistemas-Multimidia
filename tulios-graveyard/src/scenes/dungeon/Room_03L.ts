import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class room_03L extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_03L',
      {
        hasTop: true,
        hasBottom: true,
      },
      {
        left: 'dungeon:room_04L',
        right: 'dungeon:room_01',
      },
      generateNextRoomData({
        left: 0,
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
