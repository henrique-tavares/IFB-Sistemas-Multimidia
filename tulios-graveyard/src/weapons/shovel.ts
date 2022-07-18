import { GameObjects, Scene } from "phaser";
import Tulio from "../entities/tulio";
import { Orientation } from "../types";
import Weapon, { WeaponType } from "./weapon";

export default class Shovel extends Weapon {
  readonly owner: Tulio;
  private attackArea: GameObjects.Rectangle | null = null;
  private attackAreaOffset: { x: number; y: number };
  private attackAreaSize: { width: number; height: number };

  constructor(scene: Scene, owner: Tulio, ammo: number) {
    super(scene, "weapon:shovel", WeaponType.shovel, 2, ammo, owner, 1000);

    scene.events.on(
      "shovel-knockback",
      (enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody, facingDirection: Orientation) => {
        this.knockback(enemy, facingDirection);
      }
    );
  }

  attack() {
    super.attack();

    switch (this.owner.facingDirection) {
      case "up":
        this.attackAreaSize = {
          width: 50,
          height: 60,
        };
        this.attackAreaOffset = {
          x: 0,
          y: -(this.attackAreaSize.height / 2),
        };
        break;
      case "right":
        this.attackAreaSize = {
          width: 60,
          height: 50,
        };
        this.attackAreaOffset = {
          x: this.attackAreaSize.width / 2,
          y: 0,
        };
        break;
      case "down":
        this.attackAreaSize = {
          width: 50,
          height: 60,
        };
        this.attackAreaOffset = {
          x: 0,
          y: this.attackAreaSize.height / 2,
        };
        break;
      case "left":
        this.attackAreaSize = {
          width: 60,
          height: 50,
        };
        this.attackAreaOffset = {
          x: -(this.attackAreaSize.width / 2),
          y: 0,
        };
        break;
    }

    this.attackArea = this.createAttackArea(
      this.owner.sprite.x + this.attackAreaOffset.x,
      this.owner.sprite.y + this.attackAreaOffset.y,
      this.attackAreaSize.width,
      this.attackAreaSize.height
    );

    this.scene.events.emit("init-shovel-attack", this.attackArea);

    this.scene.events.on(
      "shovel-attack-concluded",
      () => {
        this.attackArea?.destroy();
        this.attackArea = null;
        this.scene.events.emit("finish-shovel-attack");
      },
      this
    );
  }

  update(): void {
    super.update();

    if (!this.attackArea) {
      return;
    }

    this.attackArea.setPosition(
      this.owner.sprite.x + this.attackAreaOffset.x,
      this.owner.sprite.y + this.attackAreaOffset.y
    );
  }

  knockback(other: Phaser.Types.Physics.Arcade.GameObjectWithBody, direction: Orientation) {
    this.scene.time.addEvent({
      callback: () => {
        switch (direction) {
          case "up":
            other.body.velocity.add(new Phaser.Math.Vector2(0, -100));
            break;
          case "right":
            other.body.velocity.add(new Phaser.Math.Vector2(100, 0));
            break;
          case "down":
            other.body.velocity.add(new Phaser.Math.Vector2(0, 100));
            break;
          case "left":
            other.body.velocity.add(new Phaser.Math.Vector2(-100, 0));
            break;
        }
      },
      repeat: 6,
      delay: 1,
    });
  }

  private createAttackArea(x: number, y: number, width: number, height: number) {
    const attackArea = new GameObjects.Rectangle(this.scene, x, y, width, height);
    this.scene.add.existing(attackArea);
    this.scene.physics.add.existing(attackArea);

    return attackArea;
  }
}
