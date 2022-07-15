import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoom from "./baseRoom";

export default class Room_44_54 extends BaseRoom {
  static key = "graveyard:room_44_54";

  constructor() {
    super(
      Room_44_54.key,
      {
        hasBottom: true,
      },
      {
        up: "graveyard:room_34",
        right: ["graveyard:room_45", "graveyard:room_55"],
        left: ["graveyard:room_43", "graveyard:room_52_53"],
      },
      generateNextRoomData({
        up: {
          mode: "single",
        },
        right: {
          mode: "double",
          offsets: [0, -100],
        },
        left: {
          mode: "double",
          offsets: [0, -100],
        },
      }),
      RoomSize["2x1"],
      RoomDifficulty.Hard
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
