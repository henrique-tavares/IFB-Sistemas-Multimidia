import {
  BackgroundBorder,
  BackgroundBorderConfig,
  GraveyardProps,
  NextRoom,
  NextRoomData,
  Orientation,
  PlayerCoordinate,
} from '../../types';
import AudioHandler from '../../handlers/audioHandler';
import {
  clamp,
  gameScreen,
  generateRandomArray,
  generateRandomPosition,
  isEmpty,
  isPropPositionValid,
} from '../utils/misc';
import NextRoomArrow from '../utils/nextRoomArrow';
import Screen from '../utils/screen';
import Tulio from '../../entities/tulio';
import Background from '../utils/background';
import BaseProp from '../../props/baseProp';
import Tree from '../../props/tree';
import Tombstone from '../../props/tombstone';
import { Physics } from 'phaser';
import { graveyardPropBuilder } from '../utils/graveyard';

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
  protected staticProps: Phaser.Physics.Arcade.StaticGroup;
  protected dynamicSprites: Phaser.Physics.Arcade.Sprite[];
  protected proplessAreas: Phaser.Physics.Arcade.StaticGroup;

  constructor(key: string, borderConfig: BackgroundBorderConfig, nextRoom: NextRoom, nextRoomData: NextRoomData) {
    super(key);

    this.key = key;
    this.bgBorder = {
      top: borderConfig.hasTop ? 17 : null,
      right: borderConfig.hasRight ? 6.5 : null,
      bottom: borderConfig.hasBottom ? 17 : null,
      left: borderConfig.hasLeft ? 6.5 : null,
    };
    this.nextRoom = nextRoom;
    this.nextRoomData = nextRoomData;
  }

  init(coordinate: PlayerCoordinate) {
    console.log(this.constructor.name);
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

    this.player = new Tulio(this);
    this.player.sprite.body.setCollideWorldBounds(true, null, null, true);

    this.events.emit('reposition-player');

    this.cameras.main.startFollow(this.player.sprite);
    this.bg.applyBoundsOnSprite(this.player.sprite);

    this.staticProps = this.physics.add.staticGroup();

    this.events.on('add-extra-hitbox', (hitBox: Phaser.GameObjects.GameObject) => {
      this.staticProps.add(hitBox, true);
      this.refreshProps();
    });

    this.physics.add.collider(this.player.sprite, this.staticProps);

    this.generateInicialProplessAreas();

    const audioHandler = this.cache.custom['handlers'].get('audioHandler') as AudioHandler;
    audioHandler.handleBackgroundMusic(this);

    const nextRoomArrows = Object.entries(this.nextRoom).map(
      ([key, value]) =>
        new NextRoomArrow(this, this.screen, key as Orientation, Array.isArray(value) ? value.length : 1)
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

    this.dynamicSprites.forEach(sprite => {
      sprite.setDepth(sprite.y);
    });
  }

  addFixedProps(...props: BaseProp[]) {
    this.staticProps.addMultiple(props, true);
    this.proplessAreas.addMultiple(
      props.map(prop => prop.generateOccupiedArea()),
      true
    );
    this.refreshProps();
  }

  addProps(...propKeys: GraveyardProps[]) {
    propKeys.forEach(propKey => {
      const newProp = graveyardPropBuilder(this, propKey, 0, 0);
      do {
        console.log('pinto', propKey);
        const randomPosition = generateRandomPosition(this.screen);
        newProp.updatePosition(randomPosition.x, randomPosition.y);
      } while (
        this.proplessAreas.getChildren().some((area: Phaser.GameObjects.Shape) => !isPropPositionValid(newProp, area))
      );

      this.staticProps.add(newProp, true);
      this.proplessAreas.add(newProp.generateOccupiedArea(), true);
    });

    this.refreshProps();
  }

  generateRandomProps(num: number) {
    const props = generateRandomArray(num, 0, 6) as GraveyardProps[];
    this.addProps(...props);
  }

  private generateInicialProplessAreas() {
    const initial: { [key: string]: { x: number; y: number; width: number; height: number } } = {
      top: {
        x: 50,
        y: (this.bgBorder['top'] ?? 10) / 2,
        height: this.bgBorder['top'] ?? 10,
        width: 100,
      },
      right: {
        x: 95,
        y: 50,
        height: 100,
        width: 10,
      },
      bottom: {
        x: 50,
        y: 100 - (this.bgBorder['bottom'] ?? 10) / 2,
        height: this.bgBorder['bottom'] ?? 10,
        width: 100,
      },
      left: {
        x: 5,
        y: 50,
        height: 100,
        width: 10,
      },
      centerHorizontal: {
        x: 50,
        y: 50,
        height: 10,
        width: 100,
      },
      centerVertical: {
        x: 50,
        y: 50,
        height: 100,
        width: 10,
      },
    };

    this.proplessAreas = this.physics.add.staticGroup();
    this.proplessAreas.addMultiple(
      Object.values(initial).map(
        value =>
          new Phaser.GameObjects.Rectangle(
            this,
            this.screen.relativeX(value.x),
            this.screen.relativeY(value.y),
            gameScreen.relativeX(value.width),
            gameScreen.relativeY(value.height),
            0x000,
            0.5
          )
      ),
      true
    );
  }

  refreshProps() {
    this.staticProps.getChildren().forEach((prop: Phaser.Physics.Arcade.Sprite) => {
      prop.setDepth(prop.y);
    });

    this.dynamicSprites = this.children.list.filter(
      child => child.body instanceof Phaser.Physics.Arcade.Body
    ) as Phaser.Physics.Arcade.Sprite[];
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
    console.log(this.constructor.name);
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

    console.log({ x, y });
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
