import "phaser";
import { RoomSize, RoomDifficulty } from "../../types";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_11L extends BaseRoomDungeon {
  static key = "dungeon:room_11L";

  constructor() {
    super(
      Room_11L.key,
      {
        hasLeft: true,
        hasRight: true,
        hasBottom: true,
      },
      {
        up: "dungeon:room_10L",
      },
      generateNextRoomData({
        up: 0,
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
