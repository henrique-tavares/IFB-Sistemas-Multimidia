import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_11R extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_11R',
      {
        hasRight: true,
      },
      {
        up: 'dungeon:room_10R',
        left: 'dungeon:room_13R',
        down: 'dungeon:room_12R',
      },
      generateNextRoomData({
        up: -100,
        down: -100,
        left: 0,
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
