import "phaser";
import { RoomSize, RoomDifficulty, CustomBorder } from "../../types";
import {
  addCustomBounds,
  generateCustomBounds,
  generateNextRoomData,
  handleNextRoomArrows,
} from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_13L extends BaseRoomDungeon {
  static key = "dungeon:room_13L";

  constructor() {
    super(
      Room_13L.key,
      {
        hasLeft: true,
        hasBottom: true,
      },
      {
        up: "dungeon:room_12L",
        right: "dungeon:room_14L",
      },
      generateNextRoomData({
        up: 0,
        right: 0,
      }),
      RoomDifficulty.Hard,
      {
        right: -1,
      },
      [CustomBorder.RightTop]
    );
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
