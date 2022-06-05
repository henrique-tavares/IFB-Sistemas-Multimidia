import { addCustomBounds, generateCustomBounds, generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
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
    
    addCustomBounds(
      this.player.sprite, 
      this,
      this.screen,
      generateCustomBounds(
        this.screen, 
        {
          top: this.topPadding,
          bottom: this.bottomPadding, 
          horizontal: this.horizontalPadding
        },
        {
          up: 0,
          down: 0
        }
      )
    );
    
    handleNextRoomArrows(this.key, this, this.screen, this.nextRoom, {
      up: 1,
      down: 1
    });
  }

  update() {
    super.update();
  }
}
