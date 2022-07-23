import AudioHandler from "../../handlers/audioHandler";
import PlayerHandler from "../../handlers/playerHandler";
import ProgressHandler from "../../handlers/progressHandler";
import Screen from "../utils/screen";

export default class Preloader extends Phaser.Scene {
  static key = "preloader";

  progressBox: Phaser.GameObjects.Graphics;
  progressBar: Phaser.GameObjects.Graphics;
  loadingText: Phaser.GameObjects.Text;

  constructor() {
    super(Preloader.key);
  }

  preload() {
    const screen = new Screen(this.scale.width, this.scale.height);

    this.progressBox = this.add.graphics().fillStyle(0xffffff).fillRect(90, 420, 620, 50);

    this.progressBar = this.add.graphics();

    this.loadingText = this.add
      .text(screen.relativeX(50), screen.relativeY(50), "Loading .    ", {
        fontFamily: "MinimalPixel",
        fontSize: "62px",
        color: "#fff",
      })
      .setOrigin(0.5);

    this.tweens.addCounter({
      from: 0,
      to: 299,
      onUpdate: tween => {
        if (tween.getValue() < 100) {
          this.loadingText.setText("Loading .    ");
          return;
        }
        if (tween.getValue() < 200) {
          this.loadingText.setText("Loading . .  ");
          return;
        }

        this.loadingText.setText("Loading . . .");
      },
      loop: -1,
    });

    this.load.on("progress", (progress: number) => {
      this.progressBar.clear();
      this.progressBar.fillStyle(0x4f2494);
      this.progressBar.fillRect(100, 430, 600 * progress, 30);
    });

    this.load.on("complete", () => {
      this.scene.start("start");
    });

    this.load.image("title-screen:background", "assets/title_screen/background.png");
    this.load.image("title-screen:title", "assets/title_screen/title.png");
    this.load.image("title-screen:button_iniciar", "assets/title_screen/button_iniciar.png");
    this.load.image("title-screen:button_creditos", "assets/title_screen/button_creditos.png");

    this.load.image("death-screen:button_reiniciar", "assets/death_screen/button-reiniciar.png");
    this.load.image("death-screen:button_menu", "assets/death_screen/button-menu.png");

    this.load.image("gui:arrow-up", "assets/gui/arrow_up.png");
    this.load.image("gui:arrow-right", "assets/gui/arrow_right.png");
    this.load.image("gui:arrow-down", "assets/gui/arrow_down.png");
    this.load.image("gui:arrow-left", "assets/gui/arrow_left.png");
    this.load.image("gui:bullet", "assets/gui/bullet.png");
    this.load.image("gui:button_default_down", "assets/gui/button_default_down.png");
    this.load.image("gui:button_default_up", "assets/gui/button_default_up.png");
    this.load.image("gui:button_pause", "assets/gui/button_pause.png");
    this.load.image("gui:infinity", "assets/gui/infinity.png");
    this.load.image("gui:inventory_bg", "assets/gui/inventory_bg.png");
    this.load.image("gui:music_icon_on", "assets/gui/music_icon_on.png");
    this.load.image("gui:music_icon_off", "assets/gui/music_icon_off.png");
    this.load.image("gui:crosshair", "assets/gui/cursor_crosshair_white.png");
    this.load.image("gui:cursor", "assets/gui/cursor_white.png");

    this.load.spritesheet("gui:hearts", "assets/gui/hearts.png", {
      frameWidth: 17,
      frameHeight: 17,
    });

    this.load.image("weapon:shovel", "assets/weapons/shovel.png");
    this.load.image("weapon:pistol", "assets/weapons/pistol.png");
    this.load.image("weapon:shotgun", "assets/weapons/shotgun.png");
    this.load.image("weapon:bullet", "assets/weapons/bullet.png");

    this.load.image("graveyard:mausoleum:bg", "assets/graveyard/Mausoleum.png");
    this.load.image("graveyard:toolshed:bg", "assets/graveyard/Tool Shed.png");
    this.load.image("graveyard:house:bg", "assets/graveyard/Tulios House.png");
    this.load.image("graveyard:room_00:bg", "assets/graveyard/Room - [0,0]_ House.png");
    this.load.image("graveyard:room_01:bg", "assets/graveyard/Room - [0,1].png");
    this.load.image("graveyard:room_02_03:bg", "assets/graveyard/Room - ([0,2], [0,3]).png");
    this.load.image("graveyard:room_04_14:bg", "assets/graveyard/Room - ([0,4], [1,4]).png");
    this.load.image("graveyard:room_05:bg", "assets/graveyard/Room - [0,5].png");
    this.load.image(
      "graveyard:room_06_07_16_17:bg",
      "assets/graveyard/Room - ([0,6], [0,7], [1,6], [1,7])_ Key.png"
    );
    this.load.image("graveyard:room_10:bg", "assets/graveyard/Room - [1,0].png");
    this.load.image("graveyard:room_11:bg", "assets/graveyard/Room - [1,1].png");
    this.load.image("graveyard:room_12:bg", "assets/graveyard/Room - [1,2].png");
    this.load.image("graveyard:room_13:bg", "assets/graveyard/Room - [1,3].png");
    this.load.image("graveyard:room_15:bg", "assets/graveyard/Room - [1,5].png");
    this.load.image("graveyard:room_20_30:bg", "assets/graveyard/Room - ([2,0], [3,0]).png");
    this.load.image("graveyard:room_21:bg", "assets/graveyard/Room - [2,1].png");
    this.load.image("graveyard:room_22:bg", "assets/graveyard/Room - [2,2].png");
    this.load.image("graveyard:room_23_33:bg", "assets/graveyard/Room - ([2,3], [3,3]).png");
    this.load.image("graveyard:room_24:bg", "assets/graveyard/Room - [2,4].png");
    this.load.image("graveyard:room_25:bg", "assets/graveyard/Room - [2,5].png");
    this.load.image("graveyard:room_26:bg", "assets/graveyard/Room - [2,6].png");
    this.load.image("graveyard:room_27:bg", "assets/graveyard/Room - [2,7].png");
    this.load.image("graveyard:room_31_32:bg", "assets/graveyard/Room - ([3,1], [3,2]).png");
    this.load.image("graveyard:room_34:bg", "assets/graveyard/Room - [3,4].png");
    this.load.image("graveyard:room_35_36:bg", "assets/graveyard/Room - ([3,5], [3,6]).png");
    this.load.image("graveyard:room_37:bg", "assets/graveyard/Room - [3,7].png");
    this.load.image(
      "graveyard:room_40_50_41_51:bg",
      "assets/graveyard/Room - ([4,0], [5,0], [4,1], [5,1])_ Key.png"
    );
    this.load.image("graveyard:room_42:bg", "assets/graveyard/Room - [4,2].png");
    this.load.image("graveyard:room_43:bg", "assets/graveyard/Room - [4,3].png");
    this.load.image("graveyard:room_44_54:bg", "assets/graveyard/Room - ([4,4], [5,4]).png");
    this.load.image("graveyard:room_45:bg", "assets/graveyard/Room - [4,5].png");
    this.load.image("graveyard:room_46:bg", "assets/graveyard/Room - [4,6].png");
    this.load.image("graveyard:room_47:bg", "assets/graveyard/Room - [4,7]_ Mausoleum.png");
    this.load.image("graveyard:room_52_53:bg", "assets/graveyard/Room - ([5,2], [5,3]).png");
    this.load.image("graveyard:room_55:bg", "assets/graveyard/Room - [5,5].png");
    this.load.image("graveyard:room_56_57:bg", "assets/graveyard/Room - ([5,6], [5,7]).png");

    this.load.image("dungeon:room_00:bg", "assets/dungeon/Room 0.png");
    this.load.image("dungeon:room_01:bg", "assets/dungeon/Room 1.png");
    this.load.image("dungeon:room_02:bg", "assets/dungeon/Room 2.png");
    this.load.image("dungeon:room_03R:bg", "assets/dungeon/Room 3R.png");
    this.load.image("dungeon:room_04R:bg", "assets/dungeon/Room 4R.png");
    this.load.image("dungeon:room_05R:bg", "assets/dungeon/Room 5_9_10R-9L.png");
    this.load.image("dungeon:room_06R:bg", "assets/dungeon/Room 6R.png");
    this.load.image("dungeon:room_07R:bg", "assets/dungeon/Room 7R.png");
    this.load.image("dungeon:room_08R:bg", "assets/dungeon/Room 8R-7L.png");
    this.load.image("dungeon:room_09R:bg", "assets/dungeon/Room 5_9_10R-9L.png");
    this.load.image("dungeon:room_10R:bg", "assets/dungeon/Room 5_9_10R-9L.png");
    this.load.image("dungeon:room_11R:bg", "assets/dungeon/Room 11R.png");
    this.load.image("dungeon:room_12R:bg", "assets/dungeon/Room 12R.png");
    this.load.image("dungeon:room_13R:bg", "assets/dungeon/Room 13R-3_14L.png");
    this.load.image("dungeon:room_03L:bg", "assets/dungeon/Room 13R-3_14L.png");
    this.load.image("dungeon:room_04L:bg", "assets/dungeon/Room 4L.png");
    this.load.image("dungeon:room_05L:bg", "assets/dungeon/Room 5L.png");
    this.load.image("dungeon:room_06L:bg", "assets/dungeon/Room 6L.png");
    this.load.image("dungeon:room_07L:bg", "assets/dungeon/Room 8R-7L.png");
    this.load.image("dungeon:room_08L:bg", "assets/dungeon/Room 8L.png");
    this.load.image("dungeon:room_09L:bg", "assets/dungeon/Room 5_9_10R-9L.png");
    this.load.image("dungeon:room_10L:bg", "assets/dungeon/Room 10L.png");
    this.load.image("dungeon:room_11L:bg", "assets/dungeon/Room 11L.png");
    this.load.image("dungeon:room_12L:bg", "assets/dungeon/Room 12L.png");
    this.load.image("dungeon:room_13L:bg", "assets/dungeon/Room 13L.png");
    this.load.image("dungeon:room_14L:bg", "assets/dungeon/Room 13R-3_14L.png");
    this.load.image("dungeon:room_15:bg", "assets/dungeon/Room 15.png");
    this.load.image("dungeon:room_16:bg", "assets/dungeon/Room 16.png");
    this.load.image("dungeon:room_17:bg", "assets/dungeon/Room 17.png");
    this.load.image("dungeon:room_18:bg", "assets/dungeon/Room 18.png");

    this.load.image("prop:graveyard:tombstone-1", "assets/props/graveyard/outside/tombstone-1.png");
    this.load.image("prop:graveyard:tombstone-2", "assets/props/graveyard/outside/tombstone-2.png");
    this.load.image("prop:graveyard:tombstone-3", "assets/props/graveyard/outside/tombstone-3.png");
    this.load.image("prop:graveyard:tree-1", "assets/props/graveyard/outside/Tree-1.png");
    this.load.image("prop:graveyard:tree-2", "assets/props/graveyard/outside/Tree-2.png");
    this.load.image("prop:graveyard:tree-3", "assets/props/graveyard/outside/Tree-3.png");
    this.load.image("prop:graveyard:house", "assets/props/graveyard/outside/House.png");
    this.load.image("prop:graveyard:cabin", "assets/props/graveyard/outside/Cabin.png");
    this.load.image("prop:graveyard:mausoleum", "assets/props/graveyard/outside/Mausoleum.png");
    this.load.image("prop:graveyard:key", "assets/props/graveyard/outside/mausoleum-key.png");

    this.load.image("prop:graveyard:home-lamp", "assets/props/graveyard/interior/home-lamp.png");
    this.load.image("prop:graveyard:trashcan", "assets/props/graveyard/interior/trashcan.png");
    this.load.image("prop:graveyard:sofa", "assets/props/graveyard/interior/sofa.png");
    this.load.image("prop:graveyard:blue-chest", "assets/props/graveyard/interior/blue-chest.png");
    this.load.image(
      "prop:graveyard:hanging-light",
      "assets/props/graveyard/interior/hanging-light.png"
    );
    this.load.image(
      "prop:graveyard:stone-coffin",
      "assets/props/graveyard/interior/stone-coffin.png"
    );
    this.load.image("prop:graveyard:stairs", "assets/props/graveyard/interior/stairs.png");
    this.load.image("prop:graveyard:box", "assets/props/graveyard/interior/box.png");
    this.load.image("prop:graveyard:door-1", "assets/props/graveyard/interior/door-1.png");
    this.load.image("prop:graveyard:door-2", "assets/props/graveyard/interior/door-2.png");
    this.load.image("prop:graveyard:door-3", "assets/props/graveyard/interior/door-3.png");
    this.load.spritesheet(
      "prop:graveyard:door-4",
      "assets/props/graveyard/outside/mausoleum_door_anim.png",
      {
        frameWidth: 31,
        frameHeight: 45,
      }
    );

    this.load.spritesheet("prop:dungeon:door-5", "assets/props/dungeon/jorge_door_anim.png", {
      frameWidth: 32,
      frameHeight: 28,
    });
    this.load.spritesheet("prop:dungeon:candlestick", "assets/props/dungeon/candlestick_anim.png", {
      frameWidth: 9,
      frameHeight: 16,
    });

    this.load.image("loot:pistol-bullet", "assets/loot/loot-pistol.png");
    this.load.image("loot:shotgun-bullet", "assets/loot/loot-shotgun.png");

    this.load.image("us:lazy-seal", "assets/the-gang/lazy-seal-pixelated.png");
    this.load.image("us:lazy-seal-name", "assets/the-gang/lazy-seal-name.png");
    this.load.image("us:neptune", "assets/the-gang/neptune-pixelated.png");
    this.load.image("us:neptune-name", "assets/the-gang/neptune-name.png");

    this.load.spritesheet("characters:tulio", "assets/characters/Tulio_SpriteSheet.png", {
      frameWidth: 26,
      frameHeight: 28,
    });

    this.load.spritesheet("characters:zombie", "assets/characters/Zombie.png", {
      frameWidth: 16,
      frameHeight: 28,
    });

    this.load.spritesheet("characters:jorge", "assets/characters/Jorge.png", {
      frameWidth: 22,
      frameHeight: 28,
    });

    this.load.audio("bg_start_music", "audio/bg_start_music.wav");
    this.load.audio("bg_graveyard_music", "audio/bg_graveyard_music.wav");
    this.load.audio("bg_dungeon_music", "audio/bg_dungeon_music.wav");
    this.load.audio("bg_marina_music", "audio/bg_marina_music.wav");

    this.load.audio("click-button", "audio/click-button.wav");
    this.load.audio("pickup-loot", "audio/pickup-loot.wav");

    this.load.audio("dungeon-walk", "audio/dungeon-walk.wav");
    this.load.audio("graveyard-walk", "audio/graveyard-walk.wav");

    this.load.audio("person-hit", "audio/person-hit.wav");
    this.load.audio("zombie-hit", "audio/zombie-hit.wav");

    this.load.audio("gun-empty", "audio/gun-empty.wav");
    this.load.audio("pistol-fire", "audio/pistol-fire.wav");
    this.load.audio("shotgun-fire", "audio/shotgun-fire.wav");
    this.load.audio("shovel-attack", "audio/shovel-attack.wav");

    this.cache
      .addCustom("handlers")
      .add("audioHandler", new AudioHandler())
      .add("playerHandler", new PlayerHandler())
      .add("progressHandler", new ProgressHandler());
  }

  create() {}
}
