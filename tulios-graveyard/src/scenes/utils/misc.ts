import BaseProp from '../../props/baseProp';
import Screen from './screen';

export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function isEmpty(data: { [k: string]: any }) {
  return Object.entries(data).length === 0;
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
    .map(() => Math.floor(Math.random() * (max - min) + min));
}

export function isPropPositionValid(prop: BaseProp, shape: Phaser.GameObjects.Shape) {
  return Phaser.Geom.Rectangle.Intersection(shape.getBounds(), prop.getBounds()).isEmpty();
}
