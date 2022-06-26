import { angleToDirection, angleToRadians, isBetween } from '../scenes/utils/misc';
import Entity from './entity';
import Tulio from './tulio';

export default class Zombie extends Entity {
  private player: Tulio;
  private baseVelocity = 30;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super('characters:zombie', scene.physics.add.sprite(x, y, 'characters:zombie'), 10, 1);
    this.sprite
      .setSize(this.sprite.width, this.sprite.height * 0.2)
      .setScale(2.5)
      .setOrigin(0.5, 0.85)
      .setOffset(0, this.sprite.height * 0.8);

    this.animations = [
      {
        key: `${this.key}-walk-right`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [3, 4, 5] }),
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
        key: `${this.key}-walk-up`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [0, 1, 2] }),
        frameRate: 6,
        repeat: -1,
      },
      {
        key: `${this.key}-walk-down`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [6, 7, 8] }),
        frameRate: 6,
        repeat: -1,
      },
    ];

    this.animations.forEach(animation => {
      scene.anims.create(animation);
    });

    this.player = scene.data.get('player');

    scene.time.addEvent({
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
}
