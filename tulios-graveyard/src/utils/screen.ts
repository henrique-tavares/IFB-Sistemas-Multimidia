import 'phaser';

export default class Screen {
  private scale: Phaser.Scale.ScaleManager;

  constructor(scale: Phaser.Scale.ScaleManager) {
    this.scale = scale;
  }

  public get height(): number {
    return this.scale.height;
  }

  public get width(): number {
    return this.scale.width;
  }

  relativeY(percentage: number): number {
    return (this.scale.height * percentage) / 100;
  }

  relativeX(percentage: number): number {
    return (this.scale.width * percentage) / 100;
  }

  heightRatio(height: number): number {
    return this.scale.height / height;
  }

  widthRatio(width: number): number {
    return this.scale.width / width;
  }
}
