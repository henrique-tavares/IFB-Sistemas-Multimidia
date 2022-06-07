import { GameObjects } from 'phaser';
import Item from './item';

export enum WeaponType {
  shovel = 0,
  pistol = 1,
  shotgun = 2,
}

export default class Weapon extends Item {
  readonly key: string;
  readonly sprite: GameObjects.Image;
  readonly type: WeaponType;
  readonly damage: number;

  private ammunition: number;

  constructor(key: string, type: WeaponType, damage: number) {
    super();
    this.key = key;
    this.type = type;
    this.damage = damage;

    switch (type) {
      case WeaponType.shovel: {
        this.ammunition = Infinity;
        break;
      }
      case WeaponType.pistol: {
        this.ammunition = 6;
        break;
      }
      case WeaponType.shotgun: {
        this.ammunition = 2;
        break;
      }
    }
  }

  public get currentAmmunition(): number {
    return this.ammunition;
  }
}
