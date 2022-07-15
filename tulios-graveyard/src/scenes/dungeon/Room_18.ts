import "phaser";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_18 extends BaseRoom {
  static key = "dungeon:room_18";

  constructor() {
    super(
      Room_18.key,
      {
        hasTop: true,
        hasLeft: true,
        hasRight: true,
      },
      {
        down: "dungeon:room_16",
      },
      generateNextRoomData({
        down: -100,
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
