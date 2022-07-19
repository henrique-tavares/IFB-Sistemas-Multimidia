import Tulio from "../entities/tulio";
import BaseLoot, { LootType } from "./BaseLoot";

export default class LootPistol extends BaseLoot {
  value: number;

  constructor(scene: Phaser.Scene, player: Tulio, x: number, y: number, amount: number) {
    super(scene, "loot:pistol-bullet", player, LootType.PistolAmmo, x, y);

    this.value = amount;

    this.spawn();
    this.idle();
  }
}
