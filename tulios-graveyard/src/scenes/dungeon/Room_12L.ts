import "phaser";
import { RoomSize, RoomDifficulty, CustomBorder } from "../../types";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_12L extends BaseRoomDungeon {
  static key = "dungeon:room_12L";

  constructor() {
    super(
      Room_12L.key,
      {
        hasTop: true,
        hasRight: true,
      },
      {
        left: "dungeon:room_10L",
        down: "dungeon:room_13L",
      },
      generateNextRoomData({
        down: 0,
        left: 0,
      }),
      RoomDifficulty.Hard,
      {},
      [CustomBorder.LeftBottomCorner]
    );
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
