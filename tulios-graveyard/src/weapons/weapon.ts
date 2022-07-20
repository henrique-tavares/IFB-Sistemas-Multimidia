import { GameObjects, Scene } from "phaser";
import Tulio from "../entities/tulio";
import AudioHandler from "../handlers/audioHandler";
import Item from "../items/item";

export enum WeaponType {
  shovel = 0,
  pistol = 1,
  shotgun = 2,
}

export default abstract class Weapon extends Item {
  readonly key: string;
  sprite: GameObjects.Image;
  readonly type: WeaponType;
  readonly damage: number;
  readonly owner: Tulio;

  readonly scene: Scene;
  protected ammunition: number;
  private delay: number;
  private _inDelay: boolean = false;
  readonly audioHandler: AudioHandler;

  constructor(
    scene: Scene,
    key: string,
    type: WeaponType,
    damage: number,
    ammunition: number,
    owner: Tulio,
    delay: number
  ) {
    super();
    this.scene = scene;
    this.key = key;
    this.type = type;
    this.damage = damage;
    this.ammunition = ammunition;
    this.owner = owner;
    this.delay = delay;

    this.audioHandler = scene.cache.custom["handlers"].get("audioHandler") as AudioHandler;

    // switch (type) {
    //   case WeaponType.shovel: {
    //     this.ammunition = Infinity;
    //     break;
    //   }
    //   case WeaponType.pistol: {
    //     this.ammunition = 6;
    //     break;
    //   }
    //   case WeaponType.shotgun: {
    //     this.ammunition = 2;
    //     break;
    //   }
    // }
  }

  public get name(): string {
    return this.key.substring(7);
  }

  public get currentAmmunition(): number {
    return this.ammunition;
  }

  public get inDelay(): boolean {
    return this._inDelay;
  }

  // public get attackAreaShape(): GameObjects.Rectangle {
  //   return this.attackArea;
  // }

  update() {
    this.scene.events.once("tulio-attack", this.attack, this);
  }

  handleAmmo(amount: number) {
    this.ammunition += amount;
  }

  handleSfx() {
    if (this.ammunition == 0) {
      this.audioHandler.playSfx(this.scene, "gun-empty", 0.1);
      return;
    }

    switch (this.type) {
      case WeaponType.shovel:
        this.audioHandler.playSfx(this.scene, "shovel-attack", 0.1);
        return;
      case WeaponType.pistol:
        this.audioHandler.playSfx(this.scene, "pistol-fire", 0.1);
        return;
      case WeaponType.shotgun:
        this.audioHandler.playSfx(this.scene, "shotgun-fire", 0.1);
        return;
    }
  }

  attack() {
    this._inDelay = true;
    this.handleSfx();
    this.scene.time.delayedCall(this.delay, () => {
      this._inDelay = false;
    });
  }
}
