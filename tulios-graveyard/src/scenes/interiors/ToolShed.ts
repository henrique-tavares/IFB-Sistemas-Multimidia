import { GameObjects } from "phaser";
import BaseProp from "../../props/baseProp";
import BlueChest from "../../props/blue-chest";
import Door from "../../props/door";
import HangingLight from "../../props/hanging-light";
import { RoomDifficulty } from "../../types";
import BaseRoom from "./baseRoom";

export default class ToolShed extends BaseRoom {
  static key = "graveyard:toolshed";

  private hanginglight: BaseProp;

  constructor() {
    super(
      ToolShed.key,
      {
        hasTop: true,
        hasLeft: true,
        hasBottom: true,
        hasRight: true
      },
      {},
      {},
      RoomDifficulty.Peaceful,
      {top: 20, bottom: 15},
      26
    );
  }

  create() {
    super.create();

    this.player.sprite.setScale(3.5);

    super.addFixedProps(new BlueChest(this, this.screen.relativeX(60), this.screen.relativeY(20)));

    this.hanginglight = new HangingLight(this, this.screen.relativeX(49.9), this.screen.relativeY(5.2));
    this.hanginglight.setDepth(this.screen.relativeY(100));

    this.doors = [new Door(this, this.screen.relativeX(50.5), this.screen.relativeY(91.5), 2, "graveyard:room_02_03")];
    this.doors.forEach(door => super.addFixedProps(door));

    const rects = [
      new GameObjects.Rectangle(this, this.screen.relativeX(29.5), this.screen.relativeY(16), this.screen.relativeX(5), this.screen.relativeY(11)),
      new GameObjects.Rectangle(this, this.screen.relativeX(42), this.screen.relativeY(20), this.screen.relativeX(8), this.screen.relativeY(6)),
      new GameObjects.Rectangle(this, this.screen.relativeX(52), this.screen.relativeY(16), this.screen.relativeX(5), this.screen.relativeY(12)),
      new GameObjects.Rectangle(this, this.screen.relativeX(73), this.screen.relativeY(18), this.screen.relativeX(6), this.screen.relativeY(10)),
      new GameObjects.Rectangle(this, this.screen.relativeX(76), this.screen.relativeY(53), this.screen.relativeX(6), this.screen.relativeY(70)),
      new GameObjects.Rectangle(this, this.screen.relativeX(73), this.screen.relativeY(73), this.screen.relativeX(4), this.screen.relativeY(13)),
      new GameObjects.Rectangle(this, this.screen.relativeX(30), this.screen.relativeY(76), this.screen.relativeX(8), this.screen.relativeY(15)),
      new GameObjects.Rectangle(this, this.screen.relativeX(29.5), this.screen.relativeY(32), this.screen.relativeX(5.75), this.screen.relativeY(10)),
    ];

    rects.map(rect => {
      super.addColliderBox(rect);
    });
  }

  update() {
    super.update();

    if(this.player.sprite.scale != 3.5){
      this.player.sprite.setScale(3.5);
    }
  }
}
