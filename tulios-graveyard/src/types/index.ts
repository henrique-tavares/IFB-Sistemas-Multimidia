import Weapon from '../items/weapon';

export interface BackgroundBorderConfig {
  hasLeft?: boolean;
  hasRight?: boolean;
  hasTop?: boolean;
  hasBottom?: boolean;
}

export interface BackgroundBorder {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export type Orientation = 'up' | 'right' | 'down' | 'left';

export type NextRoom = { [Key in Orientation]?: string | [string, string] };

export type NextRoomData = { [Key in Orientation]?: NextRoomPlayerCoordinate };

export type NextRoomPlayerCoordinate = PlayerCoordinate | [PlayerCoordinate, PlayerCoordinate];

export interface PlayerCoordinate {
  x: {
    relative: boolean;
    value?: number;
    offset?: number;
  };
  y: {
    relative: boolean;
    value?: number;
    offset?: number;
  };
}

export interface NextRoomDest {
  mode: 'single' | 'double';
  offset?: number;
  offsets?: [number, number];
}

export type CustomBoundConfig = {
  x: number;
  y: number;
  padding: number;
};

export interface CustomBounds {
  up?: CustomBoundConfig;
  right?: CustomBoundConfig;
  down?: CustomBoundConfig;
  left?: CustomBoundConfig;
}

export interface NextRoomArrowPosition {
  up?: -1 | 1;
  right?: -1 | 1;
  down?: -1 | 1;
  left?: -1 | 1;
}

export enum RoomSize {
  '1x1',
  '2x1',
  '1x2',
  '2x2',
}

export enum GraveyardProp {
  Tree1,
  Tree2,
  Tree3,
  Tombstone1,
  Tombstone2,
  Tombstone3,
}

export interface TulioData {
  health: number;
  weapon: Weapon;
}
