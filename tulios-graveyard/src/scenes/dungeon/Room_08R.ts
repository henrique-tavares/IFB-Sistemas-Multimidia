import "phaser";
import { RoomSize, RoomDifficulty } from "../../types";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_08R extends BaseRoomDungeon {
  static key = "dungeon:room_08R";

  constructor() {
    super(
      Room_08R.key,
      {
        hasLeft: true,
        hasRight: true,
      },
      {
        up: "dungeon:room_05R",
        down: "dungeon:room_09R",
      },
      generateNextRoomData({
        up: 0,
        down: 0,
      }),
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
