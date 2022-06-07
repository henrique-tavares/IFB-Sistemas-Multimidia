import Weapon from '../items/weapon';

export default class Entity {
  readonly key: string;
  readonly sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  protected animations: Phaser.Types.Animations.Animation[];

  public weapon?: Weapon;
  protected baseDamage: number;

  protected totalHealth: number;
  public currentHealth: number;
  public isAlive: boolean = true;

  public get damage() {
    return this.baseDamage + this.weapon.damage;
  }

  constructor(
    key: string,
    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    totalHealth: number,
    baseDamage: number
  ) {
    this.key = key;
    this.sprite = sprite;
    this.totalHealth = totalHealth;
    this.currentHealth = totalHealth;
    this.baseDamage = baseDamage;
  }

  public get currentAnimation(): string {
    return this.sprite.anims.currentAnim?.key ?? '';
  }

  attack(other: Entity) {
    other.currentHealth -= this.damage;
    other.isAlive = other.currentHealth > 0;
  }
}
