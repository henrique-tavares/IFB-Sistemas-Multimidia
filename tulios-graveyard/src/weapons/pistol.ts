import _ from "lodash";
import Tulio from "../entities/tulio";
import Direction from "../scenes/gui/direction";
import { Orientation } from "../types";
import Bullet from "./bullet";
import Weapon, { WeaponType } from "./weapon";

export default class Pistol extends Weapon {
  direction: Direction;
  angle: number;

  constructor(scene: Phaser.Scene, owner: Tulio, ammo: number) {
    super(scene, "weapon:pistol", WeaponType.pistol, 5, ammo, owner, 500);

    this.sprite = scene.add.image(400, 300, "weapon:pistol").setScale(2);

    this.direction = scene.scene.get("gui-scene").data.get("direction") as Direction;

    this.scene.events.on("remove-bullet", (id: number) => {
      this.bulletsInScene.delete(id);
    });
  }

  attack(): void {
    super.attack();

    const id = (_.max(Array.from(this.bulletsInScene.keys())) ?? -1) + 1;

    this.bulletsInScene.set(
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

    const pistolToCursorLine = new Phaser.Geom.Line(
      this.sprite.x - this.scene.cameras.main.scrollX,
      this.sprite.y - this.scene.cameras.main.scrollY,
      this.direction.pointer.x,
      this.direction.pointer.y
    );

    this.angle = Phaser.Geom.Line.Angle(pistolToCursorLine);

    const shouldFlip = _.inRange(Math.abs(this.angle), Math.PI / 2, Math.PI);
    this.sprite.setFlipY(shouldFlip);

    this.sprite.setRotation(this.angle);
  }
}
