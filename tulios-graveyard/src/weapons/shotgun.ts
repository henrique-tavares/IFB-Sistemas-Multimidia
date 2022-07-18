import _ from "lodash";
import Tulio from "../entities/tulio";
import Direction from "../scenes/gui/direction";
import Bullet from "./bullet";
import Weapon, { WeaponType } from "./weapon";

export default class Shotgun extends Weapon {
  direction: Direction;
  angle: number;
  bullets: Map<number, Bullet> = new Map();
  bulletsEnemyHitGroup: Phaser.Physics.Arcade.Group;
  bulletsPropHitGroup: Phaser.Physics.Arcade.Group;

  constructor(scene: Phaser.Scene, owner: Tulio, ammo: number) {
    super(scene, "weapon:shotgun", WeaponType.shotgun, 10, ammo, owner, 1000);

    this.sprite = scene.add.image(400, 300, "weapon:shotgun").setScale(2);

    this.direction = scene.scene.get("gui-scene").data.get("direction") as Direction;

    this.scene.events.on("remove-bullet", (id: number) => {
      this.bullets.delete(id);
    });
  }

  attack(): void {
    super.attack();

    const id = (_.max(Array.from(this.bullets.keys())) ?? -1) + 1;

    this.bullets.set(
      id,
      new Bullet(this.scene, this.sprite.x, this.sprite.y, this.damage, this.angle, id)
    );
  }

  update(): void {
    super.update();

    switch (this.owner.facingDirection) {
      case "up":
        this.sprite.setPosition(this.owner.sprite.x + 15, this.owner.sprite.y - 20);
        this.sprite.setDepth(this.owner.sprite.depth - 2);
        break;
      case "right":
        this.sprite.setPosition(this.owner.sprite.x + 8, this.owner.sprite.y - 10);
        this.sprite.setDepth(this.owner.sprite.depth + 2);
        break;
      case "down":
        this.sprite.setPosition(this.owner.sprite.x - 15, this.owner.sprite.y - 10);
        this.sprite.setDepth(this.owner.sprite.depth + 2);
        break;
      case "left":
        this.sprite.setPosition(this.owner.sprite.x - 10, this.owner.sprite.y - 10);
        this.sprite.setDepth(this.owner.sprite.depth - 2);
        break;
    }

    const shotgunToCursorLine = new Phaser.Geom.Line(
      this.sprite.x - this.scene.cameras.main.scrollX,
      this.sprite.y - this.scene.cameras.main.scrollY,
      this.direction.pointer.x,
      this.direction.pointer.y
    );

    this.angle = Phaser.Geom.Line.Angle(shotgunToCursorLine);

    const shouldFlip = _.inRange(Math.abs(this.angle), Math.PI / 2, Math.PI);
    this.sprite.setFlipY(shouldFlip);

    this.sprite.setRotation(this.angle);

    this.bullets.forEach(bullet => {
      bullet.update();
    });
  }
}
