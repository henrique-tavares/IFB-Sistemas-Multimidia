import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoomGraveyard from "./baseRoomGraveyard";

export default class Room_46 extends BaseRoomGraveyard {
  static key = "graveyard:room_46";

  constructor() {
    super(
      Room_46.key,
      {},
      {
        up: "graveyard:room_35_36",
        right: "graveyard:room_47",
        down: "graveyard:room_56_57",
        left: "graveyard:room_45",
      },
      generateNextRoomData({
        up: {
          mode: "single",
          offset: 50,
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

    super.generateRandomProps(6);
  }

  update() {
    super.update();
  }
}
