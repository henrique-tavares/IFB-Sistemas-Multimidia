import "phaser";
import { RoomSize, RoomDifficulty } from "../../types";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_10R extends BaseRoomDungeon {
  static key = "dungeon:room_10R";

  constructor() {
    super(
      Room_10R.key,
      {
        hasLeft: true,
        hasRight: true,
      },
      {
        up: "dungeon:room_09R",
        down: "dungeon:room_11R",
      },
      generateNextRoomData({
        up: 0,
        down: 50,
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
