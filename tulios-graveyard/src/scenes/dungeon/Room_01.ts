import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_01 extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_01',
      {},
      {
        up: 'dungeon:room_00',
        left: 'dungeon:room_03L',
        right: 'dungeon:room_03R',
        down: 'dungeon:room_02',
      },
      generateNextRoomData({
        up: -100,
        down: -100,
        left: 0,
        right: 0
      })
    );
  }

  create() {
    super.create();

    // custom border in progress
    // this.add.rectangle(this.screen.relativeX(0), this.screen.relativeY(0), this.screen.width + 50, 50, 0x000);

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
