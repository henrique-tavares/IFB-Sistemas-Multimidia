import { GameObjects } from "phaser";
import PlayerHandler from "../../handlers/playerHandler";
import Door from "../../props/door";
import HomeLamp from "../../props/home-lamp";
import Sofa from "../../props/sofa";
import Trashcan from "../../props/trashcan";
import WeaponProp from "../../props/weapon";
import { RoomDifficulty } from "../../types";
import { WeaponType } from "../../weapons/weapon";
import BaseRoom from "./baseRoom";

export default class TuliosHouse extends BaseRoom {
  static key = "graveyard:house";

  constructor() {
    super(
      TuliosHouse.key,
      {
        hasTop: true,
        hasLeft: true,
        hasBottom: true,
        hasRight: true
      },
      {},
      {},
      RoomDifficulty.Peaceful
    );
  }

  create() {
    super.create();

    this.player.sprite.setScale(2.8);

    super.addFixedProps(new HomeLamp(this, this.screen.relativeX(35), this.screen.relativeY(53)));
    super.addFixedProps(new Sofa(this, this.screen.relativeX(21.5), this.screen.relativeY(56)));
    super.addFixedProps(new Trashcan(this, this.screen.relativeX(8.75), this.screen.relativeY(54.5)));

    const playerHandler = this.scene.scene.cache.custom["handlers"].get("playerHandler") as PlayerHandler;
    if(!playerHandler.playerData.weapons[0].picked){
      super.addFixedProps(new WeaponProp(this, this.screen.relativeX(54), this.screen.relativeY(88.5), WeaponType.shovel));
    } else {
      this.player.setPosition(365, 470);
    }

    
    this.doors = [new Door(this, this.screen.relativeX(46.75), this.screen.relativeY(91.75), 1, "graveyard:room_00")];

    // this.doors.push(new Door(this, this.screen.relativeX(50), this.screen.relativeY(50), 4, "graveyard:room_00"));
    // this.doors.push(new Door(this, this.screen.relativeX(65), this.screen.relativeY(50), 5, "graveyard:room_00"));

    this.doors.forEach(door => super.addFixedProps(door));

    const rects = [
      new GameObjects.Rectangle(this, this.screen.relativeX(11), this.screen.relativeY(13.5), this.screen.relativeX(9), this.screen.relativeY(19)),
      new GameObjects.Rectangle(this, this.screen.relativeX(31.5), this.screen.relativeY(17.5), this.screen.relativeX(30), this.screen.relativeY(9)),
      new GameObjects.Rectangle(this, this.screen.relativeX(51.25), this.screen.relativeY(16.5), this.screen.relativeX(7.75), this.screen.relativeY(12.5)),
      new GameObjects.Rectangle(this, this.screen.relativeX(57.5), this.screen.relativeY(18), this.screen.relativeX(3.5), this.screen.relativeY(5)),
      new GameObjects.Rectangle(this, this.screen.relativeX(73), this.screen.relativeY(16.5), this.screen.relativeX(4.5), this.screen.relativeY(9)),
      new GameObjects.Rectangle(this, this.screen.relativeX(83), this.screen.relativeY(16), this.screen.relativeX(14.5), this.screen.relativeY(12)),

      new GameObjects.Rectangle(this, this.screen.relativeX(91.5), this.screen.relativeY(30), this.screen.relativeX(7), this.screen.relativeY(9.5)),
      new GameObjects.Rectangle(this, this.screen.relativeX(91.25), this.screen.relativeY(38.25), this.screen.relativeX(4.5), this.screen.relativeY(5.5)),

      new GameObjects.Rectangle(this, this.screen.relativeX(90.5), this.screen.relativeY(83.5), this.screen.relativeX(3.5), this.screen.relativeY(5)),
      new GameObjects.Rectangle(this, this.screen.relativeX(63.5), this.screen.relativeY(86), this.screen.relativeX(11.5), this.screen.relativeY(8)),
      new GameObjects.Rectangle(this, this.screen.relativeX(22), this.screen.relativeY(82), this.screen.relativeX(15.75), this.screen.relativeY(12)),
    ];

    rects.map(rect => {
      super.addColliderBox(rect);
    });
  }

  update() {
    super.update();

    if(this.player.sprite.scale != 2.8){
      this.player.sprite.setScale(2.8);
    }
  }
}
