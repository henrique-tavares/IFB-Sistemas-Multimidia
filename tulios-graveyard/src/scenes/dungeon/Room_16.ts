import "phaser";
import { RoomSize, RoomDifficulty } from "../../types";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_16 extends BaseRoom {
  static key = "dungeon:room_16";

  constructor() {
    super(
      Room_16.key,
      {
        hasLeft: true,
        hasTop: true,
        hasRight: true,
      },
      {
        // up: "dungeon:room_18",
        down: "dungeon:room_15",
        // right: "dungeon:room_17",
      },
      generateNextRoomData({
        // up: 25,
        down: 0,
        // right: 0,
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
