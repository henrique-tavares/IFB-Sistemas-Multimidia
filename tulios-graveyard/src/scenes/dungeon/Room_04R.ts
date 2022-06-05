import 'phaser';
import { addCustomBounds, generateCustomBounds, generateNextRoomData, handleNextRoomArrows } from '../../utils/dungeon';
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
        left: 0,
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
