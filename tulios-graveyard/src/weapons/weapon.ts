import { GameObjects, Scene, Types } from 'phaser';
import Tulio from '../entities/tulio';
import Zombie from '../entities/zombie';
import Item from '../items/item';

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
  
  protected scene: Scene;
  protected ammunition: number;
  protected attackArea: GameObjects.Rectangle;

  constructor(scene: Scene, key: string, type: WeaponType, damage: number, ammunition: number) {
    super();
    this.scene = scene;
    this.key = key;
    this.type = type;
    this.damage = damage;
    this.ammunition = ammunition;

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

  public get attackAreaShape(): GameObjects.Rectangle {
    return this.attackArea;
  }

  update(){
    this.scene.events.once('tulio-attack', this.attack, this);
  }

  attack(owner: Tulio | Zombie){
    console.log("Attack");
  };
}
