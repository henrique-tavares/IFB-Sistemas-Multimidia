import BaseProp from './baseProp';

export default class Stairs extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, `graveyard:stairs`, `dungeon:room_00`);
  }
}
