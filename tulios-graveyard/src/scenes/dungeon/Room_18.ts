import "phaser";
import { RoomSize, RoomDifficulty } from "../../types";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_18 extends BaseRoom {
  static key = "dungeon:room_18";

  constructor() {
    super(
      Room_18.key,
      {
        hasTop: true,
        hasLeft: true,
        hasRight: true,
        hasBottom: true,
      },
      {},
      {},
      RoomDifficulty.Jorge
    );
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
