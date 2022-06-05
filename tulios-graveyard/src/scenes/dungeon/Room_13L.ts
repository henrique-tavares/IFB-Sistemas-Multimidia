import 'phaser';
import { addCustomBounds, generateCustomBounds, generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_13L extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_13L',
      {
        hasLeft: true,
        hasBottom: true,
      },
      {
        up: 'dungeon:room_12L',
        right: 'dungeon:room_14L',
      },
      generateNextRoomData({
        up: 0,
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
          right: 50,
        }
      )
    );

    handleNextRoomArrows(this.key, this, this.screen, this.nextRoom, {
      right: -1
    });
  }

  update() {
    super.update();
  }
}
