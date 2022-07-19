import { angleToDirection, angleToRadians, isBetween } from "../scenes/utils/misc";
import { Orientation } from "../types";
import Entity from "./entity";
import Tulio from "./tulio";

export default class Zombie extends Entity {
  private player: Tulio;
  private baseVelocity = 50;
  private walkEvent: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene, x: number, y: number, id: number) {
    super(
      scene,
      "characters:zombie",
      scene.physics.add.sprite(x, y, "characters:zombie"),
      10,
      1,
      `characters:zombie:${id}`
    );
    this.sprite
      .setSize(this.sprite.width * 0.75, this.sprite.height * 0.2)
      .setScale(2.5)
      .setOrigin(0.5, 0.85)
      .setOffset(this.sprite.width * 0.15, this.sprite.height * 0.8);

    this.animations = [
      {
        key: `${this.key}-walk-up`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [0, 1, 2] }),
        frameRate: 6,
        repeat: -1,
      },
      {
        key: `${this.key}-walk-right`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [3, 4, 5] }),
        frameRate: 6,
        repeat: -1,
      },
      {
        key: `${this.key}-walk-down`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [6, 7, 8] }),
        frameRate: 6,
        repeat: -1,
      },
      {
        key: `${this.key}-walk-left`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [9, 10, 11] }),
        frameRate: 6,
        repeat: -1,
      },
      {
        key: `${this.key}-die-up`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [12, 13, 14] }),
        frameRate: 6,
      },
      {
        key: `${this.key}-die-right`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [15, 16, 17] }),
        frameRate: 6,
      },
      {
        key: `${this.key}-die-down`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [18, 19, 20] }),
        frameRate: 6,
      },
      {
        key: `${this.key}-die-left`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [21, 22, 23] }),
        frameRate: 6,
      },
    ];

    this.animations.forEach(animation => {
      scene.anims.create(animation);
    });

    this.player = scene.data.get("player");

    this.walkEvent = scene.time.addEvent({
      callback: this.update,
      callbackScope: this,
      delay: 100,
      loop: true,
    });
  }

  private update() {
    const playerToZombieLine = new Phaser.Geom.Line(
      this.sprite.x,
      this.sprite.y,
      this.player.sprite.x,
      this.player.sprite.y
    );
    const angle = Phaser.Geom.Line.Angle(playerToZombieLine) + Math.PI;
    const correctedAngle = angle < 0 ? -angle : Math.PI - angle + Math.PI;

    this.sprite.body.setVelocity(
      -Math.cos(correctedAngle) * this.baseVelocity,
      Math.sin(correctedAngle) * this.baseVelocity
    );
    this.sprite.body.velocity.limit(30);

    const mirroredAngle = (correctedAngle + Math.PI) % (Math.PI * 2);

    const anim = `${this.key}-walk-${angleToDirection(mirroredAngle)}`;
    if (this.currentAnimation != anim) {
      this.sprite.play(anim);
    }
  }

  attack(other: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
    super.attack(other, this.damage);
    other.emit("hit");
  }

  public get facingDirection(): Orientation {
    return ["up", "right", "down", "left"].find(orientation =>
      this.currentAnimation.includes(orientation)
    )! as Orientation;
  }

  die() {
    this.sprite.setMaxVelocity(0);
    this.walkEvent.destroy();
    this.sprite.play(`${this.key}-die-${this.facingDirection}`);
    this.sprite.once(
      "animationcomplete",
      () => {
        super.die();
      },
      this
    );
  }

  public get damage(): number {
    return this.baseDamage;
  }
}
