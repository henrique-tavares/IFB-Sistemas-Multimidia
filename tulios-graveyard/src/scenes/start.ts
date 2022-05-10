import 'phaser';

export default class Start extends Phaser.Scene {
  directionKeys: {
    w: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
  };
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  movementDirection: {
    isLeft(): boolean;
    isRight(): boolean;
    isUp(): boolean;
    isDown(): boolean;
    isVertical(): boolean;
    isHorizontal(): boolean;
  };

  constructor() {
    super('start');
  }

  getCurrentAnim(sprite: Phaser.GameObjects.Sprite) {
    return sprite.anims.currentAnim?.key ?? '';
  }

  preload() {
    this.load.spritesheet('tulio', 'assets/Tulio.png', {
      frameWidth: 24,
      frameHeight: 32,
    });
  }

  create() {
    this.directionKeys = {
      w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };

    this.player = this.physics.add.sprite(100, 100, 'tulio');

    this.cursors = this.input.keyboard.createCursorKeys();

    this.movementDirection = {
      isLeft: () => this.cursors.left.isDown || this.directionKeys.a.isDown,
      isRight: () => this.cursors.right.isDown || this.directionKeys.d.isDown,
      isUp: () => this.cursors.up.isDown || this.directionKeys.w.isDown,
      isDown: () => this.cursors.down.isDown || this.directionKeys.s.isDown,

      isVertical: () => this.movementDirection.isUp() || this.movementDirection.isDown(),
      isHorizontal: () => this.movementDirection.isLeft() || this.movementDirection.isRight(),
    };

    this.anims.create({
      key: 'walkRight',
      frames: this.anims.generateFrameNumbers('tulio', { frames: [3, 4, 5] }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'walkLeft',
      frames: this.anims.generateFrameNumbers('tulio', { frames: [9, 10, 11] }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'walkUp',
      frames: this.anims.generateFrameNumbers('tulio', { frames: [0, 1, 2] }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'walkDown',
      frames: this.anims.generateFrameNumbers('tulio', { frames: [6, 7, 8] }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('tulio', { frames: [7] }),
      frameRate: 8,
      repeat: -1,
    });

    this.player.setScale(2);
    this.player.setCollideWorldBounds(true);
  }

  update() {
    if (this.movementDirection.isLeft()) {
      if (this.getCurrentAnim(this.player) !== 'walkLeft' && !this.movementDirection.isVertical()) {
        this.player.play('walkLeft');
      }

      this.player.setVelocityX(-120);
    } else if (this.movementDirection.isRight()) {
      if (this.getCurrentAnim(this.player) !== 'walkRight' && !this.movementDirection.isVertical()) {
        this.player.play('walkRight');
      }

      this.player.setVelocityX(120);
    } else {
      this.player.setVelocityX(0);
    }
    if (this.movementDirection.isUp()) {
      if (this.getCurrentAnim(this.player) !== 'walkUp' && !this.movementDirection.isHorizontal()) {
        this.player.play('walkUp');
      }

      this.player.setVelocityY(-120);
    } else if (this.movementDirection.isDown()) {
      if (this.getCurrentAnim(this.player) !== 'walkDown' && !this.movementDirection.isHorizontal()) {
        this.player.play('walkDown');
      }

      this.player.setVelocityY(120);
    } else {
      this.player.setVelocityY(0);
    }

    if (this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0) {
      this.player.play('idle');
    }
  }
}
