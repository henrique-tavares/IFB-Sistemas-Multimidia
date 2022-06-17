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
      top: borderConfig.hasTop ? this.topPadding : undefined,
      right: borderConfig.hasRight ? this.horizontalPadding : undefined,
      bottom: borderConfig.hasBottom ? this.bottomPadding : undefined,
      left: borderConfig.hasLeft ? this.horizontalPadding : undefined,
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
    this.bg = new Background(this, `${this.key}:bg`, this.bgBorder);
    this.screen = new Screen(this.bg.image.width, this.bg.image.height);

    this.player = new Tulio(this, 400, 175);
    this.player.sprite.body.setCollideWorldBounds(true, undefined, undefined, true);

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
    let playerCoordinate = this.nextRoomData[orientation]!;
    const nextRoom = this.nextRoom[orientation]!;

    const half =
      (['up', 'down'].includes(orientation) && this.player.sprite.x < this.screen.relativeX(50)) ||
      (['left', 'right'].includes(orientation) && this.player.sprite.y < this.screen.relativeY(50))
        ? 'first'
        : 'second';

    if (Array.isArray(playerCoordinate)) {
      playerCoordinate = half == 'first' ? playerCoordinate[0] : playerCoordinate[1];
    }

    const parsedData: PlayerCoordinate = {
      x: {
        relative: playerCoordinate.x.relative,
        value: playerCoordinate.x.value ?? this.player.sprite.x,
        offset: playerCoordinate.x.offset,
      },
      y: {
        relative: playerCoordinate.y.relative,
        value: playerCoordinate.y.value ?? this.player.sprite.y,
        offset: playerCoordinate.y.offset,
      },
    };

    this.fadeOut(this.fadeDuration);
    this.player.freeze();
    this.time.delayedCall(this.fadeDuration, () => {
      this.player.unfreeze();
      this.scene.transition({
        target: Array.isArray(nextRoom) ? (half == 'first' ? nextRoom[0] : nextRoom[1]) : (nextRoom as string),
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

    const newX = x.relative ? this.screen.relativeX(x.value!) : this.screen.relativeX(x.offset!);
    const newY = y.relative ? this.screen.relativeY(y.value!) : this.screen.relativeY(y.offset!);

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
