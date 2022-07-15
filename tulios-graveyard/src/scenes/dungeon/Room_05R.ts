import "phaser";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_05R extends BaseRoom {
  static key = "dungeon:room_05R";

  constructor() {
    super(
      Room_05R.key,
      {
        hasLeft: true,
        hasRight: true,
      },
      {
        up: "dungeon:room_04R",
        down: "dungeon:room_08R",
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
