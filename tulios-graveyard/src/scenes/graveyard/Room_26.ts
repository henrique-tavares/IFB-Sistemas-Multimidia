import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoom from "./baseRoom";

export default class Room_26 extends BaseRoom {
  static key = "graveyard:room_26";

  constructor() {
    super(
      Room_26.key,
      {},
      {
        up: "graveyard:room_06_07_16_17",
        right: "graveyard:room_27",
        down: "graveyard:room_35_36",
        left: "graveyard:room_25",
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
