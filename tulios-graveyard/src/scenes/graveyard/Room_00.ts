import BaseProp from '../../props/baseProp';
import House from '../../props/house';
import Tombstone from '../../props/tombstone';
import Tree from '../../props/tree';
import { GraveyardProps, Orientation } from '../../types';
import { generateNextRoomData } from '../utils/graveyard';
import { clamp, gameScreen, generateRandomArray } from '../utils/misc';
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

    super.addFixedProps(new House(this, this.screen.relativeX(28), this.screen.relativeY(32)));
    super.generateRandomProps(5);
  }

  update() {
    super.update();
  }
}
