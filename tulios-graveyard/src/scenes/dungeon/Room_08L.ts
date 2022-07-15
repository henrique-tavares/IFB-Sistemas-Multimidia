import "phaser";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_08L extends BaseRoom {
  static key = "dungeon:room_08L";

  constructor() {
    super(
      Room_08L.key,
      {
        hasTop: true,
        hasBottom: true,
        hasLeft: true,
      },
      {
        right: "dungeon:room_07L",
      },
      generateNextRoomData({
        right: -50,
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
