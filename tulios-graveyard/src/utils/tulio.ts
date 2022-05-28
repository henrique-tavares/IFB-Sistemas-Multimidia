import 'phaser';
import Direction from './direction';
import Entity from './entity';
import Weapon, { WeaponType } from './weapon';

export default class Tulio extends Entity{
  readonly sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  readonly animations: Phaser.Types.Animations.Animation[];
  readonly key: string = 'characters:tulio';
  private direction: Direction;
  private frozen: boolean = false;

  constructor(scene: Phaser.Scene) {
    super(10, 1);

    this.sprite = scene.physics.add.sprite(100, 100, this.key);

    // Weapon for gui testing -> TODO Inventory
    this.weapon = new Weapon('weapon:shovel', WeaponType.shovel, 2);

    this.animations = [
      {
        key: 'walkRight',
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [3, 4, 5] }),
        frameRate: 8,
        repeat: -1,
      },
      {
        key: 'walkLeft',
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [9, 10, 11] }),
        frameRate: 8,
        repeat: -1,
      },
      {
        key: 'walkUp',
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [0, 1, 2] }),
        frameRate: 8,
        repeat: -1,
      },
      {
        key: 'walkDown',
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [6, 7, 8] }),
        frameRate: 8,
        repeat: -1,
      },
      {
        key: 'idle',
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [7] }),
        frameRate: 8,
        repeat: -1,
      },
    ];

    this.animations.forEach(animation => {
      scene.anims.create(animation);
    });

    this.direction = scene.scene.get('ui-scene').data.get('direction') as Direction;
  }

  public get currentAnimation(): string {
    return this.sprite.anims.currentAnim?.key ?? '';
  }

  setPosition(x: number, y: number) {
    this.sprite.setPosition(x, y);
  }

  freeze() {
    this.frozen = true;
  }

  unfreeze() {
    this.frozen = false;
  }

  handleSpriteAnimation() {
    if (this.frozen) {
      return;
    }

    if (this.direction.isLeft) {
      if (this.currentAnimation !== 'walkLeft' && !this.direction.isVertical) {
        this.sprite.play('walkLeft');
      }

      this.sprite.setVelocityX(-120);
    } else if (this.direction.isRight) {
      if (this.currentAnimation !== 'walkRight' && !this.direction.isVertical) {
        this.sprite.play('walkRight');
      }

      this.sprite.setVelocityX(120);
    } else {
      this.sprite.setVelocityX(0);
    }

    if (this.direction.isUp) {
      if (this.currentAnimation !== 'walkUp' && !this.direction.isHorizontal) {
        this.sprite.play('walkUp');
      }

      this.sprite.setVelocityY(-120);
    } else if (this.direction.isDown) {
      if (this.currentAnimation !== 'walkDown' && !this.direction.isHorizontal) {
        this.sprite.play('walkDown');
      }

      this.sprite.setVelocityY(120);
    } else {
      this.sprite.setVelocityY(0);
    }

    this.sprite.body.velocity.limit(120);

    if (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) {
      this.sprite.play('idle');
    }
  }
}
