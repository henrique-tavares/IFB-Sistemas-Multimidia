import "phaser";
import { RoomSize, RoomDifficulty } from "../../types";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_02 extends BaseRoomDungeon {
  static key = "dungeon:room_02";

  constructor() {
    super(
      Room_02.key,
      {
        hasBottom: true,
        hasLeft: true,
        hasRight: true,
      },
      {
        up: "dungeon:room_01",
      },
      generateNextRoomData({
        up: 50,
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
