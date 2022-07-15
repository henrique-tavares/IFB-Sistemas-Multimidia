import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoom from "./baseRoom";

export default class Room_10 extends BaseRoom {
  static key = "graveyard:room_10";

  constructor() {
    super(
      Room_10.key,
      {
        hasLeft: true,
      },
      {
        up: "graveyard:room_00",
        right: "graveyard:room_11",
        down: "graveyard:room_20_30",
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
