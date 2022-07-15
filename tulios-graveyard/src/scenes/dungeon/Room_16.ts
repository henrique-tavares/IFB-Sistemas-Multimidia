import "phaser";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_16 extends BaseRoom {
  static key = "dungeon:room_16";

  constructor() {
    super(
      Room_16.key,
      {
        hasLeft: true,
      },
      {
        up: "dungeon:room_18",
        down: "dungeon:room_15",
        right: "dungeon:room_17",
      },
      generateNextRoomData({
        up: 25,
        down: 0,
        right: 0,
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