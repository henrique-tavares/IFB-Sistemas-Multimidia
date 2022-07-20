import "phaser";
import { RoomSize, RoomDifficulty } from "../../types";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_09R extends BaseRoomDungeon {
  static key = "dungeon:room_09R";

  constructor() {
    super(
      Room_09R.key,
      {
        hasLeft: true,
        hasRight: true,
      },
      {
        up: "dungeon:room_08R",
        down: "dungeon:room_10R",
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
