import 'phaser';

export default class Direction {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys: {
    w: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
  };

  constructor(scene: Phaser.Scene) {
    this.keys = {
      w: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W, true),
      a: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, true),
      s: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S, true),
      d: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, true),
    };

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  get isLeft(): boolean {
    return this.cursors.left.isDown || this.keys.a.isDown;
  }

  get isRight(): boolean {
    return this.cursors.right.isDown || this.keys.d.isDown;
  }

  get isUp(): boolean {
    return this.cursors.up.isDown || this.keys.w.isDown;
  }

  get isDown(): boolean {
    return this.cursors.down.isDown || this.keys.s.isDown;
  }

  get isVertical(): boolean {
    return this.isUp || this.isDown;
  }

  get isHorizontal(): boolean {
    return this.isLeft || this.isRight;
  }

  get shift(): boolean {
    return this.cursors.shift.isDown;
  }
}
