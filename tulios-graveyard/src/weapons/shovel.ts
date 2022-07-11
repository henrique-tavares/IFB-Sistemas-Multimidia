import { GameObjects, Math, Scene } from 'phaser';
import Tulio from '../entities/tulio';
import Weapon, { WeaponType } from './weapon';

export default class Shovel extends Weapon {
  /* key format -> `${x}${y}${orientation}`, 
        where x and y are   -> 0 if equal to 0;
                            -> 1 if greater than 0;
                            -> -1 if less than 0;
        and orientation is  -> 0 to 'up';
                            -> 1 to 'down';
                            -> 2 to 'left';
                            -> 3 to 'right';
  */
  readonly percents = {
    '000': {pctX: 1, pctY: 0.92},
    '001': {pctX: 1, pctY: 1.07},
    '002': {pctX: 0.95, pctY: 0.93},
    '003': {pctX: 1.05, pctY: 0.93},

    '010': {pctX: 1, pctY: 1},
    '011': {pctX: 1, pctY: 1.17},
    '012': {pctX: 0.95, pctY: 1},
    '013': {pctX: 1.05, pctY: 1},
    
    '0-10': {pctX: 1, pctY: 0.85},
    '0-11': {pctX: 1, pctY: 0.98},
    '0-12': {pctX: 0.95, pctY: 0.85},
    '0-13': {pctX: 1.05, pctY: 0.85},


    '100': {pctX: 1.05, pctY: 0.92},
    '101': {pctX: 1.05, pctY: 1.07},
    '102': {pctX: 1, pctY: 0.93},
    '103': {pctX: 1.15, pctY: 0.93},

    '110': {pctX: 1.05, pctY: 1},
    '111': {pctX: 1.05, pctY: 1.17},
    '112': {pctX: 1, pctY: 1},
    '113': {pctX: 1.15, pctY: 1},
    
    '1-10': {pctX: 1.05, pctY: 0.85},
    '1-11': {pctX: 1.05, pctY: 0.98},
    '1-12': {pctX: 1, pctY: 0.85},
    '1-13': {pctX: 1.15, pctY: 0.85},


    '-100': {pctX: 0.95, pctY: 0.92},
    '-101': {pctX: 0.95, pctY: 1.07},
    '-102': {pctX: 0.9, pctY: 0.93},
    '-103': {pctX: 1, pctY: 0.93},

    '-110': {pctX: 0.95, pctY: 1},
    '-111': {pctX: 0.95, pctY: 1.17},
    '-112': {pctX: 0.9, pctY: 1},
    '-113': {pctX: 1, pctY: 1},
    
    '-1-10': {pctX: 0.95, pctY: 0.85},
    '-1-11': {pctX: 0.95, pctY: 0.98},
    '-1-12': {pctX: 0.9, pctY: 0.85},
    '-1-13': {pctX: 1, pctY: 0.85},
  };

  constructor(scene: Scene) {
    super(scene, 'weapon:shovel', WeaponType.shovel, 2, Infinity);
    this.createAttackArea();
    console.log("Cena atual: ", this.scene.scene.key);
  }

  public get attackAreaRect(){
    return this.attackArea;
  }
  
  attack(owner: Tulio) {
    this.attackArea.displayWidth = 0.5 * owner.sprite.displayWidth;
    this.attackArea.displayHeight = owner.sprite.displayHeight;

    // console.log(owner.sprite.body.velocity.x, owner.sprite.body.velocity.y);

    switch(owner.facingDirection){
      case 'up': {
        const {pctX: pctX, pctY: pctY} = this.offset(owner.sprite.body.velocity, '0');
        this.attackArea.setPosition(pctX * owner.sprite.x, pctY * owner.sprite.y);
        break;
      }
      case 'down': { 
        const {pctX: pctX, pctY: pctY} = this.offset(owner.sprite.body.velocity, '1');
        this.attackArea.setPosition(pctX * owner.sprite.x, pctY * owner.sprite.y);
        break;
      }
      case 'left': {
        const {pctX: pctX, pctY: pctY} = this.offset(owner.sprite.body.velocity, '2');
        this.attackArea.setPosition(pctX * owner.sprite.x, pctY * owner.sprite.y);
        
        break;
      }
      case 'right': {
        const {pctX: pctX, pctY: pctY} = this.offset(owner.sprite.body.velocity, '3');
        this.attackArea.setPosition(pctX * owner.sprite.x, pctY * owner.sprite.y);
        
        break;
      }
    }
  }

  private offset(velocity: Math.Vector2, orientation: string): {pctX: number, pctY: number} {
    let xKey = velocity.x == 0 ? '0' : undefined;
    let yKey = velocity.y == 0 ? '0' : undefined;

    if(!xKey){
      if(velocity.x < 0){
        xKey = '-1';
      } else {
        xKey = '1';
      }
    }

    if(!yKey){
      if(velocity.y < 0){
        yKey = '-1';
      } else {
        yKey = '1';
      }
    }
    // console.log(`${xKey}${yKey}${orientation}`);
    return this.percents[`${xKey}${yKey}${orientation}`];
  }

  private createAttackArea(){
    this.attackArea = new GameObjects.Rectangle(this.scene, 100, 100, 50, 50);
    this.scene.add.existing(this.attackArea);
    this.scene.physics.add.existing(this.attackArea);
  }
}
