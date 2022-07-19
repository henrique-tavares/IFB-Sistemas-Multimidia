import Tulio from "../entities/tulio";
import BaseLoot, { LootType } from "./BaseLoot";

export default class LootShotgun extends BaseLoot {
  value: number;

  constructor(scene: Phaser.Scene, player: Tulio, x: number, y: number, amount: number) {
    super(scene, "loot:shotgun-bullet", player, LootType.ShotgunAmmo, x, y);

    this.value = amount;

    this.spawn();
    this.idle();
  }
}
