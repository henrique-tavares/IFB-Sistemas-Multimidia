import Weapon from '../items/weapon';

export default class Entity {
  readonly key: string;
  readonly sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  protected animations: Phaser.Types.Animations.Animation[];

  private _weapon?: Weapon;
  protected baseDamage: number;

  protected totalHealth: number;
  private _currentHealth: number;
  public isAlive: boolean = true;

  public get damage() {
    return this.baseDamage + (this.weapon?.damage ?? 0);
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

  public get weapon() {
    return this._weapon;
  }

  public set weapon(v: Weapon | undefined) {
    this._weapon = v;
    this.sprite.emit('refresh-player-data', {
      weapon: this.weapon,
    });
  }

  public get currentHealth() {
    return this._currentHealth;
  }

  public set currentHealth(v: number) {
    this._currentHealth = v;
    this.sprite.emit('refresh-player-data', {
      health: this.currentHealth,
    });
  }
}
