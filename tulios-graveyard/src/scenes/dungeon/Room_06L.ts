import 'phaser';
import { addCustomBounds, generateCustomBounds, generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_06L extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_06L',
      {
        hasTop: true,
        hasLeft: true,
      },
      {
        down: 'dungeon:room_07L',
        right: 'dungeon:room_05L',
      },
      generateNextRoomData({
        down: 0,
        right: 50
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
          down: 50,
        }
      )
    );

    handleNextRoomArrows(this.key, this, this.screen, this.nextRoom, {
      down: -1
    });
  }

  update() {
    super.update();
  }
}
