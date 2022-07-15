import "phaser";
import {
  addCustomBounds,
  generateCustomBounds,
  generateNextRoomData,
  handleNextRoomArrows,
} from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_15 extends BaseRoom {
  static key = "dungeon:room_15";

  constructor() {
    super(
      Room_15.key,
      {
        hasBottom: true,
      },
      {
        up: "dungeon:room_16",
        left: "dungeon:room_14L",
        right: "dungeon:room_13R",
      },
      generateNextRoomData({
        up: 0,
        left: -100,
        right: -100,
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
          left: 0,
          right: 0,
        }
      )
    );

    handleNextRoomArrows(this.key, this, this.screen, this.nextRoom, {
      left: 1,
      right: 1,
    });
  }

  update() {
    super.update();
  }
}
