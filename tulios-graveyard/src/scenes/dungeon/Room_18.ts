import _ from "lodash";
import "phaser";
import Zombie from "../../entities/zombie";
import { RoomSize, RoomDifficulty } from "../../types";
import { generateNextRoomData, handleNextRoomArrows } from "../utils/dungeon";
import BaseRoom from "./baseRoom";

export default class Room_18 extends BaseRoom {
  static key = "dungeon:room_18";

  spawnArea: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super(
      Room_18.key,
      {
        hasTop: true,
        hasLeft: true,
        hasRight: true,
        hasBottom: true,
      },
      {},
      {},
      RoomDifficulty.Jorge
    );
  }

  create() {
    super.create();

    this.spawnArea = this.physics.add.staticGroup();
    this.spawnArea.addMultiple(
      [
        this.add.rectangle(
          this.screen.relativeX(50),
          this.screen.relativeY(10),
          this.screen.relativeX(75),
          this.screen.relativeY(5)
        ),
        this.add.rectangle(
          this.screen.relativeX(10),
          this.screen.relativeY(50),
          this.screen.relativeX(5),
          this.screen.relativeY(75)
        ),
        this.add.rectangle(
          this.screen.relativeX(50),
          this.screen.relativeY(90),
          this.screen.relativeX(75),
          this.screen.relativeY(5)
        ),
        this.add.rectangle(
          this.screen.relativeX(90),
          this.screen.relativeY(50),
          this.screen.relativeX(5),
          this.screen.relativeY(75)
        ),
      ],
      true
    );

    let waveNum = 1;
    this.dispatchWave(waveNum);

    const waveCallback = () => {
      waveNum += 1;
      this.dispatchWave(waveNum);

      if (waveNum != 3) {
        this.events.once("wave-concluded", waveCallback);
      }
    };
    this.events.once("wave-concluded", waveCallback, this);
  }

  update() {
    super.update();
  }

  dispatchWave(num: number) {
    this.wave(5 + num * 5);
    // this.wave(5);
  }

  wave(enemiesNum: number) {
    for (const _x of _.range(enemiesNum)) {
      const rect = _.sample(this.spawnArea.getChildren())! as Phaser.GameObjects.Rectangle;
      const point = Phaser.Geom.Rectangle.Random(rect.getBounds(), new Phaser.Geom.Point());

      const zombie = new Zombie(this, point.x, point.y, this.enemiesGroup.getChildren().length);
      this.enemiesGroup.add(zombie.sprite);
      this.zombiesInScene.push(zombie);
    }

    const timeEvent = this.time.addEvent({
      callback: () => {
        if (this.enemiesGroup.countActive() == 0) {
          this.events.emit("wave-concluded");
          timeEvent.destroy();
        }
      },
      loop: true,
      delay: 1000,
    });
  }
}
