import "phaser";
import { handleNextRoomArrows, generateNextRoomData } from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_00 extends BaseRoom {
  static key = "dungeon:room_00";

  constructor() {
    super(
      Room_00.key,
      {
        hasTop: true,
        hasLeft: true,
        hasRight: true,
      },
      {
        down: "dungeon:room_01",
      },
      generateNextRoomData({ down: 50 })
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
