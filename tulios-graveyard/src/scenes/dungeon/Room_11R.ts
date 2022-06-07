import 'phaser';
import { addCustomBounds, generateCustomBounds, generateNextRoomData, handleNextRoomArrows } from '../utils/dungeon';
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

    addCustomBounds(
      this.player.sprite,
      this,
      this.screen,
      generateCustomBounds(
        this.screen,
        {
          top: this.topPadding,
          bottom: this.bottomPadding,
          horizontal: this.horizontalPadding,
        },
        {
          up: 0,
          down: 0,
        }
      )
    );

    handleNextRoomArrows(this.key, this, this.screen, this.nextRoom, {
      up: 1,
      down: 1,
    });
  }

  update() {
    super.update();
  }
}
