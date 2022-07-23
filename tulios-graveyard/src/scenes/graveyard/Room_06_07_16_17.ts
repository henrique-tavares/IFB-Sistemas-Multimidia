import "phaser";
import MausoleumKey from "../../props/mausoleumKey";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoomGraveyard from "./baseRoomGraveyard";

export default class Room_06_07_16_17 extends BaseRoomGraveyard {
  static key = "graveyard:room_06_07_16_17";

  constructor() {
    super(
      Room_06_07_16_17.key,
      {
        hasTop: true,
        hasRight: true,
      },
      {
        left: ["graveyard:room_05", "graveyard:room_15"],
        down: ["graveyard:room_26", "graveyard:room_27"],
      },
      generateNextRoomData({
        left: {
          mode: "double",
          offsets: [0, -100],
        },
        down: {
          mode: "double",
          offsets: [0, -100],
        },
      }),
      RoomSize["2x2"],
      RoomDifficulty.Medium
    );
  }

  create() {
    super.create();

    super.generateRandomProps(20);

    if (!this.progressHandler.hasKey) {
      const key = new MausoleumKey(this, this.screen.relativeX(75), this.screen.relativeY(25));
      super.addFixedProps(key);

      key.on("collide", () => {
        this.progressHandler.hasKey = true;
        key.emit("picked", this.progressHandler.searchingForKey);
      });
    }
  }

  update() {
    super.update();
  }
}
