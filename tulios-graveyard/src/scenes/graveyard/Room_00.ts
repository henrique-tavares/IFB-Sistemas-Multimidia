import Tombstone from '../../props/tombstone';
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

    this.staticProps = this.physics.add.staticGroup();
    this.staticProps.add(new Tombstone(this, this.screen.relativeX(50), this.screen.relativeY(50), 1));

    this.physics.add.collider(this.player.sprite, this.staticProps);

    this.staticProps.getChildren().forEach((prop: Phaser.Physics.Arcade.Sprite) => {
      prop.setDepth(prop.y);
    });

    this.dynamicSprites = this.children.list.filter(
      child => child.body instanceof Phaser.Physics.Arcade.Body
    ) as Phaser.Physics.Arcade.Sprite[];
  }

  update() {
    super.update();

    this.dynamicSprites.forEach(sprite => {
      sprite.setDepth(sprite.y);
    });

    // this.children.list
    //   .filter(child => child instanceof Phaser.Physics.Arcade.Sprite)
    //   .forEach((child: Phaser.Physics.Arcade.Sprite) => {
    //     console.log(child.constructor.name, child.y);
    //   });
  }
}
