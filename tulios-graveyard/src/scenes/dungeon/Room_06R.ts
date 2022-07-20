import "phaser";
import { RoomSize, RoomDifficulty } from "../../types";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_06R extends BaseRoomDungeon {
  static key = "dungeon:room_06R";

  constructor() {
    super(
      Room_06R.key,
      {
        hasTop: true,
        hasBottom: true,
        hasLeft: true,
      },
      {
        right: "dungeon:room_08R",
      },
      generateNextRoomData({
        right: 50,
      }),
      RoomDifficulty.Peaceful
    );
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
