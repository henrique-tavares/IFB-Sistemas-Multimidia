import { Scene } from 'phaser';
import Direction from '../scenes/gui/direction';
import Entity from './entity';
import Weapon, { WeaponType } from '../items/weapon';
import PlayerHandler from '../handlers/playerHandler';
import { TulioData } from '../types';

export default class Tulio extends Entity {
  private direction: Direction;
  private frozen = false;

  constructor(scene: Scene, x: number = 400, y: number = 300) {
    super('characters:tulio', scene.physics.add.sprite(x, y, 'characters:tulio'), 10, 1);
    this.sprite
      .setSize(this.sprite.width, this.sprite.height * 0.2)
      .setScale(2.5)
      .setOrigin(0.5, 0.85)
      .setOffset(0, this.sprite.height * 0.8);

    // Weapon for gui testing -> TODO Inventory

    const playerHandler = scene.cache.custom['handlers'].get('playerHandler') as PlayerHandler;
    const { playerData } = playerHandler;

    this.sprite.on('refresh-player-data', (data: Partial<TulioData>) => {
      playerHandler.playerData = {
        ...playerData,
        ...data,
      };
    });

    this.weapon = playerData.weapon;
    this.currentHealth = playerData.health;

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

    this.direction = scene.scene.get('gui-scene').data.get('direction') as Direction;
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

    if (this.direction.shift) {
      this.sprite.setVelocity(this.sprite.body.velocity.x * 2, this.sprite.body.velocity.y * 2);
      this.sprite.body.velocity.limit(120 * 2);
    }

    if (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) {
      this.sprite.play('idle');
    }
  }
}
