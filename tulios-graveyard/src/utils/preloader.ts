import AudioHandler from './audioHandler';
import Screen from './screen';

export default class Preloader extends Phaser.Scene {
  progressBox: Phaser.GameObjects.Graphics;
  progressBar: Phaser.GameObjects.Graphics;
  loadingText: Phaser.GameObjects.Text;

  constructor() {
    super('preloader');
  }

  preload() {
    const screen = new Screen(this.scale.width, this.scale.height);

    this.progressBox = this.add.graphics().fillStyle(0xffffff).fillRect(90, 420, 620, 50);

    this.progressBar = this.add.graphics();

    this.loadingText = this.add
      .text(screen.relativeX(50), screen.relativeY(50), 'Loading .    ', {
        fontFamily: 'MinimalPixel',
        fontSize: '62px',
        color: '#fff',
      })
      .setOrigin(0.5);

    this.tweens.addCounter({
      from: 0,
      to: 299,
      onUpdate: tween => {
        if (tween.getValue() < 100) {
          this.loadingText.setText('Loading .    ');
          return;
        }
        if (tween.getValue() < 200) {
          this.loadingText.setText('Loading . .  ');
          return;
        }

        this.loadingText.setText('Loading . . .');
      },
      loop: -1,
    });

    this.load.on('progress', (progress: number) => {
      this.progressBar.clear();
      this.progressBar.fillStyle(0x4f2494);
      this.progressBar.fillRect(100, 430, 600 * progress, 30);
    });

    this.load.on('complete', () => {
      this.scene.start('start');
    });

    this.load.image('title-screen:background', 'assets/title_screen/background.png');
    this.load.image('title-screen:title', 'assets/title_screen/title.png');
    this.load.image('title-screen:button_iniciar', 'assets/title_screen/button_iniciar.png');
    this.load.image('title-screen:button_creditos', 'assets/title_screen/button_creditos.png');

    this.load.image('gui:arrow-up', 'assets/gui/arrow_up.png');
    this.load.image('gui:arrow-right', 'assets/gui/arrow_right.png');
    this.load.image('gui:arrow-down', 'assets/gui/arrow_down.png');
    this.load.image('gui:arrow-left', 'assets/gui/arrow_left.png');

    this.load.image('graveyard:room_00:bg', 'assets/graveyard/Room - [0,0]_ House.png');
    this.load.image('graveyard:room_01:bg', 'assets/graveyard/Room - [0,1].png');
    this.load.image('graveyard:room_02_03:bg', 'assets/graveyard/Room - ([0,2], [0,3]).png');
    this.load.image('graveyard:room_04_14:bg', 'assets/graveyard/Room - ([0,4], [1,4]).png');
    this.load.image('graveyard:room_05:bg', 'assets/graveyard/Room - [0,5].png');
    this.load.image('graveyard:room_06_07_16_17:bg', 'assets/graveyard/Room - ([0,6], [0,7], [1,6], [1,7])_ Key.png');
    this.load.image('graveyard:room_10:bg', 'assets/graveyard/Room - [1,0].png');
    this.load.image('graveyard:room_11:bg', 'assets/graveyard/Room - [1,1].png');
    this.load.image('graveyard:room_12:bg', 'assets/graveyard/Room - [1,2].png');
    this.load.image('graveyard:room_13:bg', 'assets/graveyard/Room - [1,3].png');
    this.load.image('graveyard:room_15:bg', 'assets/graveyard/Room - [1,5].png');
    this.load.image('graveyard:room_20_30:bg', 'assets/graveyard/Room - ([2,0], [3,0]).png');
    this.load.image('graveyard:room_21:bg', 'assets/graveyard/Room - [2,1].png');
    this.load.image('graveyard:room_22:bg', 'assets/graveyard/Room - [2,2].png');
    this.load.image('graveyard:room_23_33:bg', 'assets/graveyard/Room - ([2,3], [3,3]).png');
    this.load.image('graveyard:room_24:bg', 'assets/graveyard/Room - [2,4].png');
    this.load.image('graveyard:room_25:bg', 'assets/graveyard/Room - [2,5].png');
    this.load.image('graveyard:room_26:bg', 'assets/graveyard/Room - [2,6].png');
    this.load.image('graveyard:room_27:bg', 'assets/graveyard/Room - [2,7].png');
    this.load.image('graveyard:room_31_32:bg', 'assets/graveyard/Room - ([3,1], [3,2]).png');
    this.load.image('graveyard:room_34:bg', 'assets/graveyard/Room - [3,4].png');
    this.load.image('graveyard:room_35_36:bg', 'assets/graveyard/Room - ([3,5], [3,6]).png');
    this.load.image('graveyard:room_40_50_41_51:bg', 'assets/graveyard/Room - ([4,0], [5,0], [4,1], [5,1])_ Key.png');
    this.load.image('graveyard:room_42:bg', 'assets/graveyard/Room - [4,2].png');
    this.load.image('graveyard:room_43:bg', 'assets/graveyard/Room - [4,3].png');
    this.load.image('graveyard:room_44_54:bg', 'assets/graveyard/Room - ([4,4], [5,4]).png');
    this.load.image('graveyard:room_45:bg', 'assets/graveyard/Room - [4,5].png');
    this.load.image('graveyard:room_46:bg', 'assets/graveyard/Room - [4,6].png');
    this.load.image('graveyard:room_47:bg', 'assets/graveyard/Room - [4,7]_ Mausoleum.png');
    this.load.image('graveyard:room_55:bg', 'assets/graveyard/Room - [5,5].png');
    this.load.image('graveyard:room_56_57:bg', 'assets/graveyard/Room - ([5,6], [5,7]).png');

    this.load.image('dungeon:room_00:bg', 'assets/dungeon/Room 0.png');
    this.load.image('dungeon:room_01:bg', 'assets/dungeon/Room 1.png');
    this.load.image('dungeon:room_02:bg', 'assets/dungeon/Room 1.1.png');
    this.load.image('dungeon:room_03:bg', 'assets/dungeon/Room 2L.png');
    this.load.image('dungeon:room_04:bg', 'assets/dungeon/Room 3L.png');
    this.load.image('dungeon:room_05:bg', 'assets/dungeon/Room 4L.png');
    this.load.image('dungeon:room_06:bg', 'assets/dungeon/Room 5L.png');
    this.load.image('dungeon:room_07:bg', 'assets/dungeon/Room 5L.1.png');
    this.load.image('dungeon:room_08:bg', 'assets/dungeon/Room 6L.png');
    this.load.image('dungeon:room_09:bg', 'assets/dungeon/Room 7L.png');
    this.load.image('dungeon:room_10:bg', 'assets/dungeon/Room 8L.png');
    this.load.image('dungeon:room_11:bg', 'assets/dungeon/Room 2R.png');
    this.load.image('dungeon:room_12:bg', 'assets/dungeon/Room 3R.png');
    this.load.image('dungeon:room_13:bg', 'assets/dungeon/Room 4R.png');
    this.load.image('dungeon:room_14:bg', 'assets/dungeon/Room 5R.png');
    this.load.image('dungeon:room_15:bg', 'assets/dungeon/Room 6R.png');
    this.load.image('dungeon:room_16:bg', 'assets/dungeon/Room 7R.png');
    this.load.image('dungeon:room_17:bg', 'assets/dungeon/Room 8R.png');
    this.load.image('dungeon:room_18:bg', 'assets/dungeon/Room 9.png');
    this.load.image('dungeon:room_19:bg', 'assets/dungeon/Room 10.png');
    this.load.image('dungeon:room_20:bg', 'assets/dungeon/Room 11.png');
    this.load.image('dungeon:room_21:bg', 'assets/dungeon/Room 12.png');

    this.load.spritesheet('characters:tulio', 'assets/characters/Tulio.png', {
      frameWidth: 16,
      frameHeight: 28,
    });

    this.load.audio('bg_start_music', 'audio/bg_start_music.wav');
    this.load.audio('bg_graveyard_music', 'audio/bg_graveyard_music.wav');
    this.load.audio('bg_dungeon_music', 'audio/bg_dungeon_music.wav');
    this.load.audio('bg_marina_music', 'audio/bg_marina_music.wav');

    this.cache.addCustom('handlers').add('audioHandler', new AudioHandler());
  }

  create() {}
}
