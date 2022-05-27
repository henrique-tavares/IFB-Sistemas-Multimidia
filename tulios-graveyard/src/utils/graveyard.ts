import { NextRoomData, NextRoomDest, NextRoomPlayerCoordinate, Orientation, PlayerCoordinate } from '../types';

export function generateNextRoomData(config: { [Key in Orientation]?: NextRoomDest }): NextRoomData {
  const directions: { [Key in Orientation]: (offset?: number) => PlayerCoordinate } = {
    up: (offset?: number): PlayerCoordinate => ({
      x: {
        relative: false,
        offset,
      },
      y: {
        relative: true,
        value: 0,
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
        value: 100,
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

  function generateDirection(
    orientation: Orientation,
    { mode, offsets, offset }: NextRoomDest
  ): NextRoomPlayerCoordinate {
    switch (mode) {
      case 'single':
        return directions[orientation](offset);
      case 'double':
        return [directions[orientation](offsets[0]), directions[orientation](offsets[1])];
    }
  }

  return {
    up: config.up ? generateDirection('up', config.up) : undefined,
    right: config.right ? generateDirection('right', config.right) : undefined,
    down: config.down ? generateDirection('down', config.down) : undefined,
    left: config.left ? generateDirection('left', config.left) : undefined,
  };
}
