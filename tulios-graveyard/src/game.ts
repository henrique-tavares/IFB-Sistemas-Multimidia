import "phaser";
import Credits from "./scenes/credits";
import Death from "./scenes/death";
import Dungeon from "./scenes/dungeon";
import Graveyard from "./scenes/graveyard";
import GUIScene from "./scenes/gui";
import Interiors from "./scenes/interiors";
import Preloader from "./scenes/preloader";
import Start from "./scenes/start";

const scenesList = [
  Preloader,
  Start,
  Credits,
  GUIScene,
  Death,
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
