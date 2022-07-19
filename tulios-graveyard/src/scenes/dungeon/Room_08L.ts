import "phaser";
import { RoomSize, RoomDifficulty } from "../../types";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_08L extends BaseRoom {
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
