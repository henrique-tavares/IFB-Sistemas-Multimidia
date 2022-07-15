import _ from "lodash";
import { correctAngle } from "../scenes/utils/misc";

export default class Bullet {
  scene: Phaser.Scene;
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  id: number;
  enemyHitArea: Phaser.GameObjects.Rectangle;
  propHitArea: Phaser.GameObjects.Rectangle;
  damage: number;
  rotation: number;
  speed = 500;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    damage: number,
    rotation: number,
    id: number
  ) {
    this.sprite = scene.physics.add.sprite(x, y, "weapon:bullet").setScale(0.5);

    this.scene = scene;

    this.id = id;

    this.sprite.setRotation(rotation);
    this.sprite.setFlipY(_.inRange(Math.abs(rotation), Math.PI / 2, Math.PI));

    const angle = correctAngle(rotation + Math.PI);
    this.sprite.setVelocity(-Math.cos(angle) * this.speed, Math.sin(angle) * this.speed);

    this.enemyHitArea = new Phaser.GameObjects.Rectangle(
      this.scene,
      x,
      y,
      this.sprite.displayWidth,
      40
    );
    this.scene.add.existing(this.enemyHitArea);
    this.scene.physics.add.existing(this.enemyHitArea);

    this.propHitArea = new Phaser.GameObjects.Rectangle(
      this.scene,
      x,
      y,
      this.sprite.displayWidth,
      this.sprite.displayHeight
    ).setOrigin();
    this.scene.add.existing(this.propHitArea);
    this.scene.physics.add.existing(this.propHitArea);

    this.scene.events.emit("add-bullet-prop-collider", this.propHitArea);
    this.scene.events.emit("init-bullet-attack", this.enemyHitArea);

    this.propHitArea.on("prop-hit", () => {
      this.destroy();
    });

    this.enemyHitArea.on("enemy-hit", (enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody) => {
      console.log("fhdskjhdjh");
      this.knockback(enemy);
      this.destroy();
    });

    this.damage = damage;
    this.rotation = rotation;
  }

  update() {
    this.enemyHitArea.setPosition(
      this.sprite.x,
      this.sprite.y + this.enemyHitArea.displayHeight / 2
    );

    this.propHitArea.setPosition(this.sprite.x, this.sprite.y);

    if (
      !Phaser.Geom.Rectangle.ContainsPoint(
        this.scene.cameras.main.getBounds(),
        new Phaser.Geom.Point(this.sprite.x, this.sprite.y)
      )
    ) {
      this.destroy();
    }
  }

  destroy() {
    console.log(`bala #${this.id} fora`);
    this.scene.events.emit("remove-bullet", this.id);
    this.sprite.destroy(true);
    this.enemyHitArea.destroy(true);
    this.propHitArea.destroy(true);
  }

  knockback(enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
    const knockbackVector = new Phaser.Math.Vector2(
      this.sprite.body.velocity.divide(new Phaser.Math.Vector2(5, 5))
    );
    this.scene.time.addEvent({
      callback: () => {
        enemy.body.velocity.add(knockbackVector);
      },
      repeat: 2,
      delay: 1,
    });
  }
}
