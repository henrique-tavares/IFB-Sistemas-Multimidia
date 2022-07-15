import "phaser";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_08R extends BaseRoom {
  static key = "dungeon:room_08R";

  constructor() {
    super(
      Room_08R.key,
      {},
      {
        up: "dungeon:room_05R",
        left: "dungeon:room_06R",
        right: "dungeon:room_07R",
        down: "dungeon:room_09R",
      },
      generateNextRoomData({
        up: 0,
        down: 0,
        left: -100,
        right: -100,
      })
    );
  }

  create() {
    super.create();

    handleNextRoomArrows(this.key, this, this.screen, this.nextRoom, {
      left: -1,
      right: -1,
    });
  }

  update() {
    super.update();
  }
}
