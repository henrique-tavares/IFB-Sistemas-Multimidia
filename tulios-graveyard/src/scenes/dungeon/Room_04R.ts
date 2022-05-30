import 'phaser';
import { generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_04R extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_04R',
      {
        hasTop: true,
        hasRight: true,
      },
      {
        left: 'dungeon:room_03R',
        down: 'dungeon:room_05R',
      },
      generateNextRoomData({
        down: 0,
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
