import "phaser";
import { RoomSize, RoomDifficulty } from "../../types";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_12R extends BaseRoom {
  static key = "dungeon:room_12R";

  constructor() {
    super(
      Room_12R.key,
      {
        hasLeft: true,
        hasRight: true,
        hasBottom: true,
      },
      {
        up: "dungeon:room_11R",
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
