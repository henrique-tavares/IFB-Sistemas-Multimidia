import Weapon from "./weapon";

export default class Entity{
  protected sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  protected animations: Phaser.Types.Animations.Animation[];
  protected key: string;

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

  constructor(key: string, sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, totalHealth: integer, baseDamage: integer){
    this.key = key;
    this.sprite = sprite;
    this.totalHealth = totalHealth;
    this.currentHealth = totalHealth;
    this.baseDamage = baseDamage;
  }

  public get currentAnimation(): string {
    return this.sprite.anims.currentAnim?.key ?? '';
  }

  public get getSprite(): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody{
    return this.sprite;
  }
  
  attack(other: Entity){
    other.currentHealth -= this.damage;
    other.isAlive = other.currentHealth > 0;
  }

}