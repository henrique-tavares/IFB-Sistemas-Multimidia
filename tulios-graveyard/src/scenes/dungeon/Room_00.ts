import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { handleNextRoomArrows, generateNextRoomData } from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_00 extends BaseRoomDungeon {
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
      generateNextRoomData({ down: 50 }),
      RoomDifficulty.Hard
    );
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
