import House from '../../props/house';
import Tombstone from '../../props/tombstone';
import Tree from '../../props/tree';
import { generateNextRoomData } from '../utils/graveyard';
import BaseRoom from './baseRoom';

export default class Room_00 extends BaseRoom {
  staticProps: Phaser.Physics.Arcade.StaticGroup;
  dynamicSprites: Phaser.Physics.Arcade.Sprite[];

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
      })
    );
  }

  create() {
    super.create();

    super.addProps(
      new House(this, this.screen.relativeX(28), this.screen.relativeY(32)),
      new Tree(this, this.screen.relativeX(15), this.screen.relativeY(90), 1),
      new Tree(this, this.screen.relativeX(60), this.screen.relativeY(25), 2),
      new Tree(this, this.screen.relativeX(80), this.screen.relativeY(40), 3)
    );
  }

  update() {
    super.update();
  }
}
