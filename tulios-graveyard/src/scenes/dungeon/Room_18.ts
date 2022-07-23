import _ from "lodash";
import "phaser";
import Jorge from "../../entities/jorge";
import Zombie from "../../entities/zombie";
import { fadeDuration } from "../../game";
import { RoomDifficulty } from "../../types";
import BaseRoomDungeon from "./baseRoomDungeon";

export default class Room_18 extends BaseRoomDungeon {
  static key = "dungeon:room_18";

  spawnArea: Phaser.Physics.Arcade.StaticGroup;
  jorge: Jorge;

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

    this.jorge = new Jorge(this, this.screen.relativeX(50), this.screen.relativeY(50));

    this.time.delayedCall(fadeDuration, () => {
      const timeEvent = this.time.addEvent({
        callback: () => {
          if (
            !Phaser.Geom.Rectangle.ContainsRect(
              this.cameras.main.getBounds(),
              this.jorge.sprite.getBounds()
            )
          ) {
            return;
          }
          timeEvent.destroy();

          this.scene.run("dialog", {
            characters: [
              "???",
              "Túlio",
              "Túlio",
              "Túlio",
              "???",
              "???",
              "Túlio",
              "Túlio",
              "Jorge",
              "Jorge",
              "Túlio",
            ],
            dialogs: [
              "O que você está fazendo aqui em baixo?",
              "Eu que te pergunto isso, e mais, quem é você?",
              "Por que está acordando os mortos desse jeito?",
              "Meu cemitério virou uma bagunça, e já não sei mais quantas vezes eu quase morri hoje.",
              "Tulio, me desculpe... Não era essa minha intenção.",
              "Mas eu não vou descansar até ver ela mais uma vez!",
              "Ela... Um momento... Jorge é você?",
              "Se bem que faz tempo desde a última vez que te vi deixar flores no túmulo da Mariana.",
              "Chega dessa conversa!",
              "Túlio, eu te peço, saia daqui e finja que nunca me viu aqui.",
              "Jorge, você sabe muito bem que eu não posso fazer isso.",
            ],
          });
        },
        loop: true,
        delay: 500,
      });
    });

    this.events.on("jorge-die", () => {
      this.time.delayedCall(3000, () => {
        this.scene.run("dialog", {
          character: "Túlio",
          dialogs: [
            "...",
            "Finalmente acabou...",
            "Jorge, por que você teve que ir tão longe...",
            "O mínimo que tenho que fazer agora é enterra-lo ao lado da Mariana, talvez isso traga paz à eles.",
          ],
        });

        this.time.delayedCall(100, () => {
          this.scene.start("end");
        });
      });
    });

    let waveNum = 1;
    this.dispatchWave(waveNum);

    const waveCallback = () => {
      if (waveNum == 3) {
        this.events.off("wave-concluded", waveCallback);
        this.jorge.sprite.clearTint();
        this.events.emit("jorge-die");
        this.jorge.die();
        return;
      }

      waveNum += 1;
      this.dispatchWave(waveNum);
    };
    this.events.on("wave-concluded", waveCallback, this);
  }

  update() {
    super.update();
  }

  dispatchWave(num: number) {
    this.time.delayedCall(2000, () => {
      this.jorge.summon();

      if (num == 3) {
        this.jorge.sprite.setTint(0xff0000);
      }

      this.wave(5 + num * 5);
    });
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
          this.jorge.idle();
          this.jorge.sprite.setTint(0xff0000);
          this.audioHandler.playSfx(this, "person-hit", 0.3);
          this.time.delayedCall(500, () => {
            this.jorge.sprite.clearTint();
          });
          this.events.emit("wave-concluded");
          timeEvent.destroy();
        }
      },
      loop: true,
      delay: 1000,
    });
  }
}
