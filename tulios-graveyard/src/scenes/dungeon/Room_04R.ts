import "phaser";
import { RoomSize, RoomDifficulty, CustomBorder } from "../../types";
import {
  addCustomBounds,
  generateCustomBounds,
  generateNextRoomData,
  handleNextRoomArrows,
} from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_04R extends BaseRoomDungeon {
  static key = "dungeon:room_04R";

  constructor() {
    super(
      Room_04R.key,
      {
        hasTop: true,
        hasRight: true,
      },
      {
        left: "dungeon:room_03R",
        down: "dungeon:room_05R",
      },
      generateNextRoomData({
        down: 0,
        left: 0,
      }),
      RoomDifficulty.Hard,
      {
        left: -1,
      },
      [CustomBorder.LeftTop]
    );
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
