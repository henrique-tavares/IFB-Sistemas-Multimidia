import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoom from "./baseRoom";

export default class Room_27 extends BaseRoom {
  static key = "graveyard:room_27";

  constructor() {
    super(
      Room_27.key,
      {
        hasRight: true,
      },
      {
        up: "graveyard:room_06_07_16_17",
        down: "graveyard:room_37",
        left: "graveyard:room_26",
      },
      generateNextRoomData({
        up: {
          mode: "single",
          offset: 50,
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
