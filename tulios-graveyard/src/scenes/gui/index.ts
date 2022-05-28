import Screen from '../../utils/screen';
import Tulio from '../../utils/tulio';
import Weapon, { WeaponType } from '../../utils/weapon';

export default class GUIScene extends Phaser.Scene {
  private screen: Screen;
  private player: Tulio;
  
  private weapon: Weapon;
  private ammunitionText: Phaser.GameObjects.Text;
  private ammunitionIcon: Phaser.GameObjects.Image;
  
  private health: integer;
  private hearts: Phaser.GameObjects.Image[];

  constructor() {
    super('gui-scene');
  }

  create() {
    this.scene.bringToTop();
    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.screen = new Screen(this.scale);
    
    this.player = new Tulio(this);
    this.player.sprite.destroy();

    this.weapon = this.player.weapon;
    const weaponBg = this.add.image(this.screen.relativeX(7), this.screen.relativeY(8), 'gui:inventory_bg');
    if(this.weapon){
      this.add.image(weaponBg.x, weaponBg.y, `${this.weapon.key}`);
      this.createAmmunitionText(weaponBg.x, weaponBg.y)
    }

    this.health = this.player.currentHealth;
    this.handleHealthHearts(weaponBg.x + 30, weaponBg.y);
  }

  createAmmunitionText(x: integer, y: integer){
    x -= 15;
    y += 30;
    if (this.weapon.type === WeaponType.shovel){
      this.ammunitionText = this.add.text(
        x,
        y,
        'x',
        {color: '#EDEDED', fontFamily: 'ZillaSlab', fontSize: '20px'}
      );
      this.ammunitionIcon = this.add.image(x + 22, y + 10, 'gui:infinity');
    } else {
      this.ammunitionText = this.add.text(
        x,
        y,
        `x${this.weapon.currentAmmunition}`,
        {color: '#EDEDED', fontFamily: 'ZillaSlab', fontSize: '20px'}
      );
      this.ammunitionIcon = this.add.image(x + this.ammunitionText.width + 10, y + 15, 'gui:bullet');
    }
  }

  handleAmmunitionText(){
    this.ammunitionText.setText(`x${this.weapon.currentAmmunition}`);
  }

  handleHealthHearts(x: integer, y: integer){
    this.hearts = [];
    var num = 1;

    // Full hearts
    for (num; num <= ((this.health / 2) | 0); num++){
      this.hearts.push(this.add.image(x + 30 * num, y, 'gui:hearts', 0));
    }
    
    // Half heart
    if (this.health % 2){
      this.hearts.push(this.add.image(x + 30 * num, y, 'gui:hearts', 2));
      num++;
    }
    
    // Empty hearts
    for (num; num <= 5; num++){
      this.hearts.push(this.add.image(x + 30 * num, y, 'gui:hearts', 4));
    }

    this.hearts.forEach((heart:  Phaser.GameObjects.Image) => {heart.setScale(1.5)})
  }
}
