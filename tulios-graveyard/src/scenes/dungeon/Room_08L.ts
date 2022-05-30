import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_08L extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_08L',
      {
        hasTop: true,
        hasBottom: true,
        hasLeft: true,
      },
      {
        right: 'dungeon:room_07L',
      },
      generateNextRoomData({
        right: -50,
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
