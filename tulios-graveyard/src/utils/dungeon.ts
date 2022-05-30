import 'phaser';
import { Scene } from 'phaser';
import { NextRoom, NextRoomData, NextRoomDest, NextRoomPlayerCoordinate, Orientation, PlayerCoordinate } from '../types';
import NextRoomArrow from "./nextRoomArrow";
import Screen from './screen';

export function handleNextRoomArrows(key: string, scene: Scene, screen: Screen, nextRoom: NextRoom, position: (-1) | 0 | 1){
  console.log("Handle nextRoom")
  console.log(Object.entries(nextRoom));
  const nextRoomArrows = Object.entries(nextRoom).map(
    ([key, value]) =>
      new NextRoomArrow(scene, screen, key as Orientation, Array.isArray(value) ? value.length : 1, position)
  );

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
    up: config?.up != undefined ? generateDirection('up', config.up) : undefined,
    right: config?.right != undefined ? generateDirection('right', config.right) : undefined,
    down: config?.down != undefined ? generateDirection('down', config.down) : undefined,
    left: config?.left != undefined ? generateDirection('left', config.left) : undefined,
  };
}
