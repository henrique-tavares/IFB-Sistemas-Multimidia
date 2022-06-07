import 'phaser';
import { GameObjects, Scene } from 'phaser';
import {
  CustomBoundConfig,
  CustomBounds,
  NextRoom,
  NextRoomArrowPosition,
  NextRoomData,
  NextRoomDest,
  NextRoomPlayerCoordinate,
  Orientation,
  PlayerCoordinate,
} from '../../types';
import NextRoomArrow from './nextRoomArrow';
import Screen from './screen';

export function handleNextRoomArrows(
  key: string,
  scene: Scene,
  screen: Screen,
  nextRoom: NextRoom,
  position: NextRoomArrowPosition
) {
  console.log(key);
  console.log(Object.entries(nextRoom));

  const nextRoomArrows = Object.entries(nextRoom).map(([key, value]) => {
    return new NextRoomArrow(
      scene,
      screen,
      key as Orientation,
      Array.isArray(value) ? value.length : 1,
      position[key] ?? 0
    );
  });

  scene.physics.world.on(`${key}:concluded`, () =>
    nextRoomArrows.forEach(arrow => {
      arrow.toggleVisible();
    })
  );
}

export function generateNextRoomData(config: { [Key in Orientation]?: number }): NextRoomData {
  const directions: { [Key in Orientation]: (offset?: number) => PlayerCoordinate } = {
    up: (offset?: number): PlayerCoordinate => ({
      x: {
        relative: false,
        offset,
      },
      y: {
        relative: true,
        value: 100,
      },
    }),
    right: (offset?: number): PlayerCoordinate => ({
      x: {
        relative: true,
        value: 0,
      },
      y: {
        relative: false,
        offset,
      },
    }),
    down: (offset?: number): PlayerCoordinate => ({
      x: {
        relative: false,
        offset,
      },
      y: {
        relative: true,
        value: 0,
      },
    }),
    left: (offset?: number): PlayerCoordinate => ({
      x: {
        relative: true,
        value: 100,
      },
      y: {
        relative: false,
        offset,
      },
    }),
  };

  function generateDirection(orientation: Orientation, offset: number): NextRoomPlayerCoordinate {
    // console.log("gd: ", orientation, offset);
    return directions[orientation](offset);
  }

  return {
    up: config.up ? generateDirection('up', config.up) : undefined,
    right: config.right ? generateDirection('right', config.right) : undefined,
    down: config.down ? generateDirection('down', config.down) : undefined,
    left: config.left ? generateDirection('left', config.left) : undefined,
  };
}

export function addCustomBounds(
  player: GameObjects.GameObject,
  scene: Scene,
  screen: Screen,
  customBound: CustomBounds
) {
  const customBounds = scene.physics.add.staticGroup();
  ['up', 'down', 'left', 'right'].forEach((orientation: Orientation) => {
    if (!customBound[orientation]) return;

    const config = customBound[orientation];

    let width = screen.width / 2 + 60;
    let height = screen.height / 2 + 60;
    let x = screen.relativeX(config.x);
    let y = screen.relativeY(config.y);

    switch (orientation) {
      case 'up': {
        height = (screen.height * config.padding) / 100;
        x += width / 2;
        break;
      }
      case 'down': {
        height = (screen.height * config.padding) / 100;
        x += width / 2;
        break;
      }
      case 'left': {
        width = (screen.width * 2 * config.padding) / 100;
        y += height / 2 - 60;
        break;
      }
      case 'right': {
        width = (screen.width * 2 * config.padding) / 100;
        y += height / 2 - 60;
        break;
      }
    }

    customBounds.add(scene.add.rectangle(x, y, width, height, 0x000, 0), true);
  });

  scene.physics.add.collider(player, customBounds);
}

export function generateCustomBounds(
  screen: Screen,
  paddings: { top: number; bottom: number; horizontal: number },
  config: { [Key in Orientation]?: number }
): CustomBounds {
  const bound = {
    up: (offset: number): CustomBoundConfig => ({
      x: offset,
      y: 2,
      padding: paddings.top,
    }),
    down: (offset: number): CustomBoundConfig => ({
      x: offset,
      y: 100,
      padding: paddings.top + paddings.bottom,
    }),
    left: (offset: number): CustomBoundConfig => ({
      x: 0,
      y: offset,
      padding: paddings.horizontal,
    }),
    right: (offset: number): CustomBoundConfig => ({
      x: 100,
      y: offset,
      padding: paddings.horizontal,
    }),
  };

  return {
    up: config.up ? bound.up(config.up) : undefined,
    right: config.right ? bound.right(config.right) : undefined,
    down: config.down ? bound.down(config.down) : undefined,
    left: config.left ? bound.left(config.left) : undefined,
  };
}
