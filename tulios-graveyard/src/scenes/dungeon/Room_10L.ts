import 'phaser';
import { addCustomBounds, generateCustomBounds, generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_10L extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_10L',
      {
        hasLeft: true,
      },
      {
        up: 'dungeon:room_09L',
        down: 'dungeon:room_11L',
        right: 'dungeon:room_12L',
      },
      generateNextRoomData({
        up: 0,
        down: 0,
        right: 0
      })
    );
  }

  create() {
    super.create();

    addCustomBounds(
      this.player.getSprite, 
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
          up: 50,
          down: 50,
        }
      )
    );

    handleNextRoomArrows(this.key, this, this.screen, this.nextRoom, {
      up: -1,
      down: -1
    });
  }

  update() {
    super.update();
  }
}
