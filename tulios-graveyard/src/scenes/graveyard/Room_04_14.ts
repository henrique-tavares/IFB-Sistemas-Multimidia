import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoomGraveyard from "./baseRoomGraveyard";

export default class Room_04_14 extends BaseRoomGraveyard {
  static key = "graveyard:room_04_14";

  constructor() {
    super(
      Room_04_14.key,
      {
        hasTop: true,
      },
      {
        right: ["graveyard:room_05", "graveyard:room_15"],
        left: ["graveyard:room_02_03", "graveyard:room_13"],
        down: "graveyard:room_04",
      },
      generateNextRoomData({
        right: {
          mode: "double",
          offsets: [0, 0],
        },
        down: {
          mode: "single",
        },
        left: {
          mode: "double",
          offsets: [0, 0],
        },
      }),
      RoomSize["2x1"],
      RoomDifficulty.Easy
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
