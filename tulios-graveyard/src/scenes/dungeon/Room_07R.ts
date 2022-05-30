import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_07R extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_07R',
      {
        hasTop: true,
        hasRight: true,
        hasBottom: true,
      },
      {
        left: 'dungeon:room_08R',
      },
      generateNextRoomData({
        left: 50,
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
