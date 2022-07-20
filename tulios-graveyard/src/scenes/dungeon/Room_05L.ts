import "phaser";
import { CustomBorder, RoomDifficulty } from "../../types";
import { generateNextRoomData } from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_05L extends BaseRoomDungeon {
  static key = "dungeon:room_05L";

  constructor() {
    super(
      Room_05L.key,
      {
        hasRight: true,
        hasBottom: true,
      },
      {
        up: "dungeon:room_04L",
        left: "dungeon:room_06L",
      },
      generateNextRoomData({
        up: 0,
        left: -100,
      }),
      RoomDifficulty.Hard,
      {
        left: 1,
      },
      [CustomBorder.LeftBottom]
    );
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
