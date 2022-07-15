import "phaser";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoom from "./baseRoom";

export default class Room_55 extends BaseRoom {
  static key = "graveyard:room_55";

  constructor() {
    super(
      Room_55.key,
      {
        hasBottom: true,
      },
      {
        up: "graveyard:room_45",
        right: "graveyard:room_56_57",
        left: "graveyard:room_44_54",
      },
      generateNextRoomData({
        up: {
          mode: "single",
        },
        right: {
          mode: "single",
        },
        left: {
          mode: "single",
          offset: 50,
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
