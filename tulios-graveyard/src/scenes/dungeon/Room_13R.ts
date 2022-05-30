import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_13R extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_13R',
      {
        hasTop: true,
        hasBottom: true,
      },
      {
        left: 'dungeon:room_03L',
        right: 'dungeon:room_03R',
      },
      generateNextRoomData({
        left: 50,
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
