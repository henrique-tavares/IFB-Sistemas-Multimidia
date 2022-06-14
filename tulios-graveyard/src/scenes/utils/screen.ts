import 'phaser';

export default class Screen {
  readonly width: number;
  readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  relativeY(y: number): number {
    return (this.height * y) / 100;
  }

  relativeX(x: number): number {
    return (this.width * x) / 100;
  }

  heightRatio(height: number): number {
    return this.height / height;
  }

  widthRatio(width: number): number {
    return this.width / width;
  }
}
