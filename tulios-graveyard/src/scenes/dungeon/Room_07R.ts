import 'phaser';
import { addCustomBounds, generateCustomBounds, generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
import BaseRoom from './baseRoom';

export default class Room_07R extends BaseRoom {
  constructor() {
    super(
      'dungeon:room_07R',
      {
        hasTop: true,
        hasRight: true,
        hasBottom: true,
      },
      {
        left: 'dungeon:room_08R',
      },
      generateNextRoomData({
        left: 50,
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
          right: 50
        }
      )
    );

    handleNextRoomArrows(this.key, this, this.screen, this.nextRoom, {});
  }

  update() {
    super.update();
  }
}
