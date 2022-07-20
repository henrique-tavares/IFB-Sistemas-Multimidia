import "phaser";
import { RoomSize, RoomDifficulty } from "../../types";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_14L extends BaseRoomDungeon {
  static key = "dungeon:room_14L";

  constructor() {
    super(
      Room_14L.key,
      {
        hasTop: true,
        hasBottom: true,
      },
      {
        left: "dungeon:room_13L",
        right: "dungeon:room_15",
      },
      generateNextRoomData({
        left: 0,
        right: 50,
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
