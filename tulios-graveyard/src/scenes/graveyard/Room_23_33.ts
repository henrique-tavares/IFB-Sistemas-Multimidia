import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoom from "./baseRoom";

export default class Room_23_33 extends BaseRoom {
  static key = "graveyard:room_23_33";

  constructor() {
    super(
      Room_23_33.key,
      {},
      {
        up: "graveyard:room_13",
        right: ["graveyard:room_24", "graveyard:room_34"],
        down: "graveyard:room_43",
        left: ["graveyard:room_22", "graveyard:room_31_32"],
      },
      generateNextRoomData({
        up: {
          mode: "single",
        },
        right: {
          mode: "double",
          offsets: [0, -100],
        },
        down: {
          mode: "single",
        },
        left: {
          mode: "double",
          offsets: [0, -100],
        },
      }),
      RoomSize["2x1"],
      RoomDifficulty.Medium
    );
  }

  create() {
    super.create();

    super.generateRandomProps(10);
  }

  update() {
    super.update();
  }
}
