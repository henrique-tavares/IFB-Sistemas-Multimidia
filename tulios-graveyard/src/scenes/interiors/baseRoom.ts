import _ from "lodash";
import { GameObjects } from "phaser";
import Tulio from "../../entities/tulio";
import AudioHandler from "../../handlers/audioHandler";
import BaseProp from "../../props/baseProp";
import Door from "../../props/door";
import {
  BackgroundBorder,
  BackgroundBorderConfig,
  BorderSideArea,
  NextRoom,
  NextRoomData,
  Orientation,
  PlayerCoordinate,
  RoomDifficulty,
} from "../../types";
import { WeaponType } from "../../weapons/weapon";
import Background from "../utils/background";
import { clamp, isEmpty } from "../utils/misc";
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
  protected staticProps: Phaser.Physics.Arcade.StaticGroup;
  protected staticColliderBoxes: Phaser.Physics.Arcade.StaticGroup;
  readonly difficulty: RoomDifficulty;
  protected verticalPadding: {top: number, bottom: number};
  protected horizontalPadding: number;
  protected doors: Door[];

  constructor(
    key: string,
    borderConfig: BackgroundBorderConfig,
    nextRoom: NextRoom,
    nextRoomData: NextRoomData,
    difficulty: RoomDifficulty,
    verticalPadding: {top: number, bottom: number} = {top: 15, bottom: 15},
    horizontalPadding: number = 6.5,
  ) {
    super(key);

    this.key = key;
    this.bgBorder = {
      top: borderConfig.hasTop ? verticalPadding.top : undefined,
      right: borderConfig.hasRight ? horizontalPadding : undefined,
      bottom: borderConfig.hasBottom ? verticalPadding.bottom : undefined,
      left: borderConfig.hasLeft ? horizontalPadding : undefined,
    };
    this.nextRoom = nextRoom;
    this.nextRoomData = nextRoomData;
    this.difficulty = difficulty;

    this.borderArea = {
      top: {
        pos: { x: 50, y: 0 },
        size: { height: this.bgBorder["top"] ?? 13, width: 100 },
        origin: {
          x: 0.5,
          y: 0,
        },
      },
      right: {
        pos: { x: 100, y: 50 },
        size: { height: 100, width: 7 },
        origin: {
          x: 1,
          y: 0.5,
        },
      },
      bottom: {
        pos: { x: 50, y: 100 },
        size: { height: this.bgBorder["bottom"] ?? 13, width: 100 },
        origin: {
          x: 0.5,
          y: 1,
        },
      },
      left: {
        pos: { x: 0, y: 50 },
        size: { height: 100, width: 7 },
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

    switch(this.key){
      case "graveyard:house":
        this.player = new Tulio(this, 635, 490);
        break;
      case "graveyard:toolshed":
        this.player = new Tulio(this, 400, 480);    
        break;
      case "graveyard:mausoleum":
        this.player = new Tulio(this, 100, 300);    
        break;
    }

    this.player.sprite.body.setCollideWorldBounds(true, undefined, undefined, true);
    this.data.set("player", this.player);

    this.events.emit("reposition-player");

    this.cameras.main.startFollow(this.player.sprite);
    this.bg.applyBoundsOnSprite(this.player.sprite);  
    
    this.staticProps = this.physics.add.staticGroup();
    this.physics.add.collider(
      this.player.sprite, 
      this.staticProps,
      (_player, _collidedProp: BaseProp) => {
        if(_collidedProp.name.includes("stairs")){
          this.scene.start(_collidedProp.getDestiny());
        } else if (_collidedProp.name.includes("door")){
          // this.scene.start(_collidedProp.getDestiny());
        } else if (_collidedProp.name.includes("shovel")){
          this.player.pickupWeapon(WeaponType.shovel);
          _collidedProp.destroy();
        } else if (_collidedProp.name.includes("chest")){
          this.player.pickupWeapon(WeaponType.pistol);
          this.player.weapon?.sprite.setScale(2.5);
          this.children.getByName("weapon:pistol")?.destroy();
        } else if (_collidedProp.name.includes("shotgun")){
          this.player.pickupWeapon(WeaponType.shotgun);
          _collidedProp.destroy();
        }
      }
    );
    this.physics.add.collider(this.player.sprite, this.staticColliderBoxes);

    const audioHandler = this.cache.custom["handlers"].get("audioHandler") as AudioHandler;
    audioHandler.handleBackgroundMusic(this);
  }

  update() {
    this.player.update();

    this.children.list
      .filter(child => child.body instanceof Phaser.Physics.Arcade.Body)
      .forEach((sprite: Phaser.Physics.Arcade.Sprite) => {
        sprite.setDepth(sprite.y);
      });
  }

  addFixedProps(...props: BaseProp[]) {
    this.staticProps.addMultiple(props, true);
    this.refreshProps();
  }

  addColliderBox(...rects: GameObjects.Rectangle[]) {
    this.staticProps.addMultiple(rects, true);
    this.refreshProps();
  }

  refreshProps() {
    this.staticProps.getChildren().forEach((prop: Phaser.Physics.Arcade.Sprite) => {
      prop.setDepth(prop.y);
    });
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
