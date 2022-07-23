import { PlayerCoordinate } from "../types";
import BaseProp from "./baseProp";

export default class House extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "graveyard:house");

    this.resize({
      width: 0.82,
      height: 0.5,
    });

    this.setOrigin(0.495, 0.57);

    this.addExtraArea(
      new Phaser.GameObjects.Rectangle(
        scene,
        this.x + this.relativeX(-5.5),
        this.y + this.relativeY(21),
        this.relativeX(15),
        this.relativeY(5),
        0x000,
        0
      ),
      new Phaser.GameObjects.Rectangle(
        scene,
        this.x + this.relativeX(-5.5),
        this.y + this.relativeY(21),
        this.relativeX(20),
        this.relativeY(50),
        0x000,
        0
      ).setOrigin(0.5, 0.05),
      (_player, _door) => {
        if (!this.scene.data.get("concluded")) {
          return;
        }

        const initialPos: PlayerCoordinate = {
          x: {
            relative: false,
            value: 375,
          },
          y: {
            relative: false,
            value: 470,
          },
        };

        this.scene.events.emit("go-to-interior", "graveyard:house", initialPos);
      }
    );

    this.addExtraArea(
      new Phaser.GameObjects.Rectangle(
        scene,
        this.x + this.relativeX(27),
        this.y + this.relativeY(26.5),
        this.relativeX(28),
        this.relativeY(10),
        0x000,
        0
      )
    );
  }
}
