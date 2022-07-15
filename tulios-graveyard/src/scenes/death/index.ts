import Tulio from "../../entities/tulio";
import { scenesMap } from "../../game";
import PlayerHandler from "../../handlers/playerHandler";
import { Orientation } from "../../types";
import Preloader from "../preloader";
import Screen from "../utils/screen";

export default class Death extends Phaser.Scene {
  static key = "death";

  screen: Screen;
  bg: Phaser.GameObjects.Graphics;
  deathText: Phaser.GameObjects.Text;

  constructor() {
    super(Death.key);
  }

  create(data: { pos: { x: number; y: number }; facingDirection: Orientation }) {
    const { pos, facingDirection } = data;
    this.screen = new Screen(this.scale.width, this.scale.height);

    this.scene.manager.scenes
      .map(scene => scene.scene.key)
      .filter(sceneKey => ![Death.key, Preloader.key].includes(sceneKey))
      .forEach(sceneKey => {
        this.scene.manager.remove(sceneKey);
        this.scene.manager.add(sceneKey, scenesMap[sceneKey]);
      });

    const playerHandler = this.cache.custom["handlers"].get("playerHandler") as PlayerHandler;
    playerHandler.clean();

    const player = new Tulio(this, pos.x, pos.y);
    player.freeze();
    player.sprite.play(`${player.key}-die-${facingDirection}`);

    player.sprite.once("animationcomplete", () => {
      this.tweens.add({
        targets: player.sprite,
        alpha: 0,
        duration: 1000,
        onComplete: () => {
          this.events.emit("tulio-gone");
        },
      });
    });

    this.events.on("tulio-gone", () => {
      this.createUI();
    });
  }

  createUI() {
    const deathText = this.add
      .text(this.screen.relativeX(50), this.screen.relativeY(50), "You Died!", {
        fontFamily: "MinimalPixel",
        fontSize: "62px",
        color: "#fff",
      })
      .setOrigin(0.5)
      .setAlpha(0);

    const buttonReiniciar = this.add
      .image(this.screen.relativeX(30), this.screen.relativeY(70), "death-screen:button_reiniciar")
      .setScale(0.5)
      .setAlpha(0)
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerover", () => {
        this.tweens.add({
          targets: buttonReiniciar,
          scale: 0.5 * 1.1,
          duration: 200,
        });
      })
      .on("pointerout", () => {
        this.tweens.add({
          targets: buttonReiniciar,
          scale: 0.5,
          duration: 200,
        });
      })
      .on("pointerdown", () => {
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.time.delayedCall(500, () => {
          this.scene.run("gui-scene");
          this.scene.start("graveyard:room_00");
        });
      });

    const buttonVoltar = this.add
      .image(this.screen.relativeX(70), this.screen.relativeY(70), "death-screen:button_voltar")
      .setScale(0.5)
      .setAlpha(0)
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerover", () => {
        this.tweens.add({
          targets: buttonVoltar,
          scale: 0.5 * 1.1,
          duration: 200,
        });
      })
      .on("pointerout", () => {
        this.tweens.add({
          targets: buttonVoltar,
          scale: 0.5,
          duration: 200,
        });
      })
      .on("pointerdown", () => {
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.time.delayedCall(500, () => {
          this.scene.start("start");
        });
      });

    this.tweens.add({
      targets: [deathText, buttonReiniciar, buttonVoltar],
      alpha: 1,
      duration: 1000,
    });
  }
}
