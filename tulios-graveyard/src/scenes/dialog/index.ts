import _ from "lodash";
import Screen from "../utils/screen";

export default class Dialog extends Phaser.Scene {
  static key = "dialog";
  screen: Screen;
  modalBoxText: Phaser.GameObjects.Text;
  backgroundScenes: Phaser.Scene[];
  overlay: Phaser.GameObjects.Graphics;
  keepGoingIconText: Phaser.GameObjects.Text;
  characterBoxText: Phaser.GameObjects.Text;

  constructor() {
    super(Dialog.key);
  }

  create(data: { character?: string; characters?: string[]; dialogs: string[] }) {
    this.screen = new Screen(this.scale.width, this.scale.height);

    this.backgroundScenes = this.scene.manager.getScenes();
    this.scene.bringToTop();

    this.backgroundScenes.forEach(scene => {
      scene.scene.pause();
    });

    this.overlay = this.add
      .graphics({
        x: 0,
        y: 0,
        fillStyle: { color: 0x000000, alpha: 0.1 },
      })
      .fillRect(0, 0, this.screen.width, this.screen.height);

    const modalBox = this.box(50, 85, 80, 20, 0x42291a, 5, 0x98633b);
    this.modalBoxText = this.add.text(this.screen.relativeX(11), this.screen.relativeY(76), "", {
      fontFamily: "PixeloidSans",
      fontSize: "18px",
      wordWrap: {
        width: this.screen.relativeX(70),
      },
    });
    const characterBox = this.box(20, 71.25, 20, 7.5, 0x42291a, 5, 0x98633b);
    this.characterBoxText = this.add.text(
      this.screen.relativeX(11),
      this.screen.relativeY(68),
      data.character ?? "",
      {
        fontFamily: "PixeloidSans",
        fontSize: "32px",
      }
    );

    this.keepGoingIconText = this.add.text(
      this.screen.relativeX(86),
      this.screen.relativeY(90),
      ">>",
      {
        fontFamily: "PixeloidSans",
        fontSize: "18px",
      }
    );

    console.log(data);
    if (data.characters) {
      console.log("buceta");
      const handleNextCharacter = (id: number, last: boolean = false) => {
        console.log("pinto");
        this.characterBoxText.setText(data.characters![id]);
        if (last) {
          return;
        }
        this.events.once("dialogue-complete", (last: boolean = false) =>
          handleNextCharacter(id + 1, last)
        );
      };

      handleNextCharacter(0);
    }

    const [nextDialog, ...rest] = data.dialogs;

    this.runDialog(nextDialog, rest);
  }

  box(
    x: number,
    y: number,
    width: number,
    height: number,
    color: number,
    strokeWidth: number,
    strokeColor: number
  ): Phaser.Physics.Arcade.StaticGroup {
    x = this.screen.relativeX(x);
    y = this.screen.relativeY(y);
    width = this.screen.relativeX(width);
    height = this.screen.relativeY(height);

    return this.physics.add.staticGroup([
      this.add.rectangle(x, y, width, height, color),
      this.add
        .graphics()
        .lineStyle(strokeWidth, strokeColor)
        .strokeRect(x - width / 2, y - height / 2, width, height),
    ]);
  }

  runDialog(dialog: string, nextDialogs: string[]) {
    const dialogText = dialog.split("");
    this.keepGoingIconText.setVisible(false);

    const event = this.time.addEvent({
      callback: () => {
        this.modalBoxText.setText(
          dialogText.slice(0, event.repeat - event.repeatCount + 1).join("")
        );

        if (event.getOverallProgress() == 1) {
          onComplete();
        }
      },
      repeat: dialogText.length - 1,
      delay: 50,
    });

    this.input.once("pointerdown", () => {
      if (event.getOverallProgress() == 1) {
        return;
      }

      this.modalBoxText.setText(dialogText.join(""));
      onComplete();
      event.destroy();
    });

    const onComplete = () => {
      this.keepGoingIconText.setVisible(true);
      this.input.once("pointerdown", () => {
        this.events.emit("dialogue-complete", _.isEmpty(nextDialogs));
        this.modalBoxText.setText("");
        if (_.isEmpty(nextDialogs)) {
          this.scene.stop();
          this.backgroundScenes.forEach(scene => {
            scene.scene.resume();
          });
          return;
        }

        const [nextDialog, ...rest] = nextDialogs;

        this.runDialog(nextDialog, rest);
      });
    };
  }

  fadeIn(ms: number) {
    this.cameras.main.fadeIn(ms, 0, 0, 0);
  }

  fadeOut(ms: number) {
    this.cameras.main.fadeOut(ms, 0, 0, 0);
  }
}
