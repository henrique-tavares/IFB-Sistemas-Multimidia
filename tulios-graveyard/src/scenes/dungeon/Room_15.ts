import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_15 extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_15',
      {
        hasBottom: true,
      },
      {
        up: 'dungeon:room_16',
        left: 'dungeon:room_14L',
        right: 'dungeon:room_13R',
      },
      generateNextRoomData({
        up: 0,
        left: -100,
        right: -100
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
