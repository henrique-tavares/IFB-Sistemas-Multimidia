import "phaser";
import { RoomDifficulty } from "../../types";
import { generateNextRoomData } from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_08L extends BaseRoomDungeon {
  static key = "dungeon:room_08L";

  constructor() {
    super(
      Room_08L.key,
      {
        hasTop: true,
        hasBottom: true,
        hasLeft: true,
      },
      {
        right: "dungeon:room_07L",
      },
      generateNextRoomData({
        right: -50,
      }),
      RoomDifficulty.Peaceful
    );
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
