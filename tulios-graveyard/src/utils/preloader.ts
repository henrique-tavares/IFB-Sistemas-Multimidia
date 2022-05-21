import AudioHandler from './audioHandler';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('title-screen:background', 'assets/title_screen/background.png');
    this.load.image('title-screen:title', 'assets/title_screen/title.png');
    this.load.image('title-screen:button_iniciar', 'assets/title_screen/button_iniciar.png');
    this.load.image('title-screen:button_creditos', 'assets/title_screen/button_creditos.png');
    this.load.spritesheet('characters:tulio', 'assets/characters/Tulio.png', {
      frameWidth: 24,
      frameHeight: 32,
    });
    this.load.audio('bg_start_music', 'audio/bg_start_music.wav');
    this.load.audio('bg_graveyard_music', 'audio/bg_graveyard_music.wav');

    this.cache.addCustom('handlers').add('audioHandler', new AudioHandler());
  }

  create() {
    this.scene.start('start');
  }

  update() {}
}
