import "phaser";
import { RoomSize, RoomDifficulty } from "../../types";
import {
  addCustomBounds,
  generateCustomBounds,
  generateNextRoomData,
  handleNextRoomArrows,
} from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_07L extends BaseRoomDungeon {
  static key = "dungeon:room_07L";

  constructor() {
    super(
      Room_07L.key,
      {
        hasRight: true,
        hasLeft: true,
      },
      {
        up: "dungeon:room_06L",
        down: "dungeon:room_09L",
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
