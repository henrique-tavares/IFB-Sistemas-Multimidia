import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoomGraveyard from "./baseRoomGraveyard";

export default class Room_11 extends BaseRoomGraveyard {
  static key = "graveyard:room_11";

  constructor() {
    super(
      Room_11.key,
      {},
      {
        up: "graveyard:room_01",
        right: "graveyard:room_12",
        left: "graveyard:room_10",
        down: "graveyard:room_21",
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
