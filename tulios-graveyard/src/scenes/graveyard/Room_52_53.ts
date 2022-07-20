import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoomGraveyard from "./baseRoomGraveyard";

export default class Room_52_53 extends BaseRoomGraveyard {
  static key = "graveyard:room_52_53";

  constructor() {
    super(
      Room_52_53.key,
      {
        hasBottom: true,
      },
      {
        up: ["graveyard:room_42", "graveyard:room_43"],
        right: "graveyard:room_44_54",
        left: "graveyard:room_40_50_41_51",
      },
      generateNextRoomData({
        up: {
          mode: "double",
          offsets: [0, -100],
        },
        right: {
          mode: "single",
          offset: 50,
        },
        left: {
          mode: "single",
          offset: 50,
        },
      }),
      RoomSize["1x2"],
      RoomDifficulty.Medium
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
