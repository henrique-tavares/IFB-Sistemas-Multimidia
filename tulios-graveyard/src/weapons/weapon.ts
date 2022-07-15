import { GameObjects, Scene, Types } from "phaser";
import Tulio from "../entities/tulio";
import Zombie from "../entities/zombie";
import Item from "../items/item";
import { Orientation } from "../types";

export enum WeaponType {
  shovel = 0,
  pistol = 1,
  shotgun = 2,
}

export default abstract class Weapon extends Item {
  readonly key: string;
  readonly sprite: GameObjects.Image;
  readonly type: WeaponType;
  readonly damage: number;
  readonly owner: Tulio | Zombie;

  readonly scene: Scene;
  protected ammunition: number;
  private delay: number;
  private _inDelay: boolean = false;

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

  attack() {
    this._inDelay = true;
    this.scene.time.delayedCall(this.delay, () => {
      this._inDelay = false;
    });
  }
}
