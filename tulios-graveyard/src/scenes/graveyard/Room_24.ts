import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoomGraveyard from "./baseRoomGraveyard";

export default class Room_24 extends BaseRoomGraveyard {
  static key = "graveyard:room_24";

  constructor() {
    super(
      Room_24.key,
      {},
      {
        up: "graveyard:room_04_14",
        right: "graveyard:room_25",
        down: "graveyard:room_34",
        left: "graveyard:room_23_33",
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
