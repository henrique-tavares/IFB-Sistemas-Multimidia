import { BackgroundBorder, NextRoom, Orientation } from '../../types';
import AudioHandler from '../../utils/audioHandler';
import Direction from '../../utils/direction';
import NextRoomArrow from '../../utils/nextRoomArrow';
import Screen from '../../utils/screen';
import Tulio from '../../utils/tulio';
import Background from './background';

export default abstract class BaseRoom extends Phaser.Scene {
  protected key: string;
  protected player: Tulio;
  protected direction: Direction;
  protected screen: Screen;
  protected bg: Background;
  protected bgBorder: BackgroundBorder;
  protected nextRoom: NextRoom;

  constructor(key: string, border: BackgroundBorder, nextRoom: NextRoom) {
    super(key);

    this.key = key;
    this.bgBorder = border;
    this.nextRoom = nextRoom;
  }

  create() {
    this.screen = new Screen(this.scale);

    this.bg = new Background(this, this.screen, `${this.key}:bg`, this.bgBorder);

    this.player = new Tulio(this);
    this.player.sprite.body.setCollideWorldBounds(true, null, null, true);
    this.player.sprite.setScale(2);

    this.bg.applyBoundsOnSprite(this.player.sprite);

    this.direction = new Direction(this);

    const audioHandler = this.cache.custom['handlers'].get('audioHandler') as AudioHandler;
    audioHandler.handleBackgroundMusic(this);

    const nextRoomArrows = Object.keys(this.nextRoom).map(
      key => new NextRoomArrow(this, this.screen, key as Orientation)
    );

    this.physics.world.on('worldbounds', this.handleNextRoom);
    this.physics.world.on(`${this.key}:concluded`, () =>
      nextRoomArrows.forEach(arrow => {
        arrow.toggleVisible();
      })
    );

    setTimeout(() => {
      this.physics.world.emit(`${this.key}:concluded`);
    }, 1000);
  }

  update() {
    this.player.handleSpriteAnimation(this.direction);
  }

  protected handleNextRoom(body: Phaser.Physics.Arcade.Body) {
    return;

    if (body.blocked.up && this.nextRoom.up) {
      this.scene.sleep();
      this.scene.launch(this.nextRoom.up);
      return;
    }

    if (body.blocked.right && this.nextRoom.right) {
      this.scene.sleep();
      this.scene.launch(this.nextRoom.right);
      return;
    }

    if (body.blocked.down && this.nextRoom.down) {
      this.scene.sleep();
      this.scene.launch(this.nextRoom.down);
      return;
    }

    if (body.blocked.left && this.nextRoom.left) {
      this.scene.sleep();
      this.scene.launch(this.nextRoom.left);
      return;
    }
  }
}
