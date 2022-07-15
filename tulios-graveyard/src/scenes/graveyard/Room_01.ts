import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoom from "./baseRoom";

export default class Room_01 extends BaseRoom {
  static key = "graveyard:room_01";

  constructor() {
    super(
      Room_01.key,
      {
        hasTop: true,
      },
      {
        left: "graveyard:room_00",
        right: "graveyard:room_02_03",
        down: "graveyard:room_11",
      },
      generateNextRoomData({
        left: {
          mode: "single",
        },
        right: {
          mode: "single",
        },
        down: {
          mode: "single",
        },
      }),
      RoomSize["1x1"],
      RoomDifficulty.Easy
    );
  }

  create() {
    super.create();

    super.generateRandomProps(6);
  }

  update() {
    super.update();
  }
}
