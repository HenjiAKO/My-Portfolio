import Phaser from "phaser";

export class HUDScene extends Phaser.Scene {
  private areaText!: Phaser.GameObjects.Text;
  private hintText!: Phaser.GameObjects.Text;
  private bgBar!: Phaser.GameObjects.Rectangle;

  constructor() {
    super({ key: "HUD", active: true });
  }

  create() {
    this.bgBar = this.add.rectangle(0, 0, 800, 32, 0x0f172a, 0.85)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(9998);

    this.areaText = this.add
      .text(16, 8, "PORTFOLIO", {
        fontSize: "12px",
        color: "#3b82f6",
        fontFamily: "Share Tech Mono, monospace",
        fontStyle: "bold",
      })
      .setScrollFactor(0)
      .setDepth(9999);

    this.hintText = this.add
      .text(784, 8, "WASD:Move  E:Interact", {
        fontSize: "10px",
        color: "#475569",
        fontFamily: "Share Tech Mono, monospace",
      })
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(9999);
  }

  updateAreaName(name: string) {
    this.areaText.setText(name.toUpperCase());
  }
}
