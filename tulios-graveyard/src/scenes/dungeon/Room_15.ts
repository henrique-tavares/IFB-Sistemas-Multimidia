import "phaser";
import { RoomSize, RoomDifficulty, CustomBorder } from "../../types";
import {
  addCustomBounds,
  generateCustomBounds,
  generateNextRoomData,
  handleNextRoomArrows,
} from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_15 extends BaseRoom {
  static key = "dungeon:room_15";

  constructor() {
    super(
      Room_15.key,
      {
        hasBottom: true,
      },
      {
        up: "dungeon:room_16",
        left: "dungeon:room_14L",
        right: "dungeon:room_13R",
      },
      generateNextRoomData({
        up: 0,
        left: -100,
        right: -100,
      }),
      RoomDifficulty.Hard,
      {
        left: 1,
        right: 1,
      },
      [CustomBorder.LeftBottom, CustomBorder.RightBottom]
    );
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
