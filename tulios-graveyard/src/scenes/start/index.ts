import 'phaser';
import AudioHandler from '../../utils/audioHandler';
import Screen from '../../utils/screen';

export default class Start extends Phaser.Scene {
  screen: Screen;

  bg: Phaser.GameObjects.Image;
  title: Phaser.GameObjects.Image;

  constructor() {
    super('start');
  }

  preload() {}

  create() {
    this.screen = new Screen(this.scale);

    this.bg = this.add
      .image(this.screen.relativeX(50), this.screen.relativeY(50), 'title-screen:background')
      .setOrigin(0.5);
    this.bg.setScale(this.screen.height / this.bg.height);

    this.title = this.add
      .image(this.screen.relativeX(50), this.screen.relativeY(30), 'title-screen:title')
      .setOrigin(0.5);
    this.title.setScale(this.screen.widthRatio(this.title.width) * 0.8);

    const audioHandler = this.cache.custom['handlers'].get('audioHandler') as AudioHandler;
    audioHandler.handleBackgroundMusic(this);

    const titleRotationTimeline = this.tweens
      .createTimeline({ loop: -1 })
      .add({
        targets: this.title,
        angle: 3,
        duration: 750,
        yoyo: true,
      })
      .add({
        targets: this.title,
        angle: -3,
        duration: 750,
        yoyo: true,
      });

    const titleScaleTimeline = this.tweens
      .createTimeline({ loop: -1 })
      .add({
        targets: this.title,
        scale: this.title.scale * 1.05,
        duration: 500,
        yoyo: true,
      })
      .add({
        targets: this.title,
        scale: this.title.scale * 0.95,
        duration: 500,
        yoyo: true,
      });

    titleRotationTimeline.play();
    titleScaleTimeline.play();

    const buttonIniciar = this.add
      .image(this.screen.relativeX(50), this.screen.relativeY(70), 'title-screen:button_iniciar')
      .setScale(0.5)
      .setInteractive({
        useHandCursor: true,
      })
      .on('pointerover', () => {
        this.tweens.add({
          targets: buttonIniciar,
          scale: 0.5 * 1.1,
          duration: 200,
        });
      })
      .on('pointerout', () => {
        this.tweens.add({
          targets: buttonIniciar,
          scale: 0.5,
          duration: 200,
        });
      })
      .on('pointerdown', () => {
        this.scene.run('ui-scene');
        this.scene.start('graveyard:room_00');
      });

    const buttonCreditos = this.add
      .image(0, 0, 'title-screen:button_creditos')
      .setScale(0.5)
      .setPosition(this.screen.relativeX(50), this.screen.relativeY(85))
      .setInteractive({
        useHandCursor: true,
      })
      .on('pointerover', () => {
        this.tweens.add({
          targets: buttonCreditos,
          scale: 0.5 * 1.1,
          duration: 200,
        });
      })
      .on('pointerout', () => {
        this.tweens.add({
          targets: buttonCreditos,
          scale: 0.5,
          duration: 200,
        });
      });
  }

  update() {}
}
