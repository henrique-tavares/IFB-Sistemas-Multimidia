import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoomGraveyard from "./baseRoomGraveyard";

export default class Room_15 extends BaseRoomGraveyard {
  static key = "graveyard:room_15";

  constructor() {
    super(
      Room_15.key,
      {},
      {
        up: "graveyard:room_05",
        right: "graveyard:room_06_07_16_17",
        left: "graveyard:room_04_14",
        down: "graveyard:room_25",
      },
      generateNextRoomData({
        up: {
          mode: "single",
        },
        right: {
          mode: "single",
          offset: 50,
        },
        down: {
          mode: "single",
        },
        left: {
          mode: "single",
          offset: 50,
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
