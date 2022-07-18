import { generateNextRoomData } from "../utils/graveyard";
import BaseRoom from "./baseRoom";

export default class TuliosHouse extends BaseRoom {
  static key = "graveyard:house";

  staticProps: Phaser.Physics.Arcade.StaticGroup;
  dynamicSprites: Phaser.Physics.Arcade.Sprite[];
  line: Phaser.GameObjects.Line;
  cursor: Phaser.Input.Pointer;

  constructor() {
    super(
      TuliosHouse.key,
      {
        hasTop: true,
        hasLeft: true,
      },
      {
        right: "graveyard:room_01",
        down: "graveyard:room_10",
      },
      generateNextRoomData({
        right: {
          mode: "single",
        },
        down: {
          mode: "single",
        },
      }),
    );
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
