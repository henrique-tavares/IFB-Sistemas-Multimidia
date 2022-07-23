import { scenesMap } from "../../game";
import AudioHandler from "../../handlers/audioHandler";
import Preloader from "../preloader";
import Screen from "../utils/screen";

export default class End extends Phaser.Scene {
  static key = "end";

  screen: Screen;
  bg: Phaser.GameObjects.Graphics;
  deathText: Phaser.GameObjects.Text;
  audioHandler: AudioHandler;

  constructor() {
    super(End.key);
  }

  create() {
    this.screen = new Screen(this.scale.width, this.scale.height);

    this.scene.manager.scenes
      .map(scene => scene.scene.key)
      .filter(sceneKey => ![End.key, Preloader.key].includes(sceneKey))
      .forEach(sceneKey => {
        this.scene.manager.remove(sceneKey);
        this.scene.manager.add(sceneKey, scenesMap[sceneKey]);
      });

    this.audioHandler = this.cache.custom["handlers"].get("audioHandler") as AudioHandler;

    this.createUI();
  }

  createUI() {
    const deathText = this.add
      .text(this.screen.relativeX(50), this.screen.relativeY(50), "Obrigado por jogar!", {
        fontFamily: "MinimalPixel",
        fontSize: "62px",
        color: "#fff",
      })
      .setOrigin(0.5)
      .setAlpha(0);

    const buttonMenu = this.add
      .image(this.screen.relativeX(35), this.screen.relativeY(75), "death-screen:button_menu")
      .setScale(0.5)
      .setAlpha(0)
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

    const buttonCreditos = this.add
      .image(this.screen.relativeX(65), this.screen.relativeY(75), "title-screen:button_creditos")
      .setScale(0.5)
      .setAlpha(0)
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
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.audioHandler.playSfx(this, "click-button", 0.2);
        this.time.delayedCall(500, () => {
          this.scene.start("credits");
        });
      });

    this.tweens.add({
      targets: [deathText, buttonMenu, buttonCreditos],
      alpha: 1,
      duration: 1000,
    });
  }
}
