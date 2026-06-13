import Phaser from "phaser";
import { TILE_SIZE, TileType, MapData, generateMap, generateSmallMap } from "../data/maps";
import { INTERACTABLES, InteractableDef } from "../data/interactables";
import { Player } from "../objects/Player";
import { Interactable } from "../objects/Interactable";
import { generateTileTextures, generatePlayerTextures, generateShadowTexture, generateInteractableTextures, generateDecoTextures } from "../graphics/TileGenerator";

const TRANSITION_DURATION = 400;
const SEEDED_RANDOM_CACHE = new Map<string, number>();

function seededMod(s: number, max: number): number {
  return ((s * 16807 + s * 48271) % max + max) % max;
}

export abstract class BaseScene extends Phaser.Scene {
  protected player!: Player;
  protected interactables: Interactable[] = [];
  protected mapData!: MapData;
  private eKey!: Phaser.Input.Keyboard.Key;
  protected currentInteractable: Interactable | null = null;
  protected interactionHint!: Phaser.GameObjects.Text;
  protected movementLocked: boolean = false;
  protected seed: number = 0;
  protected wallGroup!: Phaser.Physics.Arcade.StaticGroup;
  private roomLabels: Phaser.GameObjects.Text[] = [];
  private waterTiles: Phaser.GameObjects.Image[] = [];
  private waterTween: Phaser.Tweens.Tween | null = null;

  constructor(key: string) {
    super({ key });
  }

  abstract getMapKey(): string;

  create(data?: { spawnX?: number; spawnY?: number; seed?: number }) {
    if (data?.seed !== undefined) {
      this.registry.set("sessionSeed", data.seed);
    }
    let sessionSeed = this.registry.get("sessionSeed") as number | undefined;
    if (sessionSeed === undefined) {
      sessionSeed = Math.floor(Math.random() * 100000);
      this.registry.set("sessionSeed", sessionSeed);
    }
    this.seed = this.getMapKey() === "hub" ? sessionSeed : sessionSeed + this.getMapKey().length;

    const key = this.getMapKey();
    if (key === "hub") {
      this.mapData = generateMap(key, this.seed);
    } else {
      const borderTile = key === "ProjectsArea" ? TileType.SAND : TileType.WATER;
      this.mapData = generateSmallMap(key, borderTile, this.seed);
    }

    this.generateTextures();
    this.renderTilemap();
    this.renderDecorations();
    this.renderRoomLabels();
    this.createPlayer(data);
    this.createInteractables();
    this.createInteractionHint();
    this.setupCamera();
    this.setupInput();
    this.setupCollisions();
    this.cameras.main.fadeIn(TRANSITION_DURATION);

    if (!this.scene.isActive("HUD")) {
      this.scene.launch("HUD");
    }
  }

  protected generateTextures() {
    generateTileTextures(this);
    generatePlayerTextures(this);
    generateShadowTexture(this);
    generateInteractableTextures(this);
    generateDecoTextures(this);
  }

  protected renderTilemap() {
    this.wallGroup = this.physics.add.staticGroup();
    this.waterTiles = [];
    for (let row = 0; row < this.mapData.grid.length; row++) {
      for (let col = 0; col < this.mapData.grid[row].length; col++) {
        const tile = this.mapData.grid[row][col];
        const key = this.pickTileVariant(tile, col, row);
        const x = col * TILE_SIZE + TILE_SIZE / 2;
        const y = row * TILE_SIZE + TILE_SIZE / 2;
        if (tile === TileType.WALL) {
          const sprite = this.wallGroup.create(x, y, key);
          sprite.setDepth(0);
          sprite.refreshBody();
        } else {
          const image = this.add.image(x, y, key);
          image.setDepth(0);
          if (tile === TileType.WATER) {
            this.waterTiles.push(image);
          }
        }
      }
    }
    this.startWaterAnimation();
  }

  private pickTileVariant(tile: TileType, col: number, row: number): string {
    if (tile === TileType.GRASS) {
      const idx = seededMod(col * 7 + row * 13 + this.seed, 3);
      return `tile_grass_${idx + 1}`;
    }
    switch (tile) {
      case TileType.WALL: return "tile_wall";
      case TileType.PATH: return "tile_path";
      case TileType.WATER: return "tile_water";
      case TileType.SAND: return "tile_sand";
      case TileType.DARK_GRASS: return "tile_dark_grass";
      case TileType.BRIDGE: return "tile_bridge";
      default: return "tile_grass_1";
    }
  }

  private startWaterAnimation() {
    if (this.waterTiles.length === 0) return;
    this.waterTween = this.tweens.add({
      targets: this.waterTiles,
      y: "+=1",
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  protected renderRoomLabels() {
    this.roomLabels.forEach((l) => l.destroy());
    this.roomLabels = [];

    for (const room of this.mapData.rooms) {
      if (!room.theme) continue;
      const cx = (room.x + room.w / 2) * TILE_SIZE;
      const cy = (room.y + 1) * TILE_SIZE + 4;
      const label = this.add.text(cx, cy, room.theme.toUpperCase(), {
        fontSize: "8px",
        color: "#64748b",
        fontFamily: "Share Tech Mono, monospace",
        backgroundColor: "rgba(15,23,42,0.6)",
        padding: { x: 4, y: 2 },
      }).setOrigin(0.5, 0).setDepth(5);
      this.roomLabels.push(label);
    }
  }

  protected renderDecorations() {
    for (const deco of this.mapData.decorations || []) {
      const x = deco.x * TILE_SIZE + TILE_SIZE / 2;
      const y = deco.y * TILE_SIZE + TILE_SIZE / 2;
      const img = this.add.image(x, y, deco.type);
      if (deco.type === "deco_tree") {
        img.setDepth(y + 0.5);
      } else if (deco.type === "deco_lamp" || deco.type === "deco_sign") {
        img.setDepth(y + 0.3);
      } else {
        img.setDepth(1);
      }
    }
  }

  protected createPlayer(data?: { spawnX?: number; spawnY?: number }) {
    const sx = data?.spawnX ?? this.mapData.playerSpawn.x;
    const sy = data?.spawnY ?? this.mapData.playerSpawn.y;
    this.player = new Player(this, sx, sy);
  }

  protected createInteractables() {
    const defs = INTERACTABLES.filter((d) => d.scene === this.getMapKey());
    const rooms = this.mapData.rooms || [];

    // Store original defs to avoid mutation issues
    const positioned = defs.map((def, i) => {
      const placed = { ...def };
      if (rooms.length > 0 && this.getMapKey() === "hub") {
        const room = rooms[i % rooms.length];
        placed.gridX = room.x + Math.floor(room.w / 2);
        placed.gridY = room.y + Math.floor(room.h / 2);
      }
      return placed;
    });

    for (const def of positioned) {
      const obj = new Interactable(this, def);
      this.interactables.push(obj);
    }
  }

  protected createInteractionHint() {
    this.interactionHint = this.add
      .text(400, 460, "[E] Interact", {
        fontSize: "12px",
        color: "#94a3b8",
        fontFamily: "Share Tech Mono, monospace",
        backgroundColor: "#0f172acc",
        padding: { x: 8, y: 4 },
      })
      .setOrigin(0.5)
      .setDepth(1002)
      .setVisible(false);
  }

  protected setupCamera() {
    const width = this.mapData.grid[0].length * TILE_SIZE;
    const height = this.mapData.grid.length * TILE_SIZE;
    this.physics.world.setBounds(0, 0, width, height);
    this.cameras.main.setBounds(0, 0, width, height);
    this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);
    this.cameras.main.setBackgroundColor("#0f172a");
  }

  protected setupInput() {
    this.eKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  }

  protected setupCollisions() {
    if (this.wallGroup) {
      this.physics.add.collider(this.player.sprite, this.wallGroup);
    }
    for (const obj of this.interactables) {
      this.physics.add.overlap(
        this.player.getBody(),
        obj.zone as any,
        undefined,
        undefined,
        this
      );
    }
  }

  setMovementLocked(locked: boolean) {
    this.movementLocked = locked;
    if (locked) {
      this.player.getBody().setVelocity(0, 0);
    }
  }

  isPlayerNear(obj: Interactable): boolean {
    const dx = this.player.sprite.x - obj.sprite.x;
    const dy = this.player.sprite.y - obj.sprite.y;
    return Math.sqrt(dx * dx + dy * dy) < 50;
  }

  transitionTo(targetScene: string, spawnX: number, spawnY: number) {
    this.setMovementLocked(true);
    this.cameras.main.fadeOut(TRANSITION_DURATION);
    this.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start(targetScene, { spawnX, spawnY, seed: this.seed + 1 });
    });
  }

  update() {
    if (!this.movementLocked) {
      this.player.update();
    }

    this.currentInteractable = null;
    for (const obj of this.interactables) {
      if (this.isPlayerNear(obj)) {
        this.currentInteractable = obj;
        break;
      }
    }

    if (this.currentInteractable) {
      this.interactionHint.setVisible(true);
      for (const obj of this.interactables) {
        obj.showLabel(obj === this.currentInteractable);
      }
    } else {
      this.interactionHint.setVisible(false);
      for (const obj of this.interactables) {
        obj.showLabel(false);
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.eKey) && this.currentInteractable) {
      this.onInteract(this.currentInteractable);
    }

    this.checkExits();
  }

  private checkExits() {
    const gx = Math.round(this.player.sprite.x / TILE_SIZE);
    const gy = Math.round(this.player.sprite.y / TILE_SIZE);

    for (const exit of this.mapData.exits) {
      if (exit.x === gx && exit.y === gy) {
        this.transitionTo(exit.targetScene, exit.targetX, exit.targetY);
        return;
      }
    }
  }

  abstract onInteract(obj: Interactable): void;
}
