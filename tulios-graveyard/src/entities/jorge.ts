import Entity from "./entity";

export default class Jorge extends Entity {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, "characters:jorge", scene.physics.add.sprite(x, y, "characters:jorge"), 10, 0);

    this.sprite
      .setSize(this.sprite.width * 0.5, this.sprite.height * 0.2)
      .setScale(3)
      .setOrigin(0.5, 0.85)
      .setOffset(this.sprite.width * 0.25, this.sprite.height * 0.8);

    this.animations = [
      {
        key: "idle",
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [0, 1, 2, 3] }),
        frameRate: 4,
        repeat: -1,
      },
      {
        key: "summoning",
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [4, 5] }),
        frameRate: 6,
        repeat: -1,
      },
      {
        key: "die",
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [8, 9, 10] }),
        frameRate: 6,
      },
    ];
    this.animations.forEach(anim => {
      this.sprite.anims.create(anim);
    });

    this.idle();
  }

  idle() {
    if (this.currentAnimation == "idle") {
      return;
    }

    this.sprite.play("idle");
  }

  summon() {
    if (this.currentAnimation == "summoning") {
      return;
    }

    this.sprite.play("summoning");
  }

  die() {
    if (this.currentAnimation == "die") {
      return;
    }

    console.log("hdfsjldfh");

    this.sprite.play("die");

    this.sprite.once("animationcomplete", () => {
      super.die();
    });
  }

  get damage(): number {
    return 0;
  }
}
