import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoomGraveyard from "./baseRoomGraveyard";

export default class Room_35_36 extends BaseRoomGraveyard {
  static key = "graveyard:room_35_36";

  constructor() {
    super(
      Room_35_36.key,
      {},
      {
        up: ["graveyard:room_25", "graveyard:room_26"],
        right: "graveyard:room_37",
        down: ["graveyard:room_45", "graveyard:room_46"],
        left: "graveyard:room_34",
      },
      generateNextRoomData({
        up: {
          mode: "double",
          offsets: [0, -100],
        },
        right: {
          mode: "single",
        },
        down: {
          mode: "double",
          offsets: [0, -100],
        },
        left: {
          mode: "single",
        },
      }),
      RoomSize["1x2"],
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
