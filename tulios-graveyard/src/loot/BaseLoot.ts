import _ from "lodash";
import Tulio from "../entities/tulio";

export enum LootType {
  PistolAmmo,
  ShotgunAmmo,
}

export default abstract class BaseLoot {
  scene: Phaser.Scene;
  sprite: Phaser.GameObjects.Sprite;
  type: LootType;
  player: Tulio;
  abstract value: number;

  constructor(
    scene: Phaser.Scene,
    spriteKey: string,
    player: Tulio,
    type: LootType,
    x: number,
    y: number
  ) {
    this.scene = scene;
    this.sprite = scene.add.sprite(x, y, spriteKey);
    this.type = type;
    this.player = player;
  }

  spawn() {
    do {
      const currPos = new Phaser.Math.Vector2(this.sprite.x, this.sprite.y);

      const angle = _.random(0, Math.PI * 2, true);
      const diffPos = new Phaser.Math.Vector2(Math.cos(angle) * 40, Math.sin(angle) * 40);

      const newPos = currPos.add(diffPos);

      this.sprite.setPosition(newPos.x, newPos.y);
    } while (
      !Phaser.Geom.Rectangle.ContainsRect(
        this.scene.cameras.main.getBounds(),
        this.sprite.getBounds()
      )
    );

    const lootOverlap = this.scene.physics.add.overlap(this.sprite, this.player.sprite, () => {
      const success = this.player.pickupLoot(this);

      if (success) {
        lootOverlap.destroy();
        this.sprite.destroy(true);
      }
    });
  }

  idle() {
    this.scene.tweens.add({
      targets: this.sprite,
      y: this.sprite.y + 10,
      duration: 500,
      yoyo: true,
      loop: -1,
    });
  }
}
