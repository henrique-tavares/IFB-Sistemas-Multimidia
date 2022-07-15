import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoom from "./baseRoom";

export default class Room_25 extends BaseRoom {
  static key = "graveyard:room_25";

  constructor() {
    super(
      Room_25.key,
      {},
      {
        up: "graveyard:room_15",
        right: "graveyard:room_26",
        down: "graveyard:room_35_36",
        left: "graveyard:room_24",
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
