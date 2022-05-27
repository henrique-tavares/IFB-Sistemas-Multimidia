import { BackgroundBorder, BackgroundBorderConfig, Orientation } from '../types';
import Screen from './screen';

export default class NextRoomArrow {
  orientation: Orientation;
  imageGroup: Phaser.GameObjects.Group;
  scene: Phaser.Scene;
  screen: Screen;
  imageDimensions: { width: number; height: number };

  constructor(scene: Phaser.Scene, screen: Screen, orientation: Orientation, quantity: 1 | 2) {
    this.scene = scene;
    this.screen = screen;
    this.orientation = orientation;
    this.imageDimensions = this.getImageDimensions();

    const spawnPositions = this.getSpawnPosition(quantity);

    this.imageGroup = this.scene.add.group(
      spawnPositions.map(pos => this.scene.add.image(pos.x, pos.y, `gui:arrow-${orientation}`).setVisible(false))
    );

    this.imageGroup.getChildren().forEach(image => {
      this.addTween(image as Phaser.GameObjects.Image);
    });
  }

  private getImageDimensions(): { width: number; height: number } {
    const { width, height } = this.scene.textures.get(`gui:arrow-${this.orientation}`).source[0];

    return { width, height };
  }

  private getSpawnPosition(quantity: 1 | 2) {
    const spawnPosition = (orientation: Orientation, offset: number = 0) => {
      switch (orientation) {
        case 'up':
          return {
            x: this.screen.relativeX(50 + offset),
            y: this.imageDimensions.height,
          };
        case 'right':
          return {
            x: this.screen.relativeX(100) - this.imageDimensions.width,
            y: this.screen.relativeY(50 + offset),
          };
        case 'down':
          return {
            x: this.screen.relativeX(50 + offset),
            y: this.screen.relativeY(100) - this.imageDimensions.height,
          };
        case 'left':
          return {
            x: this.imageDimensions.width,
            y: this.screen.relativeY(50 + offset),
          };
      }
    };

    return quantity == 1
      ? [spawnPosition(this.orientation)]
      : [spawnPosition(this.orientation, -25), spawnPosition(this.orientation, 25)];
  }

  private addTween(image: Phaser.GameObjects.Image) {
    if (['left', 'right'].includes(this.orientation)) {
      this.scene.tweens
        .createTimeline({ loop: -1 })
        .add({
          targets: image,
          x: image.x + image.width / 4,
          duration: 200,
          yoyo: true,
        })
        .add({
          targets: image,
          x: image.x - image.width / 4,
          duration: 200,
          yoyo: true,
        })
        .play();
    }

    if (['up', 'down'].includes(this.orientation)) {
      this.scene.tweens
        .createTimeline({ loop: -1 })
        .add({
          targets: image,
          y: image.y + image.height / 4,
          duration: 200,
          yoyo: true,
        })
        .add({
          targets: image,
          y: image.y - image.height / 4,
          duration: 200,
          yoyo: true,
        })
        .play();
    }
  }

  toggleVisible() {
    this.imageGroup.toggleVisible();
  }
}
