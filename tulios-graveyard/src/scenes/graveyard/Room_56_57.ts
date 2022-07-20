import "phaser";
import Mausoleum from "../../props/mausoleum";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoomGraveyard from "./baseRoomGraveyard";

export default class Room_56_57 extends BaseRoomGraveyard {
  static key = "graveyard:room_56_57";

  constructor() {
    super(
      Room_56_57.key,
      {
        hasBottom: true,
        hasRight: true,
      },
      {
        up: ["graveyard:room_46", "graveyard:room_47"],
        left: "graveyard:room_55",
      },
      generateNextRoomData({
        up: {
          mode: "double",
          offsets: [0, -100],
        },
        left: {
          mode: "single",
        },
      }),
      RoomSize["1x2"],
      RoomDifficulty.Hard
    );
  }

  create() {
    super.create();

    super.addFixedProps(new Mausoleum(this, this.screen.relativeX(90), this.screen.relativeY(30)));
    super.generateRandomProps(10);
  }

  update() {
    super.update();
  }
}
