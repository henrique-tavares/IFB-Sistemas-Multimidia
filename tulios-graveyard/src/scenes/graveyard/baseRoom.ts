import {
  BackgroundBorder,
  BackgroundBorderConfig,
  GraveyardProp,
  NextRoom,
  NextRoomData,
  Orientation,
  PlayerCoordinate,
  RoomSize,
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
  readonly roomSize: RoomSize;

  constructor(
    key: string,
    borderConfig: BackgroundBorderConfig,
    nextRoom: NextRoom,
    nextRoomData: NextRoomData,
    roomSize: RoomSize
  ) {
    super(key);

    this.key = key;
    this.bgBorder = {
      top: borderConfig.hasTop ? 17 : undefined,
      right: borderConfig.hasRight ? 6.5 : undefined,
      bottom: borderConfig.hasBottom ? 17 : undefined,
      left: borderConfig.hasLeft ? 6.5 : undefined,
    };
    this.nextRoom = nextRoom;
    this.nextRoomData = nextRoomData;
    this.roomSize = roomSize;
  }

  init(coordinate: PlayerCoordinate) {
    console.log(this.constructor.name);
    this.fadeIn(this.fadeDuration);
    if (isEmpty(coordinate)) {
      this.physics.world.once('worldbounds', this.onWorldBounds, this);
      return;
    }
    this.events.on('reposition-player', () => {
      const { x, y } = this.repositionPlayer(coordinate);
      this.player.setPosition(x, y);

      this.physics.world.once('worldbounds', this.onWorldBounds, this);
    });
  }

  create() {
    this.bg = new Background(this, `${this.key}:bg`, this.bgBorder);
    this.screen = new Screen(this.bg.image.width, this.bg.image.height);

    this.player = new Tulio(this);
    this.player.sprite.body.setCollideWorldBounds(true, undefined, undefined, true);

    this.events.emit('reposition-player');

    this.cameras.main.startFollow(this.player.sprite);
    this.bg.applyBoundsOnSprite(this.player.sprite);

    this.staticProps = this.physics.add.staticGroup();

    this.events.on(
      'add-extra-area',
      (
        area: Phaser.GameObjects.Shape,
        proplessArea?: Phaser.GameObjects.Shape,
        playerColision?: ArcadePhysicsCallback,
        debug = false
      ) => {
        if (playerColision) {
          this.add.existing(area);
          this.physics.add.existing(area, true);
          this.physics.add.overlap(this.player.sprite, area, playerColision, undefined, this);
        } else {
          this.staticProps.add(area, true);
        }
        this.proplessAreas.add(
          proplessArea ??
            new Phaser.GameObjects.Rectangle(
              this,
              area.x,
              area.y,
              area.width + 50,
              area.height + 50,
              0x000,
              debug ? 0.5 : 0
            ),
          true
        );
        this.refreshProps();
      }
    );

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

  addProps(...propKeys: GraveyardProp[]) {
    propKeys.forEach(propKey => {
      const newProp = graveyardPropBuilder(this, propKey, 0, 0);
      do {
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

  generateRandomProps(num: number, propsPool: GraveyardProp[] = [0, 1, 2, 3, 4, 5]) {
    const props = generateRandomArray(num, 0, propsPool.length).map(num => propsPool[num]);

    this.addProps(...props);
  }

  private generateInicialProplessAreas(debug = false) {
    const borders: {
      [key: string]: {
        pos: { x: number; y: number };
        size: { width: number; height: number };
        origin: { x: number; y: number };
      };
    } = {
      top: {
        pos: { x: 50, y: 0 },
        size: { height: this.bgBorder['top'] ?? 10, width: 100 },
        origin: {
          x: 0.5,
          y: 0,
        },
      },
      right: {
        pos: { x: 100, y: 50 },
        size: { height: 100, width: 10 },
        origin: {
          x: 1,
          y: 0.5,
        },
      },
      bottom: {
        pos: { x: 50, y: 100 },
        size: { height: this.bgBorder['bottom'] ?? 10, width: 100 },
        origin: {
          x: 0.5,
          y: 1,
        },
      },
      left: {
        pos: { x: 0, y: 50 },
        size: { height: 100, width: 10 },
        origin: {
          x: 0,
          y: 0.5,
        },
      },
    };

    this.proplessAreas = this.physics.add.staticGroup();
    this.proplessAreas.addMultiple(
      Object.values(borders).map(value =>
        new Phaser.GameObjects.Rectangle(
          this,
          this.screen.relativeX(value.pos.x),
          this.screen.relativeY(value.pos.y),
          value.size.width == 100 ? this.screen.width : gameScreen.relativeX(value.size.width),
          value.size.height == 100 ? this.screen.height : gameScreen.relativeY(value.size.height),
          0x000,
          debug ? 0.5 : 0
        ).setOrigin(value.origin.x, value.origin.y)
      ),
      true
    );

    const generateAxesArea = (roomSize: RoomSize) => {
      const baseHorizontal = {
        x: 50,
        height: 10,
        width: 100,
      };

      const horizontal = {
        center: {
          ...baseHorizontal,
          y: 50,
        },
        first: {
          ...baseHorizontal,
          y: 25,
        },
        second: {
          ...baseHorizontal,
          y: 75,
        },
      };

      const baseVertical = {
        y: 50,
        height: 100,
        width: 10,
      };

      const vertical = {
        center: {
          ...baseVertical,
          x: 50,
        },
        first: {
          ...baseVertical,
          x: 25,
        },
        second: {
          ...baseVertical,
          x: 75,
        },
      };

      switch (roomSize) {
        case RoomSize['1x1']: {
          return [horizontal.center, vertical.center];
        }
        case RoomSize['1x2']: {
          return [horizontal.center, vertical.first, vertical.second];
        }
        case RoomSize['2x1']: {
          return [horizontal.first, horizontal.second];
        }
        case RoomSize['2x2']: {
          return [horizontal.first, horizontal.second, vertical.first, vertical.second];
        }
      }
    };

    this.proplessAreas.addMultiple(
      generateAxesArea(this.roomSize).map(
        axisArea =>
          new Phaser.GameObjects.Rectangle(
            this,
            this.screen.relativeX(axisArea.x),
            this.screen.relativeY(axisArea.y),
            axisArea.width == 100 ? this.screen.width : gameScreen.relativeX(axisArea.width),
            axisArea.height == 100 ? this.screen.height : gameScreen.relativeY(axisArea.height),
            0x000,
            debug ? 0.5 : 0
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
      this.player.sprite.disableBody();
      this.scene.transition({
        target: Array.isArray(nextRoom) ? (half == 'first' ? nextRoom[0] : nextRoom[1]) : (nextRoom as string),
        data: parsedData,
        sleep: true,
        duration: 0,
      });
    });
  }

  wake(sys: Phaser.Scenes.Systems, data: PlayerCoordinate) {
    console.log(this.constructor.name);
    this.fadeIn(this.fadeDuration);
    const { x: newX, y: newY } = this.repositionPlayer(data);
    this.player.sprite.enableBody(true, newX, newY, true, true);
    this.player.unfreeze();
    this.physics.world.once('worldbounds', this.onWorldBounds, this);
  }

  repositionPlayer({ x, y }: PlayerCoordinate) {
    const minX = this.player.sprite.width + 10;
    const maxX = this.screen.width - this.player.sprite.width - 10;

    const minY = this.player.sprite.height + 5;
    const maxY = this.screen.height - this.player.sprite.height - 5;

    const newX = x.relative ? this.screen.relativeX(x.value!) : x.value! + this.screen.relativeX(x.offset ?? 0);
    const newY = y.relative ? this.screen.relativeY(y.value!) : y.value! + this.screen.relativeY(y.offset ?? 0);

    return {
      x: clamp(newX, minX, maxX),
      y: clamp(newY, minY, maxY),
    };
  }

  fadeIn(ms: number) {
    this.cameras.main.fadeIn(ms, 0, 0, 0);
  }

  fadeOut(ms: number) {
    this.cameras.main.fadeOut(ms, 0, 0, 0);
  }
}
