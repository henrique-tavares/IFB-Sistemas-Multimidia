import "phaser";
import { RoomSize, RoomDifficulty, CustomBorder } from "../../types";
import {
  addCustomBounds,
  generateCustomBounds,
  generateNextRoomData,
  handleNextRoomArrows,
} from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_10L extends BaseRoomDungeon {
  static key = "dungeon:room_10L";

  constructor() {
    super(
      Room_10L.key,
      {
        hasLeft: true,
      },
      {
        up: "dungeon:room_09L",
        down: "dungeon:room_11L",
        right: "dungeon:room_12L",
      },
      generateNextRoomData({
        up: 0,
        down: 0,
        right: 0,
      }),
      RoomDifficulty.Hard,
      {
        up: -1,
        down: -1,
      },
      [CustomBorder.TopLeft, CustomBorder.BottomLeft]
    );
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
