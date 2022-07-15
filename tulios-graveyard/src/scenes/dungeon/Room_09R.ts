import "phaser";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_09R extends BaseRoom {
  static key = "dungeon:room_09R";

  constructor() {
    super(
      Room_09R.key,
      {
        hasLeft: true,
        hasRight: true,
      },
      {
        up: "dungeon:room_08R",
        down: "dungeon:room_10R",
      },
      generateNextRoomData({
        up: 0,
        down: 0,
      })
    );
  }

  create() {
    super.create();

    handleNextRoomArrows(this.key, this, this.screen, this.nextRoom, {});
  }

  update() {
    super.update();
  }
}
