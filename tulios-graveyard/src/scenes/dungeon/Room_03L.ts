import "phaser";
import { RoomSize, RoomDifficulty } from "../../types";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_03L extends BaseRoom {
  static key = "dungeon:room_03L";

  constructor() {
    super(
      Room_03L.key,
      {
        hasTop: true,
        hasBottom: true,
      },
      {
        left: "dungeon:room_04L",
        right: "dungeon:room_01",
      },
      generateNextRoomData({
        left: 0,
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
