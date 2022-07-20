import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoomGraveyard from "./baseRoomGraveyard";

export default class Room_45 extends BaseRoomGraveyard {
  static key = "graveyard:room_45";

  constructor() {
    super(
      Room_45.key,
      {},
      {
        up: "graveyard:room_35_36",
        right: "graveyard:room_46",
        down: "graveyard:room_55",
        left: "graveyard:room_44_54",
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
      RoomDifficulty.Hard
    );
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
