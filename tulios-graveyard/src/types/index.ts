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

export type NextRoom = { [Key in Orientation]?: string };

export type Orientation = 'up' | 'right' | 'down' | 'left';
