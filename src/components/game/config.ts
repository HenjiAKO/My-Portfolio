import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { SelectorScene } from "./scenes/SelectorScene";
import { HUDScene } from "./scenes/HUDScene";

export function createGameConfig(parent: HTMLElement): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.WEBGL,
    width: 800,
    height: 500,
    backgroundColor: "#0f172a",
    parent,
    pixelArt: true,
    roundPixels: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: false,
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [BootScene, SelectorScene, HUDScene],
  };
}
