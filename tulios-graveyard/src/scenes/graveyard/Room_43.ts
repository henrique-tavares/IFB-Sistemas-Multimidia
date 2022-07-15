import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoom from "./baseRoom";

export default class Room_43 extends BaseRoom {
  static key = "graveyard:room_43";

  constructor() {
    super(
      Room_43.key,
      {},
      {
        up: "graveyard:room_23_33",
        right: "graveyard:room_44_54",
        down: "graveyard:room_52_53",
        left: "graveyard:room_42",
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
  }

  update() {
    super.update();
  }
}
