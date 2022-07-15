import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoom from "./baseRoom";

export default class Room_47 extends BaseRoom {
  static key = "graveyard:room_47";

  constructor() {
    super(
      Room_47.key,
      {
        hasRight: true,
      },
      {
        up: "graveyard:room_37",
        down: "graveyard:room_56_57",
        left: "graveyard:room_46",
      },
      generateNextRoomData({
        up: {
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
