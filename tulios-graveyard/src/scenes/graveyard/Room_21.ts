import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoom from "./baseRoom";

export default class Room_21 extends BaseRoom {
  static key = "graveyard:room_21";

  constructor() {
    super(
      Room_21.key,
      {},
      {
        up: "graveyard:room_11",
        right: "graveyard:room_22",
        down: "graveyard:room_31_32",
        left: "graveyard:room_20_30",
      },
      generateNextRoomData({
        up: {
          mode: "single",
        },
        right: {
          mode: "single",
        },
        down: {
          mode: "single",
        },
        left: {
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
