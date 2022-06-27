import { delay } from 'lodash';
import { Input, Scene } from 'phaser';
import PlayerHandler from '../handlers/playerHandler';
import Direction from '../scenes/gui/direction';
import { angleToDirection, correctAngle, isBetween } from '../scenes/utils/misc';
import { Orientation, TulioData } from '../types';
import Entity from './entity';

export default class Tulio extends Entity {
  private direction: Direction;
  private frozen = false;
  private isAttacking = false;
  private baseVelocity = 120;

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
        key: `${this.key}-walk-right`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [3, 4, 5] }),
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
        key: `${this.key}-walk-up`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [0, 1, 2] }),
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
        key: `${this.key}-idle-right`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [4] }),
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
        key: `${this.key}-idle-up`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [1] }),
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
        key: `${this.key}-shovel-attack-right`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [27, 28, 29] }),
        duration: 200,
      },
      {
        key: `${this.key}-shovel-attack-left`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [33, 34, 35] }),
        duration: 200,
      },
      {
        key: `${this.key}-shovel-attack-up`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [24, 25, 26] }),
        duration: 200,
      },
      {
        key: `${this.key}-shovel-attack-down`,
        frames: scene.anims.generateFrameNumbers(this.key, { frames: [30, 31, 32] }),
        duration: 200,
      },
    ];

    this.animations.forEach(animation => {
      scene.anims.create(animation);
    });

    this.direction = scene.scene.get('gui-scene').data.get('direction') as Direction;
  }

  public get facingDirection(): Orientation {
    const playerToCursorLine = new Phaser.Geom.Line(
      this.sprite.x,
      this.sprite.y,
      this.direction.pointer.x,
      this.direction.pointer.y
    );

    const angle = Phaser.Geom.Line.Angle(playerToCursorLine);
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

    const { x: velX, y: velY } = this.calculateVelocity();
    this.sprite.setVelocity(velX, velY);

    const anim = `${this.key}-${this.direction.isPressed && this.sprite.body.speed > 0 ? 'walk' : 'idle'}-${
      this.facingDirection
    }`;
    if (!this.isAttacking){
      this.sprite.play(anim, true);
    }

    this.sprite.body.velocity.limit(this.baseVelocity);

    if (this.direction.shift && this.sprite.body.speed > 0) {
      this.sprite.setVelocity(velX * 2, velY * 2);
      this.sprite.body.velocity.limit(this.baseVelocity * 2);
    }

    /* TODO: Funcionando para todas as direções menos esquerda */
    // if(this.direction.pointer.leftButtonDown()){
    //   this.isAttacking = true;
    //   console.log(`${this.key}-${this.weapon?.name}-attack-${this.facingDirection}`);
    //   this.sprite.play(`${this.key}-${this.weapon?.name}-attack-${this.facingDirection}`);
    //   this.sprite.playAfterDelay(anim, 300);
    //   delay(() => this.isAttacking = false, 300);
    // }
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
}
