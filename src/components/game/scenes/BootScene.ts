import Phaser from "phaser";
import { generateTileTextures, generatePlayerTextures, generateShadowTexture, generateInteractableTextures, generateDecoTextures } from "../graphics/TileGenerator";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "Boot" });
  }

  create() {
    const cx = this.cameras.main.width / 2;
    const cy = this.cameras.main.height / 2;

    this.add.text(cx, cy - 32, "GENERATING WORLD...", {
      fontSize: "14px",
      color: "#3b82f6",
      fontFamily: "Share Tech Mono, monospace",
    }).setOrigin(0.5);

    const bar = this.add.rectangle(cx, cy + 4, 300, 16, 0x1e293b);
    const fill = this.add.rectangle(cx - 150, cy + 4, 0, 14, 0x3b82f6).setOrigin(0, 0.5);

    this.time.delayedCall(50, () => {
      generateTileTextures(this);
      fill.setSize(120, 14);
    });

    this.time.delayedCall(150, () => {
      generatePlayerTextures(this);
      generateShadowTexture(this);
      fill.setSize(200, 14);
    });

    this.time.delayedCall(250, () => {
      generateInteractableTextures(this);
      generateDecoTextures(this);
      fill.setSize(300, 14);
    });

    this.time.delayedCall(400, () => {
      this.add.text(cx, cy + 32, "DONE.", {
        fontSize: "10px",
        color: "#22c55e",
        fontFamily: "Share Tech Mono, monospace",
      }).setOrigin(0.5);
    });

    this.time.delayedCall(600, () => {
      this.cameras.main.fadeOut(300);
      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.scene.start("selector");
      });
    });
  }
}
