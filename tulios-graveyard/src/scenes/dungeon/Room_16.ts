import "phaser";
import Door from "../../props/door";
import { RoomDifficulty } from "../../types";
import { WeaponType } from "../../weapons/weapon";
import { generateNextRoomData } from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_16 extends BaseRoomDungeon {
  static key = "dungeon:room_16";

  constructor() {
    super(
      Room_16.key,
      {
        hasLeft: true,
        hasTop: true,
        hasRight: true,
      },
      {
        // up: "dungeon:room_18",
        down: "dungeon:room_15",
        // right: "dungeon:room_17",
      },
      generateNextRoomData({
        // up: 25,
        down: 0,
        // right: 0,
      }),
      RoomDifficulty.Peaceful
    );
  }

  create() {
    super.create();

    this.player.pickupWeapon(WeaponType.pistol);

    const door = new Door(
      this,
      this.screen.relativeX(50),
      this.screen.relativeY(6),
      5,
      "dungeon:room_18"
    );
    super.addFixedProps(door);
  }

  update() {
    super.update();
  }
}
