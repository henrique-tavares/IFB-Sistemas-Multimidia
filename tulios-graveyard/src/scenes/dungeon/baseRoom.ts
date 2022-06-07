/* Coisas:
  - TODO: 
  - Fazendo: custom collision border e nextRoomArrow
  - Feito: dungeon rooms, borders
*/

import {
  BackgroundBorder,
  BackgroundBorderConfig,
  NextRoom,
  NextRoomData,
  Orientation,
  PlayerCoordinate,
} from '../../types';
import AudioHandler from '../../handlers/audioHandler';
import { clamp, isEmpty } from '../utils/misc';
import Screen from '../utils/screen';
import Tulio from '../../entities/tulio';
import Background from '../utils/background';

export default abstract class BaseRoom extends Phaser.Scene {
  protected key: string;
  protected player: Tulio;
  protected screen: Screen;
  protected bg: Background;
  protected bgBorder: BackgroundBorder;
  protected nextRoom: NextRoom;
  protected nextRoomData: NextRoomData;
  protected fadeDuration = 500;
  private isThereNextRoom: boolean;
  readonly topPadding = 5;
  readonly bottomPadding = 15;
  readonly horizontalPadding = 7.5;

  constructor(key: string, borderConfig: BackgroundBorderConfig, nextRoom: NextRoom, nextRoomData: NextRoomData) {
    super(key);

    this.key = key;
    this.bgBorder = {
      top: borderConfig.hasTop ? this.topPadding : null,
      right: borderConfig.hasRight ? this.horizontalPadding : null,
      bottom: borderConfig.hasBottom ? this.bottomPadding : null,
      left: borderConfig.hasLeft ? this.horizontalPadding : null,
    };
    this.nextRoom = nextRoom;
    this.nextRoomData = nextRoomData;
  }

  init(coordinate: PlayerCoordinate) {
    // console.log("init: ", this.constructor.name);
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
    this.bg = new Background(this, `${this.key}:bg`, this.bgBorder);
    this.screen = new Screen(this.bg.image.width, this.bg.image.height);

    this.player = new Tulio(this, 400, 175);
    this.player.sprite.body.setCollideWorldBounds(true, null, null, true);
    this.player.sprite.setScale(2);

    this.events.emit('reposition-player');

    this.cameras.main.startFollow(this.player.sprite);
    this.bg.applyBoundsOnSprite(this.player.sprite);

    const audioHandler = this.cache.custom['handlers'].get('audioHandler') as AudioHandler;
    audioHandler.handleBackgroundMusic(this);

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
        this.isThereNextRoom = false;
        return;
      }
      this.isThereNextRoom = true;
      this.handleTransition(orientation);
    });
    if (!this.isThereNextRoom) {
      this.physics.world.once('worldbounds', this.onWorldBounds, this);
    }
  }

  handleTransition(orientation: Orientation) {
    let data = this.nextRoomData[orientation];

    const half =
      (['up', 'down'].includes(orientation) && this.player.sprite.x < this.screen.relativeX(50)) ||
      (['left', 'right'].includes(orientation) && this.player.sprite.y < this.screen.relativeY(50))
        ? 'first'
        : 'second';

    if (Array.isArray(data)) {
      data = half == 'first' ? data[0] : data[1];
    }

    const parsedData: PlayerCoordinate = {
      x: {
        relative: data.x.relative,
        value: data.x.value ?? this.player.sprite.x,
        offset: data.x.offset,
      },
      y: {
        relative: data.y.relative,
        value: data.y.value ?? this.player.sprite.y,
        offset: data.y.offset,
      },
    };

    this.fadeOut(this.fadeDuration);
    this.player.freeze();
    this.time.delayedCall(this.fadeDuration, () => {
      this.player.unfreeze();
      this.scene.transition({
        target: Array.isArray(this.nextRoom[orientation])
          ? half == 'first'
            ? this.nextRoom[orientation][0]
            : this.nextRoom[orientation][1]
          : (this.nextRoom[orientation] as string),
        data: parsedData,
        sleep: true,
        duration: 0,
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

    const minY = this.player.sprite.height + 5;
    const maxY = this.screen.height - this.player.sprite.height - 5;

    const newX = x.relative ? this.screen.relativeX(x.value) : x.value + this.screen.relativeX(x.offset ?? 0);
    const newY = y.relative ? this.screen.relativeY(y.value) : y.value + this.screen.relativeY(y.offset ?? 0);

    // console.log({ x, y });
    // console.log({ x: clamp(newX, minX, maxX), y: clamp(newY, minY, maxY) });

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
