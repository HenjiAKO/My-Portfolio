import Phaser from "phaser";
import { BaseScene } from "./BaseScene";
import { Interactable } from "../objects/Interactable";
import { gameBus } from "../GameEventBus";
import { TILE_SIZE, TileType, MapData, Decoration } from "../data/maps";
import { INTERACTABLES, InteractableDef } from "../data/interactables";

const COLS = 30;
const ROWS = 22;

// Booth positions (gridX, gridY, sectionId)
const BOOTHS: { x: number; y: number; sectionId: string }[] = [
  { x: 8, y: 5, sectionId: "about" },
  { x: 15, y: 5, sectionId: "skills" },
  { x: 22, y: 5, sectionId: "projects" },
  { x: 8, y: 15, sectionId: "experience" },
  { x: 15, y: 15, sectionId: "education" },
  { x: 22, y: 15, sectionId: "contact" },
];

function buildSelectorMapData(): MapData {
  const grid: TileType[][] = [];
  for (let y = 0; y < ROWS; y++) {
    grid[y] = [];
    for (let x = 0; x < COLS; x++) {
      if (x === 0 || x === COLS - 1 || y === 0 || y === ROWS - 1) {
        grid[y][x] = TileType.WALL;
      } else {
        grid[y][x] = TileType.GRASS;
      }
    }
  }

  // Place booth platforms (3x3 dark grass patches)
  for (const booth of BOOTHS) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const bx = booth.x + dx;
        const by = booth.y + dy;
        if (by > 0 && by < ROWS - 1 && bx > 0 && bx < COLS - 1) {
          grid[by][bx] = TileType.DARK_GRASS;
        }
      }
    }
  }

  // Decorations around edges
  const decorations: Decoration[] = [
    { x: 4, y: 3, type: "deco_lamp" },
    { x: 26, y: 3, type: "deco_lamp" },
    { x: 4, y: 19, type: "deco_lamp" },
    { x: 26, y: 19, type: "deco_lamp" },
    { x: 2, y: 10, type: "deco_tree" },
    { x: 28, y: 10, type: "deco_tree" },
    { x: 12, y: 3, type: "deco_flower" },
    { x: 18, y: 3, type: "deco_flower" },
    { x: 12, y: 19, type: "deco_flower" },
    { x: 18, y: 19, type: "deco_flower" },
    { x: 7, y: 10, type: "deco_rock" },
    { x: 23, y: 10, type: "deco_rock" },
  ];

  return {
    grid,
    playerSpawn: { x: 15, y: 11 },
    exits: [],
    rooms: [],
    decorations,
    seed: 0,
  };
}

export class SelectorScene extends BaseScene {
  constructor() {
    super("selector");
  }

  getMapKey(): string {
    return "selector";
  }

  create(data?: { spawnX?: number; spawnY?: number; seed?: number }) {
    // Seed handling (same pattern as BaseScene)
    if (data?.seed !== undefined) {
      this.registry.set("sessionSeed", data.seed);
    }
    let sessionSeed = this.registry.get("sessionSeed") as number | undefined;
    if (sessionSeed === undefined) {
      sessionSeed = Math.floor(Math.random() * 100000);
      this.registry.set("sessionSeed", sessionSeed);
    }
    this.seed = sessionSeed;

    this.mapData = buildSelectorMapData();

    this.generateTextures();
    this.renderTilemap();
    this.renderDecorations();
    this.createPlayer(data);
    this.createInteractables();
    this.createInteractionHint();
    this.setupCamera();
    this.setupInput();
    this.setupCollisions();
    this.cameras.main.fadeIn(400);

    if (!this.scene.isActive("HUD")) {
      this.scene.launch("HUD");
    }
  }

  protected createInteractables() {
    const sectionName: Record<string, string> = {
      about: "About Me",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      education: "Education",
      contact: "Contact",
    };

    for (const booth of BOOTHS) {
      const def: InteractableDef = {
        id: `sel_${booth.sectionId}`,
        name: sectionName[booth.sectionId] || booth.sectionId,
        scene: "selector",
        gridX: booth.x,
        gridY: booth.y,
        sectionId: booth.sectionId,
      };
      const obj = new Interactable(this, def);
      this.interactables.push(obj);
    }
  }

  onInteract(obj: Interactable) {
    gameBus.emit("open-section", obj.def.sectionId);
  }
}
