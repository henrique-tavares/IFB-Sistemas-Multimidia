import "phaser";
import Credits from "./scenes/credits";
import Death from "./scenes/death";
import Dialog from "./scenes/dialog";
import Dungeon from "./scenes/dungeon";
import End from "./scenes/end/end";
import Graveyard from "./scenes/graveyard";
import GUIScene from "./scenes/gui";
import Interiors from "./scenes/interiors";
import Preloader from "./scenes/preloader";
import Start from "./scenes/start";

export const fadeDuration = 500;

const scenesList = [
  Preloader,
  Start,
  Credits,
  GUIScene,
  Death,
  Dialog,
  End,
  ...Interiors,
  ...Graveyard,
  ...Dungeon,
];
export const scenesMap = scenesList.reduce(
  (acc: { [x: string]: typeof scene }, scene) => ({
    ...acc,
    [scene.key]: scene,
  }),
  {}
);

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#000",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0,
      },
      debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    width: 800,
    height: 600,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: scenesList,
};

const game = new Phaser.Game(config);
