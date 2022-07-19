import "phaser";
import { RoomSize, RoomDifficulty } from "../../types";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_13R extends BaseRoom {
  static key = "dungeon:room_13R";

  constructor() {
    super(
      Room_13R.key,
      {
        hasTop: true,
        hasBottom: true,
      },
      {
        left: "dungeon:room_15",
        right: "dungeon:room_11R",
      },
      generateNextRoomData({
        left: 50,
        right: 0,
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
