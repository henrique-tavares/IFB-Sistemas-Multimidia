import "phaser";
import { RoomSize, RoomDifficulty } from "../../types";
import {
  addCustomBounds,
  generateCustomBounds,
  generateNextRoomData,
  handleNextRoomArrows,
} from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_07R extends BaseRoomDungeon {
  static key = "dungeon:room_07R";

  constructor() {
    super(
      Room_07R.key,
      {
        hasTop: true,
        hasRight: true,
        hasBottom: true,
      },
      {
        left: "dungeon:room_08R",
      },
      generateNextRoomData({
        left: 50,
      }),
      RoomDifficulty.Peaceful
    );
  }

  create() {
    super.create();

    // addCustomBounds(
    //   this.player.sprite,
    //   this,
    //   this.screen,
    //   generateCustomBounds(
    //     this.screen,
    //     {
    //       top: this.verticalPadding,
    //       bottom: this.verticalPadding,
    //       horizontal: this.horizontalPadding,
    //     },
    //     {
    //       left: 50,
    //       right: 50,
    //     }
    //   )
    // );
  }

  update() {
    super.update();
  }
}
