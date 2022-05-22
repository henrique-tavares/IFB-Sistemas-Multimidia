import { BackgroundBorder, BackgroundBorderConfig, Orientation } from '../types';
import Screen from './screen';

export default class NextRoomArrow {
  orientation: Orientation;
  image: Phaser.GameObjects.Image;
  scene: Phaser.Scene;
  screen: Screen;

  constructor(scene: Phaser.Scene, screen: Screen, orientation: Orientation) {
    this.scene = scene;
    this.screen = screen;
    this.orientation = orientation;

    const spawnPosition = this.getSpawnPosition();

    this.image = this.scene.add.image(spawnPosition.x, spawnPosition.y, `gui:arrow-${orientation}`).setVisible(false);

    this.addTween();
  }

  private getSpawnPosition() {
    const spawnPosition: {
      [Key in Orientation]: { x: number; y: number };
    } = {
      up: {
        x: this.screen.relativeX(50),
        y: this.screen.relativeY(5),
      },
      right: {
        x: this.screen.relativeX(95),
        y: this.screen.relativeY(50),
      },
      down: {
        x: this.screen.relativeX(50),
        y: this.screen.relativeY(95),
      },
      left: {
        x: this.screen.relativeX(5),
        y: this.screen.relativeY(50),
      },
    };

    return spawnPosition[this.orientation];
  }

  private addTween() {
    if (['left', 'right'].includes(this.orientation)) {
      this.scene.tweens
        .createTimeline({ loop: -1 })
        .add({
          targets: this.image,
          x: this.image.x + this.screen.relativeX(0.5),
          duration: 200,
          yoyo: true,
        })
        .add({
          targets: this.image,
          x: this.image.x - this.screen.relativeX(0.5),
          duration: 200,
          yoyo: true,
        })
        .play();
    }

    if (['up', 'down'].includes(this.orientation)) {
      this.scene.tweens
        .createTimeline({ loop: -1 })
        .add({
          targets: this.image,
          y: this.image.y + this.screen.relativeY(0.5),
          duration: 200,
          yoyo: true,
        })
        .add({
          targets: this.image,
          y: this.image.y - this.screen.relativeY(0.5),
          duration: 200,
          yoyo: true,
        })
        .play();
    }
  }

  toggleVisible() {
    this.image.setVisible(!this.image.visible);
  }
}
