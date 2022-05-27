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
