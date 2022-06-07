import 'phaser';

export default class Screen {
  readonly width: number;
  readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  relativeY(percentage: number): number {
    return (this.height * percentage) / 100;
  }

  relativeX(percentage: number): number {
    return (this.width * percentage) / 100;
  }

  heightRatio(height: number): number {
    return this.height / height;
  }

  widthRatio(width: number): number {
    return this.width / width;
  }
}
