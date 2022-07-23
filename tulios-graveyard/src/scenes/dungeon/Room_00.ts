import "phaser";
import { GameObjects } from "phaser";
import { PlayerCoordinate, RoomDifficulty } from "../../types";
import { generateNextRoomData } from "../utils/dungeon";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_00 extends BaseRoomDungeon {
  static key = "dungeon:room_00";

  constructor() {
    super(
      Room_00.key,
      {
        hasTop: true,
        hasLeft: true,
        hasRight: true,
      },
      {
        down: "dungeon:room_01",
      },
      generateNextRoomData({ down: 50 }),
      RoomDifficulty.Hard
    );
  }

  create() {
    super.create();

    const area = new GameObjects.Rectangle(
      this.scene.scene,
      this.screen.relativeX(49),
      this.screen.relativeY(0),
      this.screen.relativeX(12.5),
      this.screen.relativeY(25),
      0x000,
      0
    );
    this.add.existing(area);
    this.physics.add.existing(area, true);
    this.physics.add.overlap(
      this.player.sprite,
      area,
      () => {
        if (!this.data.get("concluded")) {
          return;
        }

        const initialPos: PlayerCoordinate = {
          x: {
            relative: false,
            value: 100,
          },
          y: {
            relative: false,
            value: 300,
          },
        };

        this.events.emit("go-to-interior", "graveyard:mausoleum", initialPos);
      },
      undefined,
      this
    );
  }

  update() {
    super.update();
  }
}
