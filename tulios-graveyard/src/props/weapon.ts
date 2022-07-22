import { WeaponType } from '../weapons/weapon';
import BaseProp from './baseProp';

export default class WeaponProp extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number, weaponType: WeaponType) {
    switch(weaponType){
      case(WeaponType.shovel):{
        super(scene, x, y, `weapon:shovel`);

        this
          .setScale(1.6)
          .setOrigin(0.3, 0.3)
          .resize({
            width: 1,
            height: 1,
          });
        break;
      }
      case(WeaponType.pistol):{
        super(scene, x, y, `weapon:pistol`);

        this
          .setRotation(Math.PI)
          .setScale(1.8)
          .setOrigin(0.7, 0.7)
          .resize({
            width: 1,
            height: 1,
          });
        break;
      }
      case(WeaponType.shotgun):{
        super(scene, x, y, `weapon:shotgun`);

        this
          .setRotation(Math.PI)
          .setScale(1.8)
          .setOrigin(0.7, 0.7)
          .resize({
            width: 1,
            height: 1,
          });
        break;
      }
    }
   
  }
}
