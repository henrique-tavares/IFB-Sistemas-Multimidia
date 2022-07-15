import { GameObjects, Scene } from "phaser";
import { Orientation } from "../types";
import Weapon from "../weapons/weapon";

export default abstract class Entity {
  readonly scene: Scene;
  readonly key: string;
  readonly sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  protected animations: Phaser.Types.Animations.Animation[];

  protected baseDamage: number;

  protected totalHealth: number;
  private _currentHealth: number;
  public isAlive: boolean = true;

  public abstract get damage(): number;

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

    this.sprite.on(
      "receive-damage",
      (damage: number) => {
        this.receiveDamage(damage);
      },
      this
    );
  }

  public get currentAnimation(): string {
    return this.sprite.anims.currentAnim?.key ?? "";
  }

  attack(other: Phaser.Types.Physics.Arcade.GameObjectWithBody, damage: number) {
    other.emit("receive-damage", damage);
  }

  receiveDamage(damage: number) {
    this.currentHealth -= damage;
    // console.log(this.sprite.name, this.currentHealth);
    this.isAlive = this.currentHealth > 0;

    if (!this.isAlive) {
      this.die();
      return;
    }

    this.sprite.setTint(0xaa0000);
    this.scene.time.delayedCall(250, () => {
      this.sprite.clearTint();
      this.sprite.emit("post-hit");
    });
  }

  die() {
    this.sprite.disableBody(true);
  }

  public get currentHealth() {
    return this._currentHealth;
  }

  public set currentHealth(v: number) {
    this._currentHealth = v;
  }
}
