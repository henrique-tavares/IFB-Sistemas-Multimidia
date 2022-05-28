import "phaser";
import Weapon from "./weapon";

export default class Entity{
  private currentWeapon: Weapon;
  protected baseDamage: integer;
  
  protected totalHealth: integer;
  public currentHealth: integer;
  public isAlive: boolean = true;

  public get damage(): integer {
    return this.baseDamage + this.currentWeapon.damage;
  }

  public set weapon(weapon: Weapon){
    this.currentWeapon = weapon;
  }

  public get weapon(): Weapon{
    return this.currentWeapon;
  }

  constructor(totalHealth: integer, baseDamage: integer){
    this.totalHealth = totalHealth;
    this.currentHealth = totalHealth;
    this.baseDamage = baseDamage;
  }

  public attack(other: Entity){
    other.currentHealth -= this.damage;
    other.isAlive = other.currentHealth > 0;
  }
}