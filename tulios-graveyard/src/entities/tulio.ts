import { Geom, Scene } from "phaser";
import PlayerHandler from "../handlers/playerHandler";
import Direction from "../scenes/gui/direction";
import { angleToDirection, correctAngle } from "../scenes/utils/misc";
import { Orientation, TulioData } from "../types";
import Shovel from "../weapons/shovel";
import Weapon, { WeaponType } from "../weapons/weapon";
import Entity from "./entity";

export default class Tulio extends Entity {
  private direction: Direction;
  private frozen = false;
  private baseVelocity = 120;
  private _weapon?: Weapon;
  private invencible = false;

  public isAttacking = false;

  readonly scene: Scene;
  readonly sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(scene: Scene, x: number = 400, y: number = 300) {
    super(scene, "characters:tulio", scene.physics.add.sprite(x, y, "characters:tulio"), 10, 1);

    this.scene = scene as Scene;

    this.sprite
      .setSize(this.sprite.width * 0.5, this.sprite.height * 0.2)
      .setScale(2.5)
      .setOrigin(0.5, 0.85)
      .setOffset(this.sprite.width * 0.25, this.sprite.height * 0.8);

    // Weapon for gui testing -> TODO Inventory

    const playerHandler = scene.cache.custom["handlers"].get("playerHandler") as PlayerHandler;
    const { playerData } = playerHandler;

    this.sprite.on("refresh-player-data", (data: Partial<TulioData>) => {
      playerHandler.playerData = {
        ...playerData,
        ...data,
      };
      scene.scene.get("gui-scene").events.emit("refresh-player-data", playerHandler.playerData);
    });

    this.weapon = playerData.weapon;

    this.currentHealth = playerData.health;

    this.animations = [
      {
        key: `${this.key}-walk-up`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [0, 1, 2] }),
        frameRate: 8,
        repeat: -1,
      },
      {
        key: `${this.key}-walk-right`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [3, 4, 5] }),
        frameRate: 8,
        repeat: -1,
      },
      {
        key: `${this.key}-walk-down`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [6, 7, 8] }),
        frameRate: 8,
        repeat: -1,
      },
      {
        key: `${this.key}-walk-left`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [9, 10, 11] }),
        frameRate: 8,
        repeat: -1,
      },

      {
        key: `${this.key}-idle-up`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [1] }),
        frameRate: 8,
        repeat: -1,
      },
      {
        key: `${this.key}-idle-right`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [4] }),
        frameRate: 8,
        repeat: -1,
      },
      {
        key: `${this.key}-idle-down`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [7] }),
        frameRate: 8,
        repeat: -1,
      },
      {
        key: `${this.key}-idle-left`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [10] }),
        frameRate: 8,
        repeat: -1,
      },
      {
        key: `${this.key}-shovel-attack-up`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [24, 25, 26] }),
        duration: 150,
      },
      {
        key: `${this.key}-shovel-attack-right`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [27, 28, 29] }),
        duration: 150,
      },
      {
        key: `${this.key}-shovel-attack-down`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [30, 31, 32] }),
        duration: 150,
      },
      {
        key: `${this.key}-shovel-attack-left`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [33, 34, 35] }),
        duration: 150,
      },
      {
        key: `${this.key}-die-up`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [36, 37, 38] }),
        duration: 1500,
      },
      {
        key: `${this.key}-die-right`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [39, 40, 41] }),
        duration: 1500,
      },
      {
        key: `${this.key}-die-down`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [42, 43, 44] }),
        duration: 1500,
      },
      {
        key: `${this.key}-die-left`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [45, 46, 47] }),
        duration: 1500,
      },
    ];

    this.animations.forEach(animation => {
      scene.anims.create(animation);
    });

    this.sprite.on(
      "hit",
      () => {
        this.sprite.toggleData("invencible");

        this.sprite.once("post-hit", () => {
          const event = this.scene.time.addEvent({
            callback: () => {
              if (!this.sprite.visible) {
                this.sprite.setVisible(true);
              } else {
                this.sprite.setVisible(false);
              }

              if (event.getOverallProgress() == 1) {
                this.sprite.toggleData("invencible");
              }
            },
            repeat: 19,
            delay: 50,
          });
        });
      },
      this
    );

    this.direction = scene.scene.get("gui-scene").data.get("direction") as Direction;
  }

  public get damage(): number {
    return this.baseDamage + (this.weapon?.damage ?? 0);
  }

  public get weapon() {
    return this._weapon;
  }

  public set weapon(val) {
    this._weapon = val;
    this.sprite.emit("refresh-player-data", {
      weapon: this.weapon,
    });
  }

  public get currentHealth() {
    return super.currentHealth;
  }

  public set currentHealth(val: number) {
    super.currentHealth = val;
    this.sprite.emit("refresh-player-data", {
      health: this.currentHealth,
    });
  }

  public get facingDirection(): Orientation {
    const playerToCursorLine = new Geom.Line(
      this.sprite.x - this.scene.cameras.main.scrollX,
      this.sprite.y - this.scene.cameras.main.scrollY,
      this.direction.pointer.x,
      this.direction.pointer.y
    );

    const angle = Geom.Line.Angle(playerToCursorLine);
    const correctedAngle = correctAngle(angle);

    return angleToDirection(correctedAngle);
  }

  setPosition(x: number, y: number) {
    this.sprite.setPosition(x, y);
  }

  freeze() {
    this.frozen = true;
    this.sprite.setVelocity(0);
    this.sprite.body.velocity.limit(0);
  }

  unfreeze() {
    this.frozen = false;
    this.sprite.body.velocity.limit(120);
  }

  update() {
    if (this.frozen) {
      return;
    }

    this.weapon?.update();

    const { x: velX, y: velY } = this.calculateVelocity();
    this.sprite.setVelocity(velX, velY);

    const anim = `${this.key}-${
      this.direction.isPressed && this.sprite.body.speed > 0 ? "walk" : "idle"
    }-${this.facingDirection}`;

    if (!this.isAttacking) {
      this.sprite.play(anim, true);
    }

    this.sprite.body.velocity.limit(this.baseVelocity);

    if (this.direction.shift && this.sprite.body.speed > 0) {
      this.sprite.setVelocity(velX * 2, velY * 2);
      this.sprite.body.velocity.limit(this.baseVelocity * 2);
    }

    if (this.direction.pointer.leftButtonDown()) {
      this.handleAttack(anim);
    }
  }

  calculateVelocity(): { x: number; y: number } {
    let x = 0;
    let y = 0;

    if (this.direction.isLeft) {
      x -= this.baseVelocity;
    }

    if (this.direction.isRight) {
      x += this.baseVelocity;
    }

    if (this.direction.isUp) {
      y -= this.baseVelocity;
    }

    if (this.direction.isDown) {
      y += this.baseVelocity;
    }

    return { x, y };
  }

  attack(enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
    super.attack(enemy, this.damage);
  }

  handleAttack(animKey: string) {
    if (!this.weapon || this.isAttacking || this.weapon?.inDelay) {
      return;
    }

    switch (this.weapon.type) {
      case WeaponType.shovel:
        this.scene.time.delayedCall(100, () => {
          this.weapon!.attack();
        });

        this.isAttacking = true;
        this.sprite.play(`${this.key}-${this.weapon?.name}-attack-${this.facingDirection}`);

        this.sprite.once("animationcomplete", () => {
          this.isAttacking = false;
          this.sprite
            .setSize(this.sprite.width * 0.5, this.sprite.height * 0.2)
            .setScale(2.5)
            .setOrigin(0.5, 0.85)
            .setOffset(this.sprite.width * 0.25, this.sprite.height * 0.8);
          this.sprite.playAfterDelay(animKey, 100);

          this.weapon?.scene.events.emit("shovel-attack-concluded");
        });

        break;
      case WeaponType.pistol:
        this.weapon.attack();
        break;
    }
  }

  die() {
    super.die();

    this.scene.scene.start("death", {
      pos: {
        x: this.sprite.x - this.scene.cameras.main.scrollX,
        y: this.sprite.y - this.scene.cameras.main.scrollY,
      },
      facingDirection: this.facingDirection,
    });
  }
}
