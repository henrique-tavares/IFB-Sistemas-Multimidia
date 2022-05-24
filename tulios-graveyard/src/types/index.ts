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

export type NextRoom = { [Key in Orientation]?: string };

export type NextRoomData = { [Key in Orientation]?: PlayerCoordinate };

export interface PlayerCoordinate {
  x: {
    relative: boolean;
    value?: number;
  };
  y: {
    relative: boolean;
    value?: number;
  };
}
