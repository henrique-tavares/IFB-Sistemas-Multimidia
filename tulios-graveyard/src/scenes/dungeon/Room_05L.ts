import 'phaser';
import { addCustomBounds, generateCustomBounds, generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_05L extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_05L',
      {
        hasRight: true,
        hasBottom: true,
      },
      {
        up: 'dungeon:room_04L',
        left: 'dungeon:room_06L',
      },
      generateNextRoomData({
        up: 0,
        left: -100,
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
          left: 0,
        }
      )
    );

    handleNextRoomArrows(this.key, this, this.screen, this.nextRoom, {
      left: 1
    });
  }

  update() {
    super.update();
  }
}
