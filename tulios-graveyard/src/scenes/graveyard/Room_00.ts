import House from "../../props/house";
import { GraveyardProp, RoomDifficulty, RoomSize } from "../../types";
import { generateNextRoomData } from "../utils/graveyard";
import BaseRoomGraveyard from "./baseRoomGraveyard";

export default class Room_00 extends BaseRoomGraveyard {
  static key = "graveyard:room_00";

  constructor() {
    super(
      Room_00.key,
      {
        hasTop: true,
        hasLeft: true,
      },
      {
        right: "graveyard:room_01",
        down: "graveyard:room_10",
      },
      generateNextRoomData({
        right: {
          mode: "single",
        },
        down: {
          mode: "single",
        },
      }),
      RoomSize["1x1"],
      RoomDifficulty.Easy
    );
  }

  create() {
    super.create();

    super.addFixedProps(new House(this, this.screen.relativeX(28), this.screen.relativeY(32)));
    super.generateRandomProps(5, [GraveyardProp.Tree1, GraveyardProp.Tree2, GraveyardProp.Tree3]);

    this.events.on("room-concluded", () => {
      this.scene.run("dialog", {
        character: "Túlio",
        dialogs: [
          "Pu@! %$#&!, O que tá rolando no meu cemitério?",
          "Pelo jeito vou precisar da ajuda da minha velha companheira Bala Mansa.",
          "Eu tenho quase certeza que a deixei na cabana, que fica aqui à direita",
        ],
      });
    });
  }

  update() {
    super.update();
  }
}
