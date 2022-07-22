import "phaser";
import AudioHandler from "../../handlers/audioHandler";
import Screen from "../utils/screen";

export default class Credits extends Phaser.Scene {
  static key = "credits";

  screen: Screen;

  bg: Phaser.GameObjects.Image;
  audioHandler: AudioHandler;

  constructor() {
    super(Credits.key);
  }

  create() {
    this.screen = new Screen(this.scale.width, this.scale.height);
    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.audioHandler = this.cache.custom["handlers"].get("audioHandler") as AudioHandler;

    this.bg = this.add
      .image(this.screen.relativeX(50), this.screen.relativeY(50), "title-screen:background")
      .setOrigin(0.5);
    this.bg.setScale(this.screen.height / this.bg.height);

    const neptune = this.add
      .image(this.screen.relativeX(20), this.screen.relativeY(20), "us:neptune")
      .setScale(0.305);

    const neptuneName = this.add
      .image(this.screen.relativeX(62), this.screen.relativeY(20), "us:neptune-name")
      .setScale(0.105);

    const lazySeal = this.add
      .image(this.screen.relativeX(80), this.screen.relativeY(60), "us:lazy-seal")
      .setScale(0.15);

    const lazySealName = this.add
      .image(this.screen.relativeX(38), this.screen.relativeY(60), "us:lazy-seal-name")
      .setScale(0.105);

    const neptuneScaleTimeline = this.tweens
      .createTimeline({ loop: -1 })
      .add({
        targets: neptune,
        scale: neptune.scale * 1.05,
        duration: 500,
        yoyo: true,
      })
      .add({
        targets: neptune,
        scale: neptune.scale * 0.95,
        duration: 500,
        yoyo: true,
      });

    const lazySealScaleTimeline = this.tweens
      .createTimeline({ loop: -1 })
      .add({
        targets: lazySeal,
        scale: lazySeal.scale * 1.05,
        duration: 500,
        yoyo: true,
      })
      .add({
        targets: lazySeal,
        scale: lazySeal.scale * 0.95,
        duration: 500,
        yoyo: true,
      });

    const namesRotationTimeline = this.tweens
      .createTimeline({ loop: -1 })
      .add({
        targets: [neptuneName, lazySealName],
        angle: 3,
        duration: 750,
        yoyo: true,
      })
      .add({
        targets: [neptuneName, lazySealName],
        angle: -3,
        duration: 750,
        yoyo: true,
      });

    neptuneScaleTimeline.play();
    lazySealScaleTimeline.play();
    namesRotationTimeline.play();

    const buttonMenu = this.add
      .image(this.screen.relativeX(50), this.screen.relativeY(85), "death-screen:button_menu")
      .setScale(0.5)
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerover", () => {
        this.tweens.add({
          targets: buttonMenu,
          scale: 0.5 * 1.1,
          duration: 200,
        });
      })
      .on("pointerout", () => {
        this.tweens.add({
          targets: buttonMenu,
          scale: 0.5,
          duration: 200,
        });
      })
      .on("pointerdown", () => {
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.audioHandler.playSfx(this, "click-button", 0.2);
        this.time.delayedCall(500, () => {
          this.scene.start("start");
        });
      });
  }

  update() {}
}
