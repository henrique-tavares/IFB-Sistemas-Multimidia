import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoomGraveyard from "./baseRoomGraveyard";

export default class Room_37 extends BaseRoomGraveyard {
  static key = "graveyard:room_37";

  constructor() {
    super(
      Room_37.key,
      {
        hasRight: true,
      },
      {
        up: "graveyard:room_27",
        down: "graveyard:room_47",
        left: "graveyard:room_35_36",
      },
      generateNextRoomData({
        up: {
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
