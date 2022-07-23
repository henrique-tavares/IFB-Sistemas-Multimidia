import _ from "lodash";
import "phaser";
import Door from "../../props/door";
import Mausoleum from "../../props/mausoleum";
import { RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoomGraveyard from "./baseRoomGraveyard";

export default class Room_56_57 extends BaseRoomGraveyard {
  static key = "graveyard:room_56_57";

  constructor() {
    super(
      Room_56_57.key,
      {
        hasBottom: true,
        hasRight: true,
      },
      {
        up: ["graveyard:room_46", "graveyard:room_47"],
        left: "graveyard:room_55",
      },
      generateNextRoomData({
        up: {
          mode: "double",
          offsets: [0, -100],
        },
        left: {
          mode: "single",
        },
      }),
      RoomSize["1x2"],
      RoomDifficulty.Hard
    );
  }

  create() {
    super.create();

    this.doors = [
      new Door(
        this,
        this.screen.relativeX(90.05),
        this.screen.relativeY(33.5),
        4,
        "graveyard:mausoleum"
      ),
    ];
    this.doors.forEach(door => super.addFixedProps(door));

    const mausoleum = new Mausoleum(this, this.screen.relativeX(90), this.screen.relativeY(30));
    super.addFixedProps(mausoleum);
    super.generateRandomProps(10);

    this.events.once("room-concluded", () => {
      const timeEvent = this.time.addEvent({
        callback: () => {
          if (_.isEmpty(this.cameras.main.cull([mausoleum]))) {
            return;
          }

          if (!this.progressHandler.hasKey) {
            this.progressHandler.searchingForKey = true;
          }

          this.scene.run("dialog", {
            character: "Túlio",
            dialogs: [
              "Ora ora, mas que surpresa, faz tanto tempo que eu não visito o mausóleu.",
              "Espera, a porta do mausoléu tá trancada?",
              "Quem diabos trancou?",
              ...(this.progressHandler.hasKey
                ? [
                    "Hmm, sera que aquela chave que eu peguei mais cedo abre essa porta",
                    "Bom, só há um jeito de descobrir",
                  ]
                : [
                    "Bom, deixa eu pegar a chave que está no meu bolso e...",
                    "Ótimo... A chave desapareceu...",
                    "Eu não tenho um minuto de paz!",
                    "Agora, vou ter que vasculhar esse cemitério em busca dessa maldita chave!",
                  ]),
            ],
          });

          timeEvent.destroy();
        },
        loop: true,
        delay: 1000,
      });
    });
  }

  update() {
    super.update();
  }
}
