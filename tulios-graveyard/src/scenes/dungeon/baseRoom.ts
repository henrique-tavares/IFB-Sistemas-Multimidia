import _ from "lodash";
import Tulio from "../../entities/tulio";
import Zombie from "../../entities/zombie";
import AudioHandler from "../../handlers/audioHandler";
import {
  BackgroundBorder,
  BackgroundBorderConfig,
  BorderSideArea,
  CustomBorder,
  NextRoom,
  NextRoomArrowPosition,
  NextRoomData,
  Orientation,
  PlayerCoordinate,
  RoomDifficulty,
} from "../../types";
import { WeaponType } from "../../weapons/weapon";
import Background from "../utils/background";
import { clamp, isEmpty, isSpritePositionValid } from "../utils/misc";
import NextRoomArrow from "../utils/nextRoomArrow";
import Screen from "../utils/screen";

export default abstract class BaseRoom extends Phaser.Scene {
  protected key: string;
  protected player: Tulio;
  protected screen: Screen;
  protected bg: Background;
  protected bgBorder: BackgroundBorder;
  protected borderArea: {
    [key in "top" | "right" | "bottom" | "left"]: BorderSideArea;
  };
  protected nextRoom: NextRoom;
  protected nextRoomData: NextRoomData;
  protected fadeDuration = 500;
  private isThereNextRoom: boolean;
  protected customBorderGroup?: Phaser.Physics.Arcade.StaticGroup;
  protected customBorders?: CustomBorder[];
  protected enemiesGroup: Phaser.Physics.Arcade.Group;
  protected zombiesInScene = new Array<Zombie>();
  protected lootGroup: Phaser.Physics.Arcade.Group;
  protected nextRoomArrowsPosition: NextRoomArrowPosition;
  readonly difficulty: RoomDifficulty;
  readonly verticalPadding = 11;
  readonly horizontalPadding = 8;

  constructor(
    key: string,
    borderConfig: BackgroundBorderConfig,
    nextRoom: NextRoom,
    nextRoomData: NextRoomData,
    difficulty: RoomDifficulty,
    nextRoomArrowsPosition?: NextRoomArrowPosition,
    customBorders?: CustomBorder[]
  ) {
    super(key);

    this.key = key;
    this.bgBorder = {
      top: borderConfig.hasTop ? this.verticalPadding : undefined,
      right: borderConfig.hasRight ? this.horizontalPadding : undefined,
      bottom: borderConfig.hasBottom ? this.verticalPadding : undefined,
      left: borderConfig.hasLeft ? this.horizontalPadding : undefined,
    };
    this.nextRoom = nextRoom;
    this.nextRoomData = nextRoomData;
    this.difficulty = difficulty;

    this.nextRoomArrowsPosition = nextRoomArrowsPosition ?? {};

    this.customBorders = customBorders;

    this.borderArea = {
      top: {
        pos: { x: 50, y: 0 },
        size: { height: this.bgBorder["top"] ?? 10, width: 100 },
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
        size: { height: this.bgBorder["bottom"] ?? 10, width: 100 },
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
  }

  init(coordinate: PlayerCoordinate) {
    // console.log(this.constructor.name);
    this.fadeIn(this.fadeDuration);
    if (isEmpty(coordinate)) {
      this.physics.world.once("worldbounds", this.onWorldBounds, this);
      return;
    }
    this.events.on("reposition-player", () => {
      const { x, y } = this.repositionPlayer(coordinate);
      this.player.setPosition(x, y);

      this.physics.world.once("worldbounds", this.onWorldBounds, this);
    });
  }

  create() {
    this.bg = new Background(this, `${this.key}:bg`, this.bgBorder);
    this.screen = new Screen(this.bg.image.width, this.bg.image.height);

    this.data.set("difficulty", this.difficulty);

    this.player = new Tulio(this, 400, 175);
    this.player.pickupWeapon(WeaponType.shovel);
    this.player.pickupWeapon(WeaponType.pistol);
    this.player.pickupWeapon(WeaponType.shotgun);
    this.player.sprite.body.setCollideWorldBounds(true, undefined, undefined, true);
    this.data.set("player", this.player);

    this.events.emit("reposition-player");

    this.cameras.main.startFollow(this.player.sprite);
    this.bg.applyBoundsOnSprite(this.player.sprite);

    this.enemiesGroup = this.physics.add.group();
    this.physics.add.collider(this.enemiesGroup, this.enemiesGroup);
    this.physics.add.collider(this.player.sprite, this.enemiesGroup, (player, enemy) => {
      player.body.velocity.limit(30);
      enemy.body.velocity.limit(30);

      const zombie = this.zombiesInScene.find(zombie => zombie.sprite.name == enemy.name)!;
      if (!player.getData("invencible")) {
        zombie.attack(player);
      }
    });

    this.lootGroup = this.physics.add.group();
    this.data.set("lootGroup", this.lootGroup);

    if (this.customBorders) {
      this.customBorderGroup = this.createCustomBorders(this.customBorders);
      this.physics.add.collider(this.player.sprite, this.customBorderGroup);
      this.physics.add.collider(this.enemiesGroup, this.customBorderGroup);
    }

    this.addEnemies();

    this.events.on(
      "init-shovel-attack",
      (attackArea: Phaser.GameObjects.GameObject) => {
        const alreadyAttackedEnemies = new Set<Phaser.Types.Physics.Arcade.GameObjectWithBody>();

        const attackOverlap = this.physics.add.overlap(
          attackArea,
          this.enemiesGroup,
          (_obj, enemy) => {
            if (alreadyAttackedEnemies.has(enemy)) {
              return;
            }

            this.player.attack(enemy);
            alreadyAttackedEnemies.add(enemy);

            this.events.emit("shovel-knockback", enemy, this.player.facingDirection);
          }
        );

        this.events.once("finish-shovel-attack", () => {
          attackOverlap.destroy();
        });
      },
      this
    );

    this.events.on(
      "init-bullet-attack",
      (attackArea: Phaser.GameObjects.GameObject) => {
        const attackOverlap = this.physics.add.overlap(
          attackArea,
          this.enemiesGroup,
          (bullet, enemy) => {
            if (!attackOverlap.active) {
              return;
            }
            this.player.attack(enemy);
            bullet.emit("enemy-hit", enemy);
            attackOverlap.destroy();
          }
        );
      },
      this
    );

    const audioHandler = this.cache.custom["handlers"].get("audioHandler") as AudioHandler;
    audioHandler.handleBackgroundMusic(this);

    const nextRoomArrows = Object.entries(this.nextRoom).map(
      ([key, value]) =>
        new NextRoomArrow(
          this,
          this.screen,
          key as Orientation,
          Array.isArray(value) ? value.length : 1,
          this.nextRoomArrowsPosition[key] ?? 0
        )
    );

    this.events.on("wake", this.wake, this);

    this.time.delayedCall(0, () => {
      const verifyConcluded = this.time.addEvent({
        callback: () => {
          if (this.enemiesGroup.getChildren().every(enemy => !enemy.active)) {
            this.events.emit("room-concluded");
            verifyConcluded.destroy();
          }
        },
        loop: true,
        delay: 1000,
      });

      this.events.on("room-concluded", () => {
        this.data.set("concluded", true);
        nextRoomArrows.forEach(arrow => {
          arrow.toggleVisible();
        });
      });
    });
  }

  update() {
    this.player.update();

    this.children.list
      .filter(child => child.body instanceof Phaser.Physics.Arcade.Body)
      .forEach((sprite: Phaser.Physics.Arcade.Sprite) => {
        sprite.setDepth(sprite.y);
      });
  }

  createCustomBorders(customBorders: CustomBorder[]) {
    const customBorderGroup = this.physics.add.staticGroup();

    for (const border of customBorders) {
      switch (border) {
        case CustomBorder.TopLeft:
          customBorderGroup.addMultiple([
            this.add.rectangle(
              this.screen.relativeX(2),
              this.screen.relativeY(0),
              this.screen.relativeX(4),
              this.screen.relativeY(22)
            ),
            this.add.rectangle(
              this.screen.relativeX(73),
              this.screen.relativeY(0),
              this.screen.relativeX(54),
              this.screen.relativeY(22)
            ),
          ]);
          break;
        case CustomBorder.TopRight:
          customBorderGroup.addMultiple([
            this.add.rectangle(
              this.screen.relativeX(27),
              this.screen.relativeY(0),
              this.screen.relativeX(54),
              this.screen.relativeY(22)
            ),
            this.add.rectangle(
              this.screen.relativeX(98),
              this.screen.relativeY(0),
              this.screen.relativeX(4),
              this.screen.relativeY(22)
            ),
          ]);
          break;
        case CustomBorder.RightTop:
          customBorderGroup.addMultiple([
            this.add.rectangle(
              this.screen.relativeX(100),
              this.screen.relativeY(79.5),
              this.screen.relativeX(16),
              this.screen.relativeY(70)
            ),
            this.add.rectangle(
              this.screen.relativeX(100),
              this.screen.relativeY(2.75),
              this.screen.relativeX(16),
              this.screen.relativeY(5.5)
            ),
          ]);
          break;
        case CustomBorder.RightBottom:
          customBorderGroup.addMultiple([
            this.add.rectangle(
              this.screen.relativeX(100),
              this.screen.relativeY(20),
              this.screen.relativeX(16),
              this.screen.relativeY(70)
            ),
            this.add.rectangle(
              this.screen.relativeX(100),
              this.screen.relativeY(97.25),
              this.screen.relativeX(16),
              this.screen.relativeY(5.5)
            ),
          ]);
          break;
        case CustomBorder.BottomLeft:
          customBorderGroup.addMultiple([
            this.add.rectangle(
              this.screen.relativeX(2),
              this.screen.relativeY(100),
              this.screen.relativeX(4),
              this.screen.relativeY(22)
            ),
            this.add.rectangle(
              this.screen.relativeX(73),
              this.screen.relativeY(100),
              this.screen.relativeX(54),
              this.screen.relativeY(22)
            ),
          ]);
          break;
        case CustomBorder.LeftTop:
          customBorderGroup.addMultiple([
            this.add.rectangle(
              this.screen.relativeX(0),
              this.screen.relativeY(79.5),
              this.screen.relativeX(16),
              this.screen.relativeY(70)
            ),
            this.add.rectangle(
              this.screen.relativeX(0),
              this.screen.relativeY(2.75),
              this.screen.relativeX(16),
              this.screen.relativeY(5.5)
            ),
          ]);
          break;
        case CustomBorder.LeftBottom:
          customBorderGroup.addMultiple([
            this.add.rectangle(
              this.screen.relativeX(0),
              this.screen.relativeY(20),
              this.screen.relativeX(16),
              this.screen.relativeY(70)
            ),
            this.add.rectangle(
              this.screen.relativeX(0),
              this.screen.relativeY(97.25),
              this.screen.relativeX(16),
              this.screen.relativeY(5.5)
            ),
          ]);
          break;
        case CustomBorder.LeftBottomCorner:
          customBorderGroup.add(
            this.add.rectangle(
              this.screen.relativeX(4),
              this.screen.relativeY(94.5),
              this.screen.relativeX(8),
              this.screen.relativeY(11)
            )
          );
          break;
        case CustomBorder.RightBottomCorner:
          customBorderGroup.add(
            this.add.rectangle(
              this.screen.relativeX(96),
              this.screen.relativeY(94.5),
              this.screen.relativeX(8),
              this.screen.relativeY(11)
            )
          );
          break;
      }
    }

    return customBorderGroup;
  }

  addEnemies() {
    let enemiesNum = 0;
    switch (this.difficulty) {
      case RoomDifficulty.Peaceful:
        enemiesNum = 0;
        break;
      case RoomDifficulty.Easy:
        enemiesNum = _.random(1, 3);
        break;
      case RoomDifficulty.Medium:
        enemiesNum = _.random(3, 5);
        break;
      case RoomDifficulty.Hard:
        enemiesNum = _.random(5, 7);
        break;
    }

    switch (this.screen.width / 800 + this.screen.height / 600) {
      case 3:
        enemiesNum = Math.floor(enemiesNum * 1.25);
        break;
      case 4:
        enemiesNum = Math.floor(enemiesNum * 2);
        break;
    }

    const directionTranslator = {
      up: "top",
      right: "right",
      down: "bottom",
      left: "left",
    };

    const spawnableArea = Object.entries(this.nextRoom).reduce((acc, [side, room]) => {
      if (_.isArray(room)) {
        const areas: BorderSideArea[] = room
          .filter(room => !this.scene.get(room).data.get("concluded"))
          .map((_room, i) => {
            const area: BorderSideArea = this.borderArea[directionTranslator[side]];

            return {
              ...area,
              pos: {
                x: area.pos.x == 50 ? (i + 1) * 25 : area.pos.x,
                y: area.pos.y == 50 ? (i + 1) * 25 : area.pos.y,
              },
            };
          });

        return [...acc, ...areas];
      }

      return [
        ...acc,
        ...(!this.scene.get(room).data.get("concluded")
          ? [this.borderArea[directionTranslator[side]] as BorderSideArea]
          : []),
      ];
    }, [] as BorderSideArea[]);

    const handleZombieSpawnPositionOffscreen = (
      pos: number,
      orientation: "vertical" | "horizontal",
      zombie: Zombie
    ) => {
      switch (orientation) {
        case "horizontal": {
          if (pos == this.screen.relativeX(0)) {
            return -zombie.sprite.width * zombie.sprite.scaleX;
          }
          if (pos == this.screen.relativeX(100)) {
            return pos + zombie.sprite.width * zombie.sprite.scaleX;
          }
          return pos;
        }
        case "vertical": {
          if (pos == this.screen.relativeY(0)) {
            return -zombie.sprite.height * zombie.sprite.scaleY;
          }
          if (pos == this.screen.relativeY(100)) {
            return pos + zombie.sprite.height * zombie.sprite.scaleY;
          }
          return pos;
        }
      }
    };

    for (const _x of _.range(enemiesNum)) {
      const side = _.sample(spawnableArea);

      if (!side) {
        return;
      }

      this.time.delayedCall(_.random(0, 3000, true), () => {
        const zombie = new Zombie(this, 0, 0, this.enemiesGroup.countActive());
        const borderSafety = {
          x: 15,
          y: 10,
        };

        do {
          const randomPosition = {
            x: [0, 1].includes(side.origin.x)
              ? this.screen.relativeX(side.origin.x * 100)
              : side.pos.x == 50
              ? this.screen.relativeX(_.random(borderSafety.x, 100 - borderSafety.x, true))
              : this.screen.relativeX(
                  _.random(borderSafety.x + side.pos.x - 25, side.pos.x + 25 - borderSafety.x, true)
                ),
            y: [0, 1].includes(side.origin.y)
              ? this.screen.relativeY(side.origin.y * 100)
              : side.pos.y == 50
              ? this.screen.relativeY(_.random(borderSafety.y, 100 - borderSafety.y, true))
              : this.screen.relativeY(
                  _.random(borderSafety.y + side.pos.y - 25, side.pos.y + 25 - borderSafety.y, true)
                ),
          };

          zombie.sprite.setPosition(
            handleZombieSpawnPositionOffscreen(randomPosition.x, "horizontal", zombie),
            handleZombieSpawnPositionOffscreen(randomPosition.y, "vertical", zombie)
          );
        } while (
          this.enemiesGroup
            .getChildren()
            .some(
              (child: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) =>
                !isSpritePositionValid(zombie.sprite, child)
            ) ||
          this.customBorderGroup
            ?.getChildren()
            .some(
              (customBorder: Phaser.GameObjects.Rectangle) =>
                !Phaser.Geom.Rectangle.Intersection(
                  customBorder.getBounds(),
                  zombie.sprite.getBounds()
                ).isEmpty()
            )
        );

        this.enemiesGroup.add(zombie.sprite);
        this.zombiesInScene.push(zombie);
      });
    }
  }

  onWorldBounds(body: Phaser.Physics.Arcade.Body) {
    if (!this.data.get("concluded")) {
      this.physics.world.once("worldbounds", this.onWorldBounds, this);
      return;
    }

    ["up", "right", "left", "down"].forEach((orientation: Orientation) => {
      if (
        !(body.blocked[orientation] && this.nextRoom[orientation] && this.nextRoomData[orientation])
      ) {
        this.isThereNextRoom = false;
        return;
      }
      this.isThereNextRoom = true;
      this.handleTransition(orientation);
    });
    if (!this.isThereNextRoom) {
      this.physics.world.once("worldbounds", this.onWorldBounds, this);
    }
  }

  handleTransition(orientation: Orientation) {
    let playerCoordinate = this.nextRoomData[orientation]!;
    const nextRoom = this.nextRoom[orientation]!;

    const half =
      (["up", "down"].includes(orientation) && this.player.sprite.x < this.screen.relativeX(50)) ||
      (["left", "right"].includes(orientation) && this.player.sprite.y < this.screen.relativeY(50))
        ? "first"
        : "second";

    if (Array.isArray(playerCoordinate)) {
      playerCoordinate = half == "first" ? playerCoordinate[0] : playerCoordinate[1];
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
        target: Array.isArray(nextRoom)
          ? half == "first"
            ? nextRoom[0]
            : nextRoom[1]
          : (nextRoom as string),
        data: parsedData,
        sleep: true,
        duration: 0,
      });
    });
  }

  wake(sys: Phaser.Scenes.Systems, data: PlayerCoordinate) {
    // console.log(this.constructor.name);
    this.fadeIn(this.fadeDuration);
    const { x: newX, y: newY } = this.repositionPlayer(data);
    this.player.sprite.enableBody(true, newX, newY, true, true);
    this.player.unfreeze();
    this.physics.world.once("worldbounds", this.onWorldBounds, this);
  }

  repositionPlayer({ x, y }: PlayerCoordinate) {
    const minX = this.player.sprite.width + 10;
    const maxX = this.screen.width - this.player.sprite.width - 10;

    const minY = this.player.sprite.height + 5;
    const maxY = this.screen.height - this.player.sprite.height - 5;

    const newX = x.relative
      ? this.screen.relativeX(x.value!)
      : x.value! + this.screen.relativeX(x.offset ?? 0);
    const newY = y.relative
      ? this.screen.relativeY(y.value!)
      : y.value! + this.screen.relativeY(y.offset ?? 0);

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
