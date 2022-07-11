import { GameObjects, Scene } from 'phaser';
import Weapon from '../weapons/weapon';

export default class Entity {
  readonly scene: Scene;
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
    scene: Scene,
    key: string,
    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    totalHealth: number,
    baseDamage: number,
    name?: string
  ) {
    this.scene = scene;
    this.key = key;
    this.sprite = sprite;
    this.sprite.setName(name ?? key);
    this.totalHealth = totalHealth;
    this.currentHealth = totalHealth;
    this.baseDamage = baseDamage;
  }

  public get currentAnimation(): string {
    return this.sprite.anims.currentAnim?.key ?? '';
  }

  attack(other: Entity) {
    other.receiveDamage(this.damage);
  }

  receiveDamage(damage: number){
    this.currentHealth -= damage;
    console.log(this.sprite.name, this.currentHealth);
    this.isAlive = this.currentHealth > 0;

    if(!this.isAlive){
      this.die();
    }
  }

  die(){
    //TODO Death
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
