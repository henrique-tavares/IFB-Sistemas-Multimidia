import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoomGraveyard from "./baseRoomGraveyard";

export default class Room_12 extends BaseRoomGraveyard {
  static key = "graveyard:room_12";

  constructor() {
    super(
      Room_12.key,
      {},
      {
        up: "graveyard:room_02_03",
        right: "graveyard:room_13",
        left: "graveyard:room_11",
        down: "graveyard:room_22",
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
