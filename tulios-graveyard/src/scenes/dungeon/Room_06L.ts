import "phaser";
import { RoomSize, RoomDifficulty } from "../../types";
import {
  addCustomBounds,
  generateCustomBounds,
  generateNextRoomData,
  handleNextRoomArrows,
} from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";
import { CustomBorder } from "../../types";

export default class Room_06L extends BaseRoomDungeon {
  static key = "dungeon:room_06L";

  constructor() {
    super(
      Room_06L.key,
      {
        hasTop: true,
        hasLeft: true,
      },
      {
        down: "dungeon:room_07L",
        right: "dungeon:room_05L",
      },
      generateNextRoomData({
        down: 0,
        right: 50,
      }),
      RoomDifficulty.Hard,
      {
        down: -1,
      },
      [CustomBorder.BottomLeft]
    );
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
