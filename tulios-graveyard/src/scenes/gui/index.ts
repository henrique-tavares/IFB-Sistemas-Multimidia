import AudioHandler from "../../handlers/audioHandler";
import PlayerHandler from "../../handlers/playerHandler";
import { TulioData } from "../../types";
import Weapon, { WeaponType } from "../../weapons/weapon";
import Screen from "../utils/screen";
import Direction from "./direction";

export default class GUIScene extends Phaser.Scene {
  static key = "gui-scene";

  private screen: Screen;
  private audioHandler: AudioHandler;

  private weaponBg: Phaser.GameObjects.Image;
  private weapon?: {
    type: WeaponType;
    ammo: number;
  };
  private weaponIcon?: Phaser.GameObjects.Image;

  private ammunitionText?: Phaser.GameObjects.Text;
  private ammunitionIcon?: Phaser.GameObjects.Image;

  private health: number;
  private hearts: Phaser.GameObjects.Image[];

  private pauseButton: Phaser.GameObjects.Image;
  private pauseScreenGroup: Phaser.GameObjects.Group;

  private currSceneKey: string;

  constructor() {
    super(GUIScene.key);
  }

  create() {
    this.data.set("direction", new Direction(this));
    this.scene.bringToTop();
    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.screen = new Screen(800, 600);
    this.audioHandler = new AudioHandler();

    const playerHandler = this.cache.custom["handlers"].get("playerHandler") as PlayerHandler;

    this.weaponBg = this.add.image(
      this.screen.relativeX(7),
      this.screen.relativeY(8),
      "gui:inventory_bg"
    );

    this.handlePlayerData(playerHandler.playerData);

    this.events.on("refresh-player-data", (data: TulioData) => {
      this.handlePlayerData(data);
    });

    this.createPauseUI();
  }

  handlePlayerData(playerData: TulioData) {
    this.weapon = playerData.weapons[playerData.selectedWeapon ?? -1];

    const weaponKeyTranslator = {
      [WeaponType.shovel]: "weapon:shovel",
      [WeaponType.pistol]: "weapon:pistol",
      [WeaponType.shotgun]: "weapon:shotgun",
    };

    if (this.weapon) {
      this.clearWeapon();
      this.weaponIcon = this.add.image(
        this.weaponBg.x,
        this.weaponBg.y,
        weaponKeyTranslator[this.weapon.type]
      );
      switch (this.weapon.type) {
        case WeaponType.shotgun:
          this.weaponIcon.setScale(1.5);
          break;
        case WeaponType.pistol:
          this.weaponIcon.setScale(2);
          break;
      }
      this.createAmmunitionText(this.weaponBg.x, this.weaponBg.y);
    }

    this.health = playerData.health;
    this.handleHealthHearts(this.weaponBg.x + 30, this.weaponBg.y);
  }

  createAmmunitionText(x: number, y: number) {
    x -= 15;
    y += 30;

    if (this.weapon?.type === WeaponType.shovel) {
      this.ammunitionText = this.add.text(x, y, "x", {
        color: "#EDEDED",
        fontFamily: "ZillaSlab",
        fontSize: "20px",
      });
      this.ammunitionIcon = this.add.image(x + 22, y + 10, "gui:infinity");
      return;
    }

    this.ammunitionText = this.add.text(x, y, `x${this.weapon?.ammo}`, {
      color: "#EDEDED",
      fontFamily: "ZillaSlab",
      fontSize: "20px",
    });
    this.ammunitionIcon = this.add.image(x + this.ammunitionText.width + 10, y + 15, "gui:bullet");
  }

  handleAmmunitionText() {
    this.ammunitionText?.setText(`x${this.weapon?.ammo}`);
  }

  clearWeapon() {
    this.weaponIcon?.destroy();
    this.ammunitionIcon?.destroy();
    this.ammunitionText?.destroy();
  }

  handleHealthHearts(x: number, y: number) {
    this.hearts = [];
    let num = 1;

    // Full hearts
    for (num; num <= Math.floor(this.health / 2); num++) {
      this.hearts.push(this.add.image(x + 30 * num, y, "gui:hearts", 0));
    }

    // Half heart
    if (this.health % 2 == 1) {
      this.hearts.push(this.add.image(x + 30 * num, y, "gui:hearts", 2));
      num++;
    }

    // Empty hearts
    for (num; num <= 5; num++) {
      this.hearts.push(this.add.image(x + 30 * num, y, "gui:hearts", 4));
    }

    this.hearts.forEach((heart: Phaser.GameObjects.Image) => {
      heart.setScale(1.5);
    });
  }

  createPauseUI() {
    this.pauseButton = this.add
      .image(this.screen.relativeX(92), this.screen.relativeY(8), "gui:button_pause")
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerdown", () => {
        this.audioHandler.playSfx(this, "click-button", 0.2);
        this.startPause();
      });

    this.pauseScreenGroup = this.add.group();
    const overlay = this.add
      .graphics({
        x: 0,
        y: 0,
        fillStyle: { color: 0x000000, alpha: 0.5 },
      })
      .fillRect(0, 0, this.screen.width, this.screen.height);

    const pauseText = this.add.text(0, 0, "PAUSADO", {
      fontFamily: "MinimalPixel",
      fontSize: "56px",
      color: "#EDEDED",
      shadow: {
        fill: true,
        blur: 10,
        offsetY: 8,
      },
    });
    pauseText.setPosition(
      this.screen.relativeX(50) - pauseText.width / 2,
      this.screen.relativeY(35)
    );

    const continueButton = this.add
      .image(this.screen.relativeX(50), this.screen.relativeY(55), "gui:button_default_up")
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerdown", () => {
        this.audioHandler.playSfx(this, "click-button", 0.2);
        continueButton.setTexture("gui:button_default_down");
        continueText.setPadding(0, 3, 0, 0);
      })
      .on("pointerup", () => {
        continueButton.setTexture("gui:button_default_up");
        continueText.setPadding(0, 0, 0, 0);
        this.stopPause("continue");
      });

    const continueText = this.add.text(0, 0, "CONTINUAR", {
      fontFamily: "MinimalPixel",
      fontSize: "18px",
      color: "#EDEDED",
    });
    continueText.setPosition(
      continueButton.x - continueText.width / 2,
      continueButton.y - continueText.height / 2 - 4
    );

    const menuButton = this.add
      .image(this.screen.relativeX(50), this.screen.relativeY(65), "gui:button_default_up")
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerdown", () => {
        this.audioHandler.playSfx(this, "click-button", 0.2);
        menuButton.setTexture("gui:button_default_down");
        menuText.setPadding(0, 3, 0, 0);
      })
      .on("pointerup", () => {
        menuButton.setTexture("gui:button_default_up");
        menuText.setPadding(0, 0, 0, 0);
        this.stopPause("menu");
      });

    const menuText = this.add.text(0, 0, "MENU", {
      fontFamily: "MinimalPixel",
      fontSize: "18px",
      color: "#EDEDED",
    });
    menuText.setPosition(menuButton.x - menuText.width / 2, menuButton.y - menuText.height / 2 - 4);

    const musicButton = this.add
      .image(this.screen.relativeX(92), this.screen.relativeY(8), "gui:music_icon_on")
      .setScale(0.7)
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerdown", () => {
        this.audioHandler.playSfx(this, "click-button", 0.2);
        if (this.audioHandler.music) {
          musicButton.setTexture("gui:music_icon_off");
          this.audioHandler.turnOffMusic(this);
          return;
        }

        musicButton.setTexture("gui:music_icon_on");
        this.audioHandler.turnOnMusic(this.scene.manager.getScene(this.currSceneKey));
      });

    this.pauseScreenGroup.addMultiple([
      overlay,
      pauseText,
      continueButton,
      continueText,
      menuButton,
      menuText,
      musicButton,
    ]);
    this.pauseScreenGroup.setVisible(false);
  }

  startPause() {
    this.pauseButton.setVisible(false);
    this.pauseScreenGroup.toggleVisible();

    const activeScenes = this.scene.manager.getScenes(true);
    activeScenes.forEach(s => {
      if (s.scene.key != "gui-scene") {
        this.currSceneKey = s.sys.config as string;
        s.scene.pause();
      }
    });
  }

  stopPause(key: string) {
    this.pauseButton.setVisible(true);
    this.pauseScreenGroup.toggleVisible();

    if (key === "menu") {
      this.scene.stop(this.currSceneKey);
      this.scene.start("start");
    } else {
      this.scene.manager.getScene(this.currSceneKey).scene.resume();
    }
  }
}
