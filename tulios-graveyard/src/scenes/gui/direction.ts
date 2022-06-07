import 'phaser';

export default class Direction {
  private keys: {
    w: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
  };
  private shiftKey: Phaser.Input.Keyboard.Key;
  private keycount: number = 0;
  private capped: boolean = false;

  constructor(scene: Phaser.Scene) {
    this.keys = {
      w: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W, true),
      a: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, true),
      s: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S, true),
      d: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, true),
    };

    this.shiftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT, true);

    scene.input.keyboard.addListener('keycount', (count: number) => {
      this.keycount += count;

      if (this.keycount == 2) {
        scene.input.keyboard.emit('capKeys');
        this.capped = true;
        return;
      }

      if (this.keycount < 2 && this.capped) {
        scene.input.keyboard.emit('freeKeys');
      }
    });

    Object.values(this.keys).forEach(key => {
      key.addListener('capKeys', () => {
        if (key.isUp) {
          key.enabled = false;
        }
      });
      key.addListener('freeKeys', () => {
        if (!key.enabled) {
          key.enabled = true;
        }
      });
      key.on('down', () => key.emit('keycount', 1));
      key.on('up', () => key.emit('keycount', -1));
    });
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
}
