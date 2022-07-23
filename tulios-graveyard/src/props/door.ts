import BaseProp from './baseProp';

export default class Door extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number, variant: 1 | 2 | 3 | 4 | 5, destiny: string) {
    super(scene, x, y, variant === 5 ? `dungeon:door-${variant}` : `graveyard:door-${variant}`, destiny);


    switch(variant){
      case 4:
        this.setScale(1.3);

        this.setOrigin(0.5, 0.6);
        
        this.anims.create({
          key: "open",
            frames: this.anims.generateFrameNumbers("prop:graveyard:door-4", {
              start: 0,
              end: 5
            }),
            frameRate: 5,
            repeat: 0,
        });
        break;
      case 5:
        this.setScale(2.5);
        this.resize({width: 1, height: 1});

        this.setOrigin(0.2, 0.4);

        this.anims.create({
          key: "open",
            frames: this.anims.generateFrameNumbers("prop:dungeon:door-5", {
              start: 0,
              end: 13
            }),
            frameRate: 8,
            repeat: 0,
        });
        break;
      default:
        this.setOrigin(0.52, 0.5);
        break;
    }
  }
}
