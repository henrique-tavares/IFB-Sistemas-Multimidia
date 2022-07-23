import ProgressHandler from "../handlers/progressHandler";
import { PlayerCoordinate } from "../types";
import BaseProp from "./baseProp";

export default class Door extends BaseProp {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    variant: 1 | 2 | 3 | 4 | 5,
    destiny: string
  ) {
    super(
      scene,
      x,
      y,
      variant === 5 ? `dungeon:door-${variant}` : `graveyard:door-${variant}`,
      destiny
    );

    switch (variant) {
      case 4:
        this.setScale(1.3);
        this.refreshBody();

        this.setData("hasAnim", true);

        this.anims.create({
          key: "open",
          frames: this.anims.generateFrameNumbers("prop:graveyard:door-4", {
            start: 0,
            end: 5,
          }),
          frameRate: 5,
          repeat: 0,
        });
        break;
      case 5:
        this.setScale(2.5);
        this.refreshBody();

        this.setData("hasAnim", true);

        this.anims.create({
          key: "open",
          frames: this.anims.generateFrameNumbers("prop:dungeon:door-5", {
            start: 0,
            end: 14,
          }),
          frameRate: 8,
          repeat: 0,
        });
        break;
      default:
        this.setOrigin(0.52, 0.5);
        break;
    }

    this.on("collide", () => {
      if (!this.scene.data.get("concluded")) {
        return;
      }

      const getInitialPos = (target: string): PlayerCoordinate | undefined => {
        switch (target) {
          case "graveyard:house":
            return {
              x: {
                relative: false,
                value: 375,
              },
              y: {
                relative: false,
                value: 470,
              },
            };
          case "graveyard:toolshed":
            return {
              x: {
                relative: false,
                value: 400,
              },
              y: {
                relative: false,
                value: 480,
              },
            };
          case "graveyard:mausoleum":
            return {
              x: {
                relative: false,
                value: 100,
              },
              y: {
                relative: false,
                value: 300,
              },
            };
          case "dungeon:room_18":
            return {
              x: {
                relative: false,
                value: 800,
              },
              y: {
                relative: false,
                value: 1000,
              },
            };
          default:
            return;
        }
      };

      const targetRoom = this.getDestiny();
      const initialPos = getInitialPos(targetRoom);

      if (targetRoom.includes("mausoleum")) {
        const progressHandler = this.scene.cache.custom["handlers"].get(
          "progressHandler"
        ) as ProgressHandler;

        if (!progressHandler.hasKey) {
          return;
        }
      }

      if (!initialPos) {
        return;
      }

      if (!this.getData("hasAnim")) {
        this.scene.events.emit("go-to-interior", targetRoom, initialPos);
        return;
      }

      this.play("open");
      this.on("animationcomplete", () => {
        this.scene.events.emit("go-to-interior", targetRoom, initialPos);
      });
    });
  }
}
