import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class room_02 extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_02',
      {
        hasBottom: true,
        hasLeft: true,
        hasRight: true,
      },
      {
        up: 'dungeon:room_01',
      },
      generateNextRoomData({
        up: 50,
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
