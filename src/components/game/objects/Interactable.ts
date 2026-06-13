import Phaser from "phaser";
import { TILE_SIZE } from "../data/maps";
import { InteractableDef } from "../data/interactables";

function textureKey(def: InteractableDef): string {
  const map: Record<string, string> = {
    about: "obj_info",
    skills: "obj_skill",
    projects: "obj_project",
    experience: "obj_briefcase",
    education: "obj_graduation",
    contact: "obj_mail",
  };
  return map[def.sectionId] || "obj_info";
}

export class Interactable {
  public sprite: Phaser.GameObjects.Sprite;
  public zone: Phaser.GameObjects.Zone;
  public def: InteractableDef;
  private label: Phaser.GameObjects.Text;
  private glowTween: Phaser.Tweens.Tween | null = null;
  private pulseTween: Phaser.Tweens.Tween | null = null;

  constructor(scene: Phaser.Scene, def: InteractableDef) {
    this.def = def;
    const px = def.gridX * TILE_SIZE + TILE_SIZE / 2;
    const py = def.gridY * TILE_SIZE + TILE_SIZE / 2;

    this.sprite = scene.add.sprite(px, py, textureKey(def));
    this.sprite.setDepth(900);
    this.sprite.setInteractive({ useHandCursor: true });

    this.zone = scene.add.zone(px, py, TILE_SIZE * 2.5, TILE_SIZE * 2.5);
    scene.physics.add.existing(this.zone, true);

    this.label = scene.add.text(px, py - 24, def.name, {
      fontSize: "10px",
      color: "#ffffff",
      fontFamily: "Share Tech Mono, monospace",
      backgroundColor: "#0f172aee",
      padding: { x: 6, y: 3 },
    }).setOrigin(0.5).setDepth(1001);
    this.label.setVisible(false);

    // Idle pulse animation
    this.pulseTween = scene.tweens.add({
      targets: this.sprite,
      scaleX: 1.08,
      scaleY: 1.08,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  showLabel(visible: boolean) {
    this.label.setVisible(visible);
    if (visible) {
      this.sprite.setScale(1.2);
      if (this.pulseTween) this.pulseTween.pause();
      if (!this.glowTween) {
        this.glowTween = this.sprite.scene.tweens.add({
          targets: this.sprite,
          alpha: 0.7,
          duration: 400,
          yoyo: true,
          repeat: -1,
          ease: "Sine.easeInOut",
        });
      }
    } else {
      this.sprite.setScale(1);
      if (this.pulseTween) this.pulseTween.resume();
      if (this.glowTween) {
        this.glowTween.stop();
        this.glowTween = null;
      }
      this.sprite.setAlpha(1);
    }
  }

  destroy() {
    if (this.glowTween) this.glowTween.stop();
    if (this.pulseTween) this.pulseTween.stop();
    this.sprite.destroy();
    this.zone.destroy();
    this.label.destroy();
  }
}
