import "phaser";
import { RoomSize, RoomDifficulty, CustomBorder } from "../../types";
import {
  addCustomBounds,
  generateCustomBounds,
  generateNextRoomData,
  handleNextRoomArrows,
} from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_11R extends BaseRoom {
  static key = "dungeon:room_11R";

  constructor() {
    super(
      Room_11R.key,
      {
        hasRight: true,
        hasBottom: true,
      },
      {
        up: "dungeon:room_10R",
        left: "dungeon:room_13R",
      },
      generateNextRoomData({
        up: -100,
        left: 0,
      }),
      RoomDifficulty.Hard,
      {
        up: 1,
      },
      [CustomBorder.TopRight]
    );
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
