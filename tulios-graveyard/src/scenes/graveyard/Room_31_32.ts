import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoomGraveyard from "./baseRoomGraveyard";

export default class Room_31_32 extends BaseRoomGraveyard {
  static key = "graveyard:room_31_32";

  constructor() {
    super(
      Room_31_32.key,
      {},
      {
        up: ["graveyard:room_21", "graveyard:room_22"],
        right: "graveyard:room_23_33",
        down: ["graveyard:room_40_50_41_51", "graveyard:room_42"],
        left: "graveyard:room_20_30",
      },
      generateNextRoomData({
        up: {
          mode: "double",
          offsets: [0, -100],
        },
        right: {
          mode: "single",
          offset: 50,
        },
        down: {
          mode: "double",
          offsets: [50, -100],
        },
        left: {
          mode: "single",
          offset: 50,
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
