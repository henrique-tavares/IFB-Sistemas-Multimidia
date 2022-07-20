import { CustomBorder, RoomDifficulty, RoomSize } from "../../types";
import {
  addCustomBounds,
  generateCustomBounds,
  generateNextRoomData,
  handleNextRoomArrows,
} from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_01 extends BaseRoomDungeon {
  static key = "dungeon:room_01";

  constructor() {
    super(
      Room_01.key,
      {
        hasBottom: true,
      },
      {
        up: "dungeon:room_00",
        left: "dungeon:room_03L",
        right: "dungeon:room_03R",
      },
      generateNextRoomData({
        up: -100,
        left: 0,
        right: 0,
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
