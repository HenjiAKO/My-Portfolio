import Phaser from "phaser";
import { TILE_SIZE } from "../data/maps";

export class Player {
  public sprite: Phaser.GameObjects.Sprite;
  public shadow: Phaser.GameObjects.Image;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: { W: Phaser.Input.Keyboard.Key; A: Phaser.Input.Keyboard.Key; S: Phaser.Input.Keyboard.Key; D: Phaser.Input.Keyboard.Key };
  private speed: number = 150;
  private currentDir: string = "down";
  private moving: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    const px = x * TILE_SIZE + TILE_SIZE / 2;
    const py = y * TILE_SIZE + TILE_SIZE / 2;

    this.shadow = scene.add.image(px, py + 12, "shadow");
    this.shadow.setDepth(999);

    this.sprite = scene.add.sprite(px, py, "player_sheet", "down_0");
    this.sprite.setDepth(1000);

    scene.physics.add.existing(this.sprite);
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    body.setSize(16, 20);
    body.setOffset(8, 8);
    body.setCollideWorldBounds(true);

    const kb = scene.input.keyboard!;
    kb.addCapture([
      Phaser.Input.Keyboard.KeyCodes.UP,
      Phaser.Input.Keyboard.KeyCodes.DOWN,
      Phaser.Input.Keyboard.KeyCodes.LEFT,
      Phaser.Input.Keyboard.KeyCodes.RIGHT,
      Phaser.Input.Keyboard.KeyCodes.W,
      Phaser.Input.Keyboard.KeyCodes.A,
      Phaser.Input.Keyboard.KeyCodes.S,
      Phaser.Input.Keyboard.KeyCodes.D,
    ]);
    this.cursors = kb.createCursorKeys();
    this.wasd = {
      W: kb.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: kb.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: kb.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: kb.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
  }

  update() {
    let vx = 0;
    let vy = 0;

    if (this.cursors.left.isDown || this.wasd.A.isDown) { vx = -this.speed; }
    if (this.cursors.right.isDown || this.wasd.D.isDown) { vx = this.speed; }
    if (this.cursors.up.isDown || this.wasd.W.isDown) { vy = -this.speed; }
    if (this.cursors.down.isDown || this.wasd.S.isDown) { vy = this.speed; }

    if (vx !== 0 && vy !== 0) {
      vx *= 0.707;
      vy *= 0.707;
    }

    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(vx, vy);

    this.moving = vx !== 0 || vy !== 0;

    if (vy > 0) { this.currentDir = "down"; }
    else if (vy < 0) { this.currentDir = "up"; }
    else if (vx < 0) { this.currentDir = "left"; }
    else if (vx > 0) { this.currentDir = "right"; }

    if (this.moving) {
      this.sprite.play(`walk_${this.currentDir}`, true);
    } else {
      this.sprite.stop();
      this.sprite.setFrame(`${this.currentDir}_0`);
    }

    this.shadow.setPosition(this.sprite.x, this.sprite.y + 12);
  }

  setPosition(x: number, y: number) {
    const px = x * TILE_SIZE + TILE_SIZE / 2;
    const py = y * TILE_SIZE + TILE_SIZE / 2;
    this.sprite.setPosition(px, py);
    this.shadow.setPosition(px, py + 12);
  }

  destroy() {
    this.sprite.destroy();
    this.shadow.destroy();
  }

  getBody(): Phaser.Physics.Arcade.Body {
    return this.sprite.body as Phaser.Physics.Arcade.Body;
  }
}
