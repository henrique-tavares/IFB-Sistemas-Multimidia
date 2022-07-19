import "phaser";
import { RoomSize, RoomDifficulty } from "../../types";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_17 extends BaseRoom {
  static key = "dungeon:room_17";

  constructor() {
    super(
      Room_17.key,
      {
        hasTop: true,
        hasBottom: true,
        hasRight: true,
        hasLeft: true,
      },
      {},
      {},
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
