import BaseProp from '../../props/baseProp';
import { Orientation } from '../../types';
import Screen from './screen';

export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function isEmpty(data: { [k: string]: any }) {
  return Object.entries(data).length === 0;
}

export function isBetween(min: number, num: number, max: number) {
  return min <= num && num <= max;
}

export function angleToDirection(angle: number): Orientation {
  if (isBetween(0, angle, Math.PI / 4) || isBetween((7 * Math.PI) / 4, angle, Math.PI * 2)) {
    return 'right';
  }

  if (isBetween(Math.PI / 4, angle, (3 * Math.PI) / 4)) {
    return 'up';
  }

  if (isBetween((3 * Math.PI) / 4, angle, (5 * Math.PI) / 4)) {
    return 'left';
  }

  if (isBetween((5 * Math.PI) / 4, angle, (7 * Math.PI) / 4)) {
    return 'down';
  }

  return 'down';
}

export function correctAngle(angle: number) {
  return angle < 0 ? -angle : Math.PI - angle + Math.PI;
}

export function angleToRadians(angle: number) {
  return (angle * Math.PI) / 180;
}

export const gameScreen = {
  relativeX(x: number) {
    return (800 * x) / 100;
  },
  relativeY(y: number) {
    return (600 * y) / 100;
  },
};

export function generateRandomPosition(screen: Screen) {
  return {
    x: screen.relativeX(Math.random() * 100),
    y: screen.relativeY(Math.random() * 100),
  };
}

export function generateRandomArray(length: number, min: number, max: number) {
  return Array(length)
    .fill(null)
    .map(() => Math.floor(randomInRange(min, max)));
}

export function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function isSpritePositionValid(
  sprite: Phaser.Physics.Arcade.Sprite,
  other: Phaser.GameObjects.Shape | Phaser.Physics.Arcade.Sprite
) {
  return Phaser.Geom.Rectangle.Intersection(other.getBounds(), sprite.getBounds()).isEmpty();
}
