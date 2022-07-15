import "phaser";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_10R extends BaseRoom {
  static key = "dungeon:room_10R";

  constructor() {
    super(
      Room_10R.key,
      {
        hasLeft: true,
        hasRight: true,
      },
      {
        up: "dungeon:room_09R",
        down: "dungeon:room_11R",
      },
      generateNextRoomData({
        up: 0,
        down: 50,
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
