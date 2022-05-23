import { BackgroundBorder, BackgroundBorderConfig, NextRoom, Orientation, SceneData } from '../../types';
import AudioHandler from '../../utils/audioHandler';
import Direction from '../../utils/direction';
import NextRoomArrow from '../../utils/nextRoomArrow';
import Screen from '../../utils/screen';
import Tulio from '../../utils/tulio';
import Background from './background';

export default abstract class BaseRoom extends Phaser.Scene {
  protected key: string;
  protected player: Tulio;
  protected screen: Screen;
  protected bg: Background;
  protected bgBorder: BackgroundBorder;
  protected nextRoom: NextRoom;
  protected sceneData: SceneData;

  constructor(key: string, borderConfig: BackgroundBorderConfig, nextRoom: NextRoom) {
    super(key);

    this.key = key;
    this.bgBorder = {
      top: borderConfig.hasTop ? 8 : null,
      right: borderConfig.hasRight ? 6 : null,
      bottom: borderConfig.hasBottom ? 8 : null,
      left: borderConfig.hasLeft ? 6 : null,
    };
    this.nextRoom = nextRoom;
  }

  init(data: SceneData) {
    console.log('pinto');
    const { repositionPlayer } = data;
    if (!repositionPlayer) {
      return;
    }
    this.events.on('reposition-player', () => {
      const { x, y } = repositionPlayer;
      this.player.sprite.setX(
        Math.max(this.player.sprite.width, x.relative ? this.screen.relativeX(x.value) : x.value)
      );
      this.player.sprite.setY(
        Math.max(this.player.sprite.height, y.relative ? this.screen.relativeY(y.value) : y.value)
      );
    });
  }

  create() {
    this.screen = new Screen(this.scale);

    this.bg = new Background(this, this.screen, `${this.key}:bg`, this.bgBorder);

    this.player = new Tulio(this);
    this.player.sprite.body.setCollideWorldBounds(true, null, null, true);
    this.player.sprite.setScale(2);

    this.events.emit('reposition-player');

    this.bg.applyBoundsOnSprite(this.player.sprite);

    this.events.on('wake', this.wake);

    const audioHandler = this.cache.custom['handlers'].get('audioHandler') as AudioHandler;
    audioHandler.handleBackgroundMusic(this);

    const nextRoomArrows = Object.keys(this.nextRoom).map(
      key => new NextRoomArrow(this, this.screen, key as Orientation)
    );

    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Body) => {
      if (body.blocked.up && this.nextRoom.up) {
        this.scene.switch(this.nextRoom.up);
        return;
      }

      if (body.blocked.right && this.nextRoom.right) {
        this.scene.sleep();
        this.scene.run(this.nextRoom.right, {
          repositionPlayer: {
            x: {
              relative: true,
              value: 0,
            },
            y: {
              relative: false,
              value: this.player.sprite.y,
            },
          },
        } as SceneData);

        return;
      }

      if (body.blocked.down && this.nextRoom.down) {
        this.scene.switch(this.nextRoom.down);
        return;
      }

      if (body.blocked.left && this.nextRoom.left) {
        this.scene.sleep();
        this.scene.run(this.nextRoom.left, {
          repositionPlayer: {
            x: {
              relative: true,
              value: 100,
            },
            y: {
              relative: false,
              value: this.player.sprite.y,
            },
          },
        } as SceneData);

        return;
      }
    });
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
    this.player.handleSpriteAnimation();
  }

  wake(data: SceneData) {
    console.log('buceta');
    const {
      repositionPlayer: { x, y },
    } = data;
    this.player.sprite.setX(x.relative ? this.screen.relativeX(x.value) : x.value);
    this.player.sprite.setY(y.relative ? this.screen.relativeY(y.value) : y.value);
  }
}
