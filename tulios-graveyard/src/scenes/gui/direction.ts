import 'phaser';

export default class Direction {
  private keys: {
    w: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
  };
  readonly pointer: Phaser.Input.Pointer;
  private shiftKey: Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene) {
    this.keys = {
      w: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W, true),
      a: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, true),
      s: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S, true),
      d: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, true),
    };

    this.pointer = scene.input.mousePointer;

    this.shiftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT, true);
  }

  get isLeft(): boolean {
    return this.keys.a.isDown;
  }

  get isRight(): boolean {
    return this.keys.d.isDown;
  }

  get isUp(): boolean {
    return this.keys.w.isDown;
  }

  get isDown(): boolean {
    return this.keys.s.isDown;
  }

  get isVertical(): boolean {
    return this.isUp || this.isDown;
  }

  get isHorizontal(): boolean {
    return this.isLeft || this.isRight;
  }

  get shift(): boolean {
    return this.shiftKey.isDown;
  }

  get isPressed(): boolean {
    return Object.values(this.keys).some(key => key.isDown);
  }
}
