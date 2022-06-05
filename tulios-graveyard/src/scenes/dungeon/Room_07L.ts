import 'phaser';
import { addCustomBounds, generateCustomBounds, generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_07L extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_07L',
      {
        hasRight: true,
      },
      {
        up: 'dungeon:room_06L',
        left: 'dungeon:room_08L',
        down: 'dungeon:room_09L',
      },
      generateNextRoomData({
        up: 0,
        down: 0,
        left: 0,
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
          left: 50,
        }
      )
    );

    handleNextRoomArrows(this.key, this, this.screen, this.nextRoom, {
      left: -1
    });
  }

  update() {
    super.update();
  }
}
