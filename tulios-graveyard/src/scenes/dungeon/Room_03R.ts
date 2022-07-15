import "phaser";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_03R extends BaseRoom {
  static key = "dungeon:room_03R";

  constructor() {
    super(
      Room_03R.key,
      {
        hasTop: true,
        hasBottom: true,
      },
      {
        left: "dungeon:room_01",
        right: "dungeon:room_04R",
      },
      generateNextRoomData({
        left: 0,
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
