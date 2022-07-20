import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoomGraveyard from "./baseRoomGraveyard";

export default class Room_22 extends BaseRoomGraveyard {
  static key = "graveyard:room_22";

  constructor() {
    super(
      Room_22.key,
      {},
      {
        up: "graveyard:room_12",
        right: "graveyard:room_23_33",
        down: "graveyard:room_31_32",
        left: "graveyard:room_21",
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
          offset: 50,
        },
        left: {
          mode: "single",
        },
      }),
      RoomSize["1x1"],
      RoomDifficulty.Medium
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
