import { SeededRandom } from "./SeededRandom";

export const TILE_SIZE = 32;
export const MAP_COLS = 30;
export const MAP_ROWS = 22;

export enum TileType {
  GRASS = 0,
  WALL = 1,
  PATH = 2,
  WATER = 3,
  SAND = 4,
  BRIDGE = 5,
  DARK_GRASS = 6,
}

export interface Room {
  x: number;
  y: number;
  w: number;
  h: number;
  theme?: string;
}

export interface Decoration {
  x: number;
  y: number;
  type: string;
}

export interface MapData {
  grid: TileType[][];
  playerSpawn: { x: number; y: number };
  exits: { x: number; y: number; targetScene: string; targetX: number; targetY: number }[];
  rooms: Room[];
  decorations: Decoration[];
  seed: number;
}

// ============================================================
// CORE GRID GENERATION
// ============================================================

function generate(cols: number, rows: number, seed: number): { grid: TileType[][]; rooms: Room[] } {
  const rng = new SeededRandom(seed);
  const grid: TileType[][] = [];

  for (let y = 0; y < rows; y++) {
    grid[y] = [];
    for (let x = 0; x < cols; x++) {
      grid[y][x] = TileType.GRASS;
    }
  }

  for (let y = 0; y < rows; y++) {
    grid[y][0] = TileType.WALL;
    grid[y][cols - 1] = TileType.WALL;
  }
  for (let x = 0; x < cols; x++) {
    grid[0][x] = TileType.WALL;
    grid[rows - 1][x] = TileType.WALL;
  }

  const themes = ["about", "skills", "projects", "experience", "education"];
  const rooms: Room[] = [];
  const numRooms = rng.range(3, 6);

  for (let i = 0; i < numRooms; i++) {
    const rw = rng.range(5, 8);
    const rh = rng.range(3, 6);
    const rx = rng.range(2, cols - rw - 2);
    const ry = rng.range(2, rows - rh - 2);

    let overlap = false;
    for (const room of rooms) {
      if (
        rx < room.x + room.w + 2 &&
        rx + rw + 2 > room.x &&
        ry < room.y + room.h + 2 &&
        ry + rh + 2 > room.y
      ) {
        overlap = true;
        break;
      }
    }
    if (overlap) continue;

    for (let y = ry; y < ry + rh; y++) {
      for (let x = rx; x < rx + rw; x++) {
        grid[y][x] = TileType.DARK_GRASS;
      }
    }
    for (let y = ry - 1; y <= ry + rh; y++) {
      for (let x = rx - 1; x <= rx + rw; x++) {
        if (
          y < 0 || y >= rows || x < 0 || x >= cols ||
          (y >= ry && y < ry + rh && x >= rx && x < rx + rw)
        ) continue;
        grid[y][x] = TileType.WALL;
      }
    }

    const doorY = ry + Math.floor(rh / 2);
    const doorX = rx + rw;
    if (doorY >= 0 && doorY < rows && doorX >= 0 && doorX < cols) {
      grid[doorY][doorX] = TileType.PATH;
      if (doorY + 1 < rows && grid[doorY + 1][doorX] === TileType.GRASS) {
        grid[doorY + 1][doorX] = TileType.PATH;
      }
      if (doorY - 1 >= 0 && grid[doorY - 1][doorX] === TileType.GRASS) {
        grid[doorY - 1][doorX] = TileType.PATH;
      }
    }

    const theme = themes[i % themes.length];
    rooms.push({ x: rx, y: ry, w: rw, h: rh, theme });
  }

  for (let i = 1; i < rooms.length; i++) {
    const a = rooms[i - 1];
    const b = rooms[i];
    const ax = a.x + Math.floor(a.w / 2);
    const ay = a.y + Math.floor(a.h / 2);
    const bx = b.x + Math.floor(b.w / 2);
    const by = b.y + Math.floor(b.h / 2);

    let cx = ax;
    while (cx !== bx) {
      if (cx < bx) cx++;
      else cx--;
      if (grid[ay] && cx >= 0 && cx < cols && grid[ay][cx] === TileType.GRASS) {
        grid[ay][cx] = TileType.PATH;
      }
    }
    let cy = ay;
    while (cy !== by) {
      if (cy < by) cy++;
      else cy--;
      if (cy >= 0 && cy < rows && grid[cy] && grid[cy][cx] === TileType.GRASS) {
        grid[cy][cx] = TileType.PATH;
      }
    }
  }

  const numPonds = rng.range(1, 3);
  for (let i = 0; i < numPonds; i++) {
    const px = rng.range(3, cols - 4);
    const py = rng.range(3, rows - 4);
    if (grid[py][px] === TileType.GRASS) {
      grid[py][px] = TileType.WATER;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = px + dx;
          const ny = py + dy;
          if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && grid[ny][nx] === TileType.GRASS) {
            if (rng.chance(60)) grid[ny][nx] = TileType.WATER;
          }
        }
      }
    }
  }

  const numSand = rng.range(2, 4);
  for (let i = 0; i < numSand; i++) {
    const sx = rng.range(2, cols - 3);
    const sy = rng.range(2, rows - 3);
    if (grid[sy][sx] === TileType.GRASS) {
      grid[sy][sx] = TileType.SAND;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = sx + dx;
          const ny = sy + dy;
          if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && grid[ny][nx] === TileType.GRASS) {
            if (rng.chance(50)) grid[ny][nx] = TileType.SAND;
          }
        }
      }
    }
  }

  return { grid, rooms };
}

// ============================================================
// DECORATION PLACEMENT
// ============================================================

function placeDecorations(grid: TileType[][], cols: number, rows: number, rng: SeededRandom): Decoration[] {
  const decos: Decoration[] = [];
  const decoTypes = ["deco_tree", "deco_rock", "deco_flower", "deco_lamp"];

  for (let y = 2; y < rows - 2; y++) {
    for (let x = 2; x < cols - 2; x++) {
      if (grid[y][x] === TileType.GRASS && rng.chance(8)) {
        const type = decoTypes[rng.range(0, decoTypes.length - 1)];
        decos.push({ x, y, type });
      }
      if (grid[y][x] === TileType.DARK_GRASS && rng.chance(5)) {
        const type = rng.chance(50) ? "deco_flower" : "deco_rock";
        decos.push({ x, y, type });
      }
    }
  }

  return decos;
}

// ============================================================
// EXITS
// ============================================================

function addExits(grid: TileType[][], cols: number, rows: number, rng: SeededRandom): { x: number; y: number; targetScene: string; targetX: number; targetY: number }[] {
  const exits: { x: number; y: number; targetScene: string; targetX: number; targetY: number }[] = [];

  const topX = rng.range(8, cols - 8);
  const bottomX = rng.range(8, cols - 8);

  for (let i = 0; i < 2; i++) {
    if (grid[1] && topX + i < cols) grid[1][topX + i] = TileType.PATH;
    if (grid[rows - 2] && bottomX + i < cols) grid[rows - 2][bottomX + i] = TileType.PATH;
  }
  grid[0][topX] = TileType.PATH;
  grid[0][topX + 1] = TileType.PATH;
  grid[rows - 1][bottomX] = TileType.PATH;
  grid[rows - 1][bottomX + 1] = TileType.PATH;

  exits.push({
    x: topX, y: 1, targetScene: "ProjectsArea", targetX: 14, targetY: 20,
  });
  exits.push({
    x: topX + 1, y: 1, targetScene: "ProjectsArea", targetX: 15, targetY: 20,
  });
  exits.push({
    x: bottomX, y: rows - 2, targetScene: "ContactArea", targetX: 14, targetY: 1,
  });
  exits.push({
    x: bottomX + 1, y: rows - 2, targetScene: "ContactArea", targetX: 15, targetY: 1,
  });

  return exits;
}

// ============================================================
// PLAYER SPAWN
// ============================================================

function findOpenTile(grid: TileType[][], cols: number, rows: number, rng: SeededRandom): { x: number; y: number } {
  for (let attempt = 0; attempt < 50; attempt++) {
    const x = rng.range(3, cols - 4);
    const y = rng.range(3, rows - 4);
    if (grid[y][x] === TileType.GRASS) return { x, y };
  }
  return { x: Math.floor(cols / 2), y: Math.floor(rows / 2) };
}

// ============================================================
// PUBLIC MAP GENERATORS
// ============================================================

export function generateMap(key: string, seed?: number): MapData {
  const actualSeed = seed ?? Math.floor(Math.random() * 100000);
  const rng = new SeededRandom(actualSeed);
  const cols = MAP_COLS;
  const rows = MAP_ROWS;

  let { grid, rooms } = generate(cols, rows, actualSeed);

  const spawn = findOpenTile(grid, cols, rows, rng);
  grid[spawn.y][spawn.x] = TileType.PATH;
  grid[spawn.y + 1] && (grid[spawn.y + 1][spawn.x] = TileType.PATH);
  grid[spawn.y][spawn.x + 1] && (grid[spawn.y][spawn.x + 1] = TileType.PATH);

  const exits = addExits(grid, cols, rows, rng);
  const decorations = placeDecorations(grid, cols, rows, rng);

  return { grid, playerSpawn: spawn, exits, rooms, decorations, seed: actualSeed };
}

export function generateSmallMap(key: string, borderTile: TileType, seed?: number): MapData {
  const actualSeed = seed ?? Math.floor(Math.random() * 100000);
  const rng = new SeededRandom(actualSeed);
  const cols = MAP_COLS;
  const rows = MAP_ROWS;

  const { grid: baseGrid } = generate(cols, rows, actualSeed);
  const grid: TileType[][] = [];

  for (let y = 0; y < rows; y++) {
    grid[y] = [];
    for (let x = 0; x < cols; x++) {
      if (x === 0 || x === cols - 1 || y === 0 || y === rows - 1) {
        const isExit =
          (x === 0 || x === cols - 1) && y >= 10 && y <= 12 ||
          (y === 0 || y === rows - 1) && x >= 14 && x <= 16;
        grid[y][x] = isExit ? TileType.PATH : TileType.WALL;
      } else if (baseGrid[y][x] === TileType.WALL && rng.chance(30)) {
        grid[y][x] = TileType.WALL;
      } else {
        grid[y][x] = TileType.GRASS;
      }
    }
  }

  const borderPositions: { x: number; y: number }[] = [];
  for (let y = 1; y < rows - 1; y++) {
    for (let x = 1; x < cols - 1; x++) {
      const isBorder =
        grid[y][x] !== TileType.WALL &&
        (grid[y - 1]?.[x] === TileType.WALL ||
          grid[y + 1]?.[x] === TileType.WALL ||
          grid[y]?.[x - 1] === TileType.WALL ||
          grid[y]?.[x + 1] === TileType.WALL);
      if (isBorder && rng.chance(40)) {
        borderPositions.push({ x, y });
      }
    }
  }

  for (const p of borderPositions) {
    if (grid[p.y][p.x] === TileType.GRASS) {
      grid[p.y][p.x] = borderTile;
    }
  }

  const spawn = key === "ProjectsArea"
    ? { x: 14, y: 19 }
    : { x: 14, y: 1 };

  const exits = key === "ProjectsArea"
    ? [{ x: 14, y: 20, targetScene: "hub", targetX: 14, targetY: 1 },
       { x: 15, y: 20, targetScene: "hub", targetX: 15, targetY: 1 }]
    : [{ x: 14, y: 1, targetScene: "hub", targetX: 14, targetY: 19 },
       { x: 15, y: 1, targetScene: "hub", targetX: 15, targetY: 19 }];

  const decorations = placeDecorations(grid, cols, rows, rng);

  return {
    grid, playerSpawn: spawn, exits, rooms: [], decorations, seed: actualSeed,
  };
}
