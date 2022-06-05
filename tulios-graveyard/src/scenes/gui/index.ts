import AudioHandler from '../../utils/audioHandler';
import Screen from '../../utils/screen';
import Tulio from '../../utils/tulio';
import Weapon, { WeaponType } from '../../utils/weapon';

export default class GUIScene extends Phaser.Scene {
  private screen: Screen;
  private player: Tulio;
  private audioHandler: AudioHandler;
  
  private weapon: Weapon;
  private ammunitionText: Phaser.GameObjects.Text;
  private ammunitionIcon: Phaser.GameObjects.Image;
  
  private health: integer;
  private hearts: Phaser.GameObjects.Image[];

  private pauseButton: Phaser.GameObjects.Image;
  private pauseScreenGroup: Phaser.GameObjects.Group;

  constructor() {
    super('gui-scene');
  }

  create() {
    this.scene.bringToTop();
    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.screen = new Screen(800, 600);
    this.audioHandler = new AudioHandler();
    
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

    this.createPauseUI();
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

  createPauseUI(){
    this.pauseButton = this.add
      .image(this.screen.relativeX(92), this.screen.relativeY(8), 'gui:button_pause')
      .setInteractive({
        useHandCursor: true,
      }).on('pointerdown', () => {
        this.startPause();
      });
  
    this.pauseScreenGroup = this.add.group();
    const overlay = this.add.graphics({
      x: 0, 
      y: 0, 
      fillStyle: {color: 0x000000, alpha: 0.5}})
      .fillRect(0, 0, this.screen.width, this.screen.height);

    const pauseText = this.add.text(0, 0, 'PAUSADO', {
      fontFamily: 'MinimalPixel',
      fontSize: '56px',
      color: '#EDEDED',
      shadow:{
        fill: true,
        blur: 10,
        offsetY: 8
      }
    });
    pauseText.setPosition(this.screen.relativeX(50) - pauseText.width / 2, this.screen.relativeY(35));
    
    const continueButton = this.add
      .image(this.screen.relativeX(50), this.screen.relativeY(55), 'gui:button_default_up')
      .setInteractive({
        useHandCursor: true,
      })
      .on('pointerdown', () => {
        continueButton.setTexture('gui:button_default_down');
        continueText.setPadding(0, 3, 0, 0);
      })
      .on('pointerup', () => {
        continueButton.setTexture('gui:button_default_up');
        continueText.setPadding(0, 0, 0, 0);
        this.stopPause('continue');
      });

    const continueText = this.add.text(0, 0, 'CONTINUAR', {
      fontFamily: 'MinimalPixel',
      fontSize: '18px',
      color: '#EDEDED',
    });
    continueText.setPosition(continueButton.x - continueText.width / 2, continueButton.y - continueText.height / 2 - 4);

    const menuButton = this.add
      .image(this.screen.relativeX(50), this.screen.relativeY(65), 'gui:button_default_up')
      .setInteractive({
        useHandCursor: true,
      })
      .on('pointerdown', () => {
        menuButton.setTexture('gui:button_default_down');
        menuText.setPadding(0, 3, 0, 0);
      })
      .on('pointerup', () => {
        menuButton.setTexture('gui:button_default_up');
        menuText.setPadding(0, 0, 0, 0);
        this.stopPause('menu');
      });

    const menuText = this.add.text(0, 0, 'MENU', {
        fontFamily: 'MinimalPixel',
        fontSize: '18px',
        color: '#EDEDED',
      });
    menuText.setPosition(menuButton.x - menuText.width / 2, menuButton.y - menuText.height / 2 - 4);

    const musicButton = this.add
      .image(this.screen.relativeX(92), this.screen.relativeY(8), 'gui:music_icon_on')
      .setScale(0.7)
      .setInteractive({
        useHandCursor: true,
      })
      .on('pointerdown', () => {
        if (this.audioHandler.music) {
          musicButton.setTexture('gui:music_icon_off');  
          this.audioHandler.turnOffMusic(this);
        } else {
          musicButton.setTexture('gui:music_icon_on');
          const activeScenes = this.scene.manager.getScenes(true);
          const playableScene = activeScenes.find((scene) => {
            return scene.sys.config.toString().startsWith('graveyard:') || scene.sys.config.toString().startsWith('dungeon:');
          }); 
          this.audioHandler.turnOnMusic(playableScene);
        }
      });
    
    this.pauseScreenGroup.addMultiple([overlay, pauseText, continueButton, continueText, menuButton, menuText, musicButton]);
    this.pauseScreenGroup.setVisible(false);
  }

  startPause(){
    this.pauseButton.setVisible(false);
    this.pauseScreenGroup.toggleVisible();
    this.scene.pause('ui-scene');
  }

  stopPause(key: string){
    this.pauseButton.setVisible(true);
    this.pauseScreenGroup.toggleVisible();
    this.scene.resume('ui-scene');

    if(key === 'menu'){
      this.handleMenuButton();
    }
  }

  handleMenuButton(){
    const activeScenes = this.scene.manager.getScenes(true);
    activeScenes.forEach((s) => {this.scene.stop(s.sys.config as string)});
    this.scene.start('start'); 
  }
}
