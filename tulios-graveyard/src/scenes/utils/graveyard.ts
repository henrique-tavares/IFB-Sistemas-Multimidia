import BaseProp from '../../props/baseProp';
import Tombstone from '../../props/tombstone';
import Tree from '../../props/tree';
import {
  GraveyardProps,
  NextRoomData,
  NextRoomDest,
  NextRoomPlayerCoordinate,
  Orientation,
  PlayerCoordinate,
} from '../../types';

export function generateNextRoomData(config: { [Key in Orientation]?: NextRoomDest }): NextRoomData {
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

export function graveyardPropBuilder(scene: Phaser.Scene, propKey: GraveyardProps, x: number, y: number): BaseProp {
  switch (propKey) {
    case GraveyardProps.Tree1: {
      return new Tree(scene, x, y, 1);
    }
    case GraveyardProps.Tree2: {
      return new Tree(scene, x, y, 2);
    }
    case GraveyardProps.Tree3: {
      return new Tree(scene, x, y, 3);
    }
    case GraveyardProps.Tombstone1: {
      return new Tombstone(scene, x, y, 1);
    }
    case GraveyardProps.Tombstone2: {
      return new Tombstone(scene, x, y, 2);
    }
    case GraveyardProps.Tombstone3: {
      return new Tombstone(scene, x, y, 3);
    }
  }
}
