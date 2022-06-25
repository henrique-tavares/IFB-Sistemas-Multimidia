import Zombie from '../../entities/zombie';
import House from '../../props/house';
import { GraveyardProp, RoomDifficulty, RoomSize } from '../../types';
import Direction from '../gui/direction';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_00 extends BaseRoom {
  staticProps: Phaser.Physics.Arcade.StaticGroup;
  dynamicSprites: Phaser.Physics.Arcade.Sprite[];
  line: Phaser.GameObjects.Line;
  cursor: Phaser.Input.Pointer;
  zombie: Zombie;

  constructor() {
    super(
      'graveyard:room_00',
      {
        hasTop: true,
        hasLeft: true,
      },
      {
        right: 'graveyard:room_01',
        down: 'graveyard:room_10',
      },
      generateNextRoomData({
        right: {
          mode: 'single',
        },
        down: {
          mode: 'single',
        },
      }),
      RoomSize['1x1'],
      RoomDifficulty.Easy
    );
  }

  create() {
    super.create();

    super.addFixedProps(new House(this, this.screen.relativeX(28), this.screen.relativeY(32)));
    super.generateRandomProps(5, [GraveyardProp.Tree1, GraveyardProp.Tree2, GraveyardProp.Tree3]);
  }

  update() {
    super.update();
  }
}
