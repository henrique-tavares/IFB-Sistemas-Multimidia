import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoomGraveyard from "./baseRoomGraveyard";

export default class Room_06_07_16_17 extends BaseRoomGraveyard {
  static key = "graveyard:room_06_07_16_17";

  constructor() {
    super(
      Room_06_07_16_17.key,
      {
        hasTop: true,
        hasRight: true,
      },
      {
        left: ["graveyard:room_05", "graveyard:room_15"],
        down: ["graveyard:room_26", "graveyard:room_27"],
      },
      generateNextRoomData({
        left: {
          mode: "double",
          offsets: [0, -100],
        },
        down: {
          mode: "double",
          offsets: [0, -100],
        },
      }),
      RoomSize["2x2"],
      RoomDifficulty.Medium
    );
  }

  create() {
    super.create();

    super.generateRandomProps(20);
  }

  update() {
    super.update();
  }
}
