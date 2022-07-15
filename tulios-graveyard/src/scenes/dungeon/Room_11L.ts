import "phaser";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_11L extends BaseRoom {
  static key = "dungeon:room_11L";

  constructor() {
    super(
      Room_11L.key,
      {
        hasLeft: true,
        hasRight: true,
        hasBottom: true,
      },
      {
        up: "dungeon:room_10L",
      },
      generateNextRoomData({
        up: 0,
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
