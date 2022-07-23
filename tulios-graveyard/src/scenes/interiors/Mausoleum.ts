import { GameObjects } from "phaser";
import { fadeDuration } from "../../game";
import PlayerHandler from "../../handlers/playerHandler";
import Box from "../../props/box";
import Door from "../../props/door";
import Stairs from "../../props/stairs";
import StoneCoffin from "../../props/stone-coffin";
import WeaponProp from "../../props/weapon";
import { RoomDifficulty } from "../../types";
import { WeaponType } from "../../weapons/weapon";
import BaseRoomInterior from "./baseRoom";

export default class Mausoleum extends BaseRoomInterior {
  static key = "graveyard:mausoleum";
  private stairs: Stairs;

  constructor() {
    super(
      Mausoleum.key,
      {
        hasTop: true,
        hasLeft: true,
        hasBottom: true,
        hasRight: true,
      },
      {},
      {},
      RoomDifficulty.Peaceful,
      { top: 16, bottom: 16 },
      8.7
    );
  }

  create() {
    super.create();

    super.addFixedProps(
      new StoneCoffin(this, this.screen.relativeX(71), this.screen.relativeY(32))
    );
    super.addFixedProps(new Box(this, this.screen.relativeX(75), this.screen.relativeY(80)));
    super.addFixedProps(new Box(this, this.screen.relativeX(81.5), this.screen.relativeY(80)));

    const playerHandler = this.scene.scene.cache.custom["handlers"].get(
      "playerHandler"
    ) as PlayerHandler;
    if (!playerHandler.playerData.weapons[2].picked) {
      super.addFixedProps(
        new WeaponProp(
          this,
          this.screen.relativeX(86.5),
          this.screen.relativeY(82),
          WeaponType.shotgun
        )
      );
    }

    this.stairs = new Stairs(this, this.screen.relativeX(71), this.screen.relativeY(50));
    super.addFixedProps(this.stairs);

    const door = new Door(
      this,
      this.screen.relativeX(4.9),
      this.screen.relativeY(48.35),
      3,
      "graveyard:room_56_57"
    );
    super.addFixedProps(door);

    const rects = [
      new GameObjects.Rectangle(
        this,
        this.screen.relativeX(88),
        this.screen.relativeY(17),
        this.screen.relativeX(4),
        this.screen.relativeX(4)
      ),
    ];
    rects.forEach(rect => {
      super.addColliderBox(rect);
    });

    this.time.delayedCall(fadeDuration, () => {
      this.scene.run("dialog", {
        character: "Túlio",
        dialogs: [
          "O que é isso?",
          "Tinha uma escada aqui esse tempo todo?",
          "Para onde será que ela leva?",
        ],
      });
    });
  }

  update() {
    super.update();
  }
}
