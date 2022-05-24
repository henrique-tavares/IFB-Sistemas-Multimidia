import {
  BackgroundBorder,
  BackgroundBorderConfig,
  NextRoom,
  NextRoomData,
  Orientation,
  PlayerCoordinate,
} from '../../types';
import AudioHandler from '../../utils/audioHandler';
import { clamp, isEmpty } from '../../utils/misc';
import NextRoomArrow from '../../utils/nextRoomArrow';
import Screen from '../../utils/screen';
import Tulio from '../../utils/tulio';
import Background from '../../utils/background';

export default abstract class BaseRoom extends Phaser.Scene {
  protected key: string;
  protected player: Tulio;
  protected screen: Screen;
  protected bg: Background;
  protected bgBorder: BackgroundBorder;
  protected nextRoom: NextRoom;
  protected nextRoomData: NextRoomData;
  protected fadeDuration = 500;

  constructor(key: string, borderConfig: BackgroundBorderConfig, nextRoom: NextRoom, nextRoomData: NextRoomData) {
    super(key);

    this.key = key;
    this.bgBorder = {
      top: borderConfig.hasTop ? 9 : null,
      right: borderConfig.hasRight ? 6.5 : null,
      bottom: borderConfig.hasBottom ? 9 : null,
      left: borderConfig.hasLeft ? 6.5 : null,
    };
    this.nextRoom = nextRoom;
    this.nextRoomData = nextRoomData;
  }

  init(coordinate: PlayerCoordinate) {
    this.fadeIn(this.fadeDuration);
    if (isEmpty(coordinate)) {
      this.physics.world.once('worldbounds', this.onWorldBounds, this);
      return;
    }
    this.events.on('reposition-player', () => {
      this.repositionPlayer(coordinate);

      this.physics.world.once('worldbounds', this.onWorldBounds, this);
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

    const audioHandler = this.cache.custom['handlers'].get('audioHandler') as AudioHandler;
    audioHandler.handleBackgroundMusic(this);

    const nextRoomArrows = Object.keys(this.nextRoom).map(
      key => new NextRoomArrow(this, this.screen, key as Orientation)
    );

    this.physics.world.on(`${this.key}:concluded`, () =>
      nextRoomArrows.forEach(arrow => {
        arrow.toggleVisible();
      })
    );

    this.events.on('wake', this.wake, this);

    setTimeout(() => {
      this.physics.world.emit(`${this.key}:concluded`);
    }, 1000);
  }

  update() {
    this.player.handleSpriteAnimation();
  }

  onWorldBounds(body: Phaser.Physics.Arcade.Body) {
    ['up', 'right', 'left', 'down'].forEach((orientation: Orientation) => {
      if (!(body.blocked[orientation] && this.nextRoom[orientation] && this.nextRoomData[orientation])) {
        return;
      }

      // this.scene.sleep();
      const data = this.nextRoomData[orientation];
      const parsedData: PlayerCoordinate = {
        x: {
          relative: data.x.relative,
          value: data.x.value ?? this.player.sprite.x,
        },
        y: {
          relative: data.y.relative,
          value: data.y.value ?? this.player.sprite.y,
        },
      };

      this.fadeOut(this.fadeDuration);
      this.player.freeze();
      this.time.delayedCall(this.fadeDuration, () => {
        this.player.unfreeze();
        this.scene.transition({
          target: this.nextRoom[orientation],
          data: parsedData,
          sleep: true,
          duration: 0,
        });
      });
    });
  }

  wake(sys: Phaser.Scenes.Systems, data: PlayerCoordinate) {
    this.fadeIn(this.fadeDuration);
    this.repositionPlayer(data);
    this.physics.world.once('worldbounds', this.onWorldBounds, this);
  }

  repositionPlayer({ x, y }: PlayerCoordinate) {
    const minX = this.player.sprite.width + 10;
    const maxX = this.screen.width - this.player.sprite.width - 10;

    const minY = this.player.sprite.height + 10;
    const maxY = this.screen.height - this.player.sprite.height - 10;

    const newX = x.relative ? this.screen.relativeX(x.value) : x.value;
    const newY = y.relative ? this.screen.relativeY(y.value) : y.value;

    this.player.sprite.setX(clamp(newX, minX, maxX));
    this.player.sprite.setY(clamp(newY, minY, maxY));
  }

  fadeIn(ms: number) {
    this.cameras.main.fadeIn(ms, 0, 0, 0);
  }

  fadeOut(ms: number) {
    this.cameras.main.fadeOut(ms, 0, 0, 0);
  }
}
