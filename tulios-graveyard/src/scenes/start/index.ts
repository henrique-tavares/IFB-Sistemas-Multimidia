import "phaser";
import AudioHandler from "../../handlers/audioHandler";
import Screen from "../utils/screen";

export default class Start extends Phaser.Scene {
  static key = "start";

  screen: Screen;

  bg: Phaser.GameObjects.Image;
  title: Phaser.GameObjects.Image;
  audioHandler: AudioHandler;

  constructor() {
    super(Start.key);
  }

  preload() {}

  create() {
    this.screen = new Screen(this.scale.width, this.scale.height);
    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.bg = this.add
      .image(this.screen.relativeX(50), this.screen.relativeY(50), "title-screen:background")
      .setOrigin(0.5);
    this.bg.setScale(this.screen.height / this.bg.height);

    this.title = this.add
      .image(this.screen.relativeX(50), this.screen.relativeY(30), "title-screen:title")
      .setOrigin(0.5);
    this.title.setScale(this.screen.widthRatio(this.title.width) * 0.8);

    this.audioHandler = this.cache.custom["handlers"].get("audioHandler") as AudioHandler;
    this.audioHandler.handleBackgroundMusic(this);

    const titleRotationTimeline = this.tweens
      .createTimeline({ loop: -1 })
      .add({
        targets: this.title,
        angle: 3,
        duration: 750,
        yoyo: true,
      })
      .add({
        targets: this.title,
        angle: -3,
        duration: 750,
        yoyo: true,
      });

    const titleScaleTimeline = this.tweens
      .createTimeline({ loop: -1 })
      .add({
        targets: this.title,
        scale: this.title.scale * 1.05,
        duration: 500,
        yoyo: true,
      })
      .add({
        targets: this.title,
        scale: this.title.scale * 0.95,
        duration: 500,
        yoyo: true,
      });

    titleRotationTimeline.play();
    titleScaleTimeline.play();

    const buttonIniciar = this.add
      .image(this.screen.relativeX(50), this.screen.relativeY(70), "title-screen:button_iniciar")
      .setScale(0.5)
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerover", () => {
        this.tweens.add({
          targets: buttonIniciar,
          scale: 0.5 * 1.1,
          duration: 200,
        });
      })
      .on("pointerout", () => {
        this.tweens.add({
          targets: buttonIniciar,
          scale: 0.5,
          duration: 200,
        });
      })
      .on("pointerdown", () => {
        this.audioHandler.playSfx(this, "click-button", 0.2);
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.time.delayedCall(500, () => {
          this.scene.run("gui-scene");
          this.scene.start("graveyard:house");
        });
      });

    const buttonCreditos = this.add
      .image(0, 0, "title-screen:button_creditos")
      .setScale(0.5)
      .setPosition(this.screen.relativeX(50), this.screen.relativeY(85))
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerover", () => {
        this.tweens.add({
          targets: buttonCreditos,
          scale: 0.5 * 1.1,
          duration: 200,
        });
      })
      .on("pointerout", () => {
        this.tweens.add({
          targets: buttonCreditos,
          scale: 0.5,
          duration: 200,
        });
      })
      .on("pointerdown", () => {
        this.audioHandler.playSfx(this, "click-button", 0.2);
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.time.delayedCall(500, () => {
          this.scene.start("credits");
        });
      });
  }

  update() {}
}
