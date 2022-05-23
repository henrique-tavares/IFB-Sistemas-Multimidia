export default class AudioHandler {
  private soundEnabled: boolean;
  private musicEnabled: boolean;

  constructor() {
    this.soundEnabled = true;
    this.musicEnabled = true;
  }

  turnOffSound() {
    this.soundEnabled = false;
  }

  turnOnSound() {
    this.soundEnabled = true;
  }

  get sound(): boolean {
    return this.soundEnabled;
  }

  turnOffMusic() {
    this.musicEnabled = false;
  }

  turnOnMusic() {
    this.musicEnabled = true;
  }

  get music(): boolean {
    return this.musicEnabled;
  }

  handleBackgroundMusic(scene: Phaser.Scene) {
    const sceneKey = scene.sys.config as string;
    scene.sound.pauseOnBlur = false;

    if (['start', 'credits', 'options'].includes(sceneKey)) {
      if (scene.sound.get('bg_start_music')) {
        return;
      }

      scene.sound.removeByKey('bg_graveyard_music');
      scene.sound.removeByKey('bg_dungeon_music');

      scene.sound.add('bg_start_music', { volume: 0.1, loop: true }).play();
      return;
    }

    if (sceneKey.startsWith('graveyard:')) {
      if (scene.sound.get('bg_graveyard_music')) {
        return;
      }

      scene.sound.removeByKey('bg_start_music');
      scene.sound.removeByKey('bg_dungeon_music');

      scene.sound.add('bg_graveyard_music', { volume: 0.1, loop: true }).play();
      return;
    }

    if (sceneKey.startsWith('dungeon:')) {
      if (scene.sound.get('bg_dungeon_music')) {
        return;
      }

      scene.sound.removeByKey('bg_start_music');
      scene.sound.removeByKey('bg_graveyard_music');

      scene.sound.add('bg_dungeon_music', { volume: 0.1, loop: true }).play();
      return;
    }
  }
}
