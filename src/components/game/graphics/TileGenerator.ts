import Phaser from "phaser";
import { TILE_SIZE } from "../data/maps";

// ============================================================
// HELPERS
// ============================================================

function createTile(scene: Phaser.Scene, key: string, w: number, h: number): CanvasRenderingContext2D | null {
  if (scene.textures.exists(key)) return null;
  const canvas = scene.textures.createCanvas(key, w, h);
  if (!canvas) return null;
  return canvas.getContext();
}

function commit(ctx: CanvasRenderingContext2D, scene: Phaser.Scene, key: string) {
  const tex = scene.textures.get(key) as Phaser.Textures.CanvasTexture;
  if (tex && tex.refresh) tex.refresh();
}

function rect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

// ============================================================
// TILE TEXTURES
// ============================================================

function drawGrass1(ctx: CanvasRenderingContext2D) {
  rect(ctx, 0, 0, 32, 32, '#4ade80');
  const dots = [[2,3],[8,5],[18,2],[25,7],[4,14],[14,12],[24,15],[7,22],[16,25],[28,20],[3,28],[22,28],[11,9],[20,22],[30,8]];
  for (const [x, y] of dots) { rect(ctx, x, y, 2, 2, '#3cb371'); }
  const hi = [[6,8],[15,6],[22,10],[10,18],[20,20],[5,24],[18,28],[28,24]];
  for (const [x, y] of hi) { rect(ctx, x, y, 2, 2, '#5be08a'); }
}

function drawGrass2(ctx: CanvasRenderingContext2D) {
  rect(ctx, 0, 0, 32, 32, '#45c972');
  const dots = [[3,4],[14,3],[25,6],[7,15],[20,14],[4,26],[16,27],[28,18],[11,21]];
  for (const [x, y] of dots) { rect(ctx, x, y, 2, 2, '#ffffff'); rect(ctx, x+1, y+1, 1, 1, '#fde047'); }
  const dk = [[10,8],[22,5],[5,18],[18,20],[28,12],[12,24],[24,28],[2,14]];
  for (const [x, y] of dk) { rect(ctx, x, y, 2, 2, '#3cb371'); }
}

function drawGrass3(ctx: CanvasRenderingContext2D) {
  rect(ctx, 0, 0, 32, 32, '#4ade80');
  const dirt = [[2,2,5,4],[18,6,4,5],[8,16,6,3],[22,18,5,4],[4,24,3,5],[28,4,3,3]];
  for (const [x, y, w, h] of dirt) { rect(ctx, x, y, w, h, '#8b7355'); }
  const cl = [[10,3],[24,2],[3,12],[16,12],[26,14],[10,22],[28,26],[6,20],[20,8]];
  for (const [x, y] of cl) { rect(ctx, x, y, 3, 3, '#5be08a'); }
}

function drawWall(ctx: CanvasRenderingContext2D) {
  rect(ctx, 0, 0, 32, 32, '#2a3a4a');
  // Brick pattern - row 0
  rect(ctx, 1, 1, 14, 7, '#3b4a5e');
  rect(ctx, 17, 1, 14, 7, '#3b4a5e');
  // Row 1 offset
  rect(ctx, 1, 9, 6, 7, '#3b4a5e');
  rect(ctx, 9, 9, 14, 7, '#3b4a5e');
  rect(ctx, 25, 9, 6, 7, '#3b4a5e');
  // Row 2
  rect(ctx, 1, 17, 14, 7, '#3b4a5e');
  rect(ctx, 17, 17, 14, 7, '#3b4a5e');
  // Row 3 offset
  rect(ctx, 1, 25, 6, 6, '#3b4a5e');
  rect(ctx, 9, 25, 14, 6, '#3b4a5e');
  rect(ctx, 25, 25, 6, 6, '#3b4a5e');
  // Subtle mortar lines
  rect(ctx, 0, 0, 32, 1, '#1e2a3a');
  rect(ctx, 0, 0, 1, 32, '#1e2a3a');
  // Top edge highlight
  rect(ctx, 0, 0, 32, 1, '#4a5a6e');
  rect(ctx, 0, 0, 1, 32, '#4a5a6e');
  // Bottom shadow
  rect(ctx, 0, 31, 32, 1, '#1a2533');
  rect(ctx, 31, 0, 1, 32, '#1a2533');
}

function drawPath(ctx: CanvasRenderingContext2D) {
  rect(ctx, 0, 0, 32, 32, '#c4a06a');
  // Cobblestone shapes
  const stones = [[1,1,10,8],[13,1,8,7],[23,1,8,8],[1,11,9,10],[12,10,8,9],[22,11,9,9],[1,23,8,8],[11,21,10,10],[23,22,8,9]];
  for (const [x, y, w, h] of stones) {
    rect(ctx, x, y, w, h, '#d4b07a');
    rect(ctx, x+1, y+1, w-2, h-2, '#dcc08a');
  }
  // Grout lines
  rect(ctx, 0, 9, 32, 1, '#8b7355');
  rect(ctx, 10, 0, 1, 9, '#8b7355');
  rect(ctx, 21, 0, 1, 8, '#8b7355');
  rect(ctx, 0, 21, 32, 1, '#8b7355');
  rect(ctx, 10, 10, 1, 11, '#8b7355');
  rect(ctx, 21, 9, 1, 3, '#8b7355');
  rect(ctx, 21, 14, 1, 8, '#8b7355');
  // Edge wear
  rect(ctx, 0, 0, 32, 1, '#e6d0a0');
  rect(ctx, 0, 0, 1, 32, '#e6d0a0');
  rect(ctx, 0, 31, 32, 1, '#a08050');
  rect(ctx, 31, 0, 1, 32, '#a08050');
}

function drawWater(ctx: CanvasRenderingContext2D) {
  rect(ctx, 0, 0, 32, 32, '#2563eb');
  // Wave lines
  rect(ctx, 0, 4, 32, 2, '#3b82f6');
  rect(ctx, 0, 8, 28, 2, '#3b82f6');
  rect(ctx, 4, 12, 32, 2, '#3b82f6');
  rect(ctx, 0, 16, 24, 2, '#3b82f6');
  rect(ctx, 8, 20, 32, 2, '#3b82f6');
  rect(ctx, 0, 24, 28, 2, '#3b82f6');
  rect(ctx, 4, 28, 32, 2, '#3b82f6');
  // Light reflections
  rect(ctx, 6, 6, 6, 1, '#60a5fa');
  rect(ctx, 20, 10, 4, 1, '#60a5fa');
  rect(ctx, 10, 14, 8, 1, '#60a5fa');
  rect(ctx, 24, 18, 4, 1, '#60a5fa');
  rect(ctx, 8, 22, 6, 1, '#60a5fa');
  rect(ctx, 22, 26, 4, 1, '#60a5fa');
  rect(ctx, 2, 30, 8, 1, '#60a5fa');
  // Deep spots
  rect(ctx, 14, 3, 3, 3, '#1d4ed8');
  rect(ctx, 24, 14, 3, 3, '#1d4ed8');
  rect(ctx, 6, 18, 3, 3, '#1d4ed8');
  rect(ctx, 18, 26, 3, 3, '#1d4ed8');
}

function drawSand(ctx: CanvasRenderingContext2D) {
  rect(ctx, 0, 0, 32, 32, '#f0b878');
  // Grain noise
  const grains = [[2,3],[7,6],[15,2],[24,5],[3,12],[11,10],[21,14],[28,9],[5,20],[14,18],[23,22],[8,27],[19,28],[27,25],[30,16]];
  for (const [x, y] of grains) { rect(ctx, x, y, 2, 2, '#e0a868'); }
  // Shell specks
  for (const [x, y] of [[4,8],[18,7],[26,14],[10,22],[22,26]]) {
    rect(ctx, x, y, 3, 2, '#fce8c4');
    rect(ctx, x, y, 1, 1, '#ffffff');
  }
  // Border highlight
  rect(ctx, 0, 0, 32, 1, '#f8c888');
  rect(ctx, 0, 0, 1, 32, '#f8c888');
  rect(ctx, 0, 31, 32, 1, '#d09858');
  rect(ctx, 31, 0, 1, 32, '#d09858');
}

function drawDarkGrass(ctx: CanvasRenderingContext2D) {
  rect(ctx, 0, 0, 32, 32, '#2e9a4e');
  const dots = [[3,4],[10,2],[20,6],[28,4],[5,13],[15,11],[25,14],[2,22],[12,24],[22,20],[29,26],[7,29],[17,28],[27,30]];
  for (const [x, y] of dots) { rect(ctx, x, y, 2, 2, '#228b3a'); }
  const hi = [[8,7],[18,4],[26,10],[6,16],[16,18],[28,20],[4,26],[14,28]];
  for (const [x, y] of hi) { rect(ctx, x, y, 2, 2, '#3db85e'); }
  rect(ctx, 0, 0, 2, 32, 'rgba(34,139,58,0.5)');
}

function drawBridge(ctx: CanvasRenderingContext2D) {
  rect(ctx, 0, 0, 32, 32, '#7a4a1a');
  // Wood planks
  for (let i = 0; i < 4; i++) {
    rect(ctx, 0, i * 8, 32, 7, '#8b5e2a');
    rect(ctx, 0, i * 8 + 1, 32, 5, '#9a6e3a');
  }
  // Grain lines
  rect(ctx, 4, 1, 24, 1, '#7a4a1a');
  rect(ctx, 2, 9, 28, 1, '#7a4a1a');
  rect(ctx, 6, 17, 20, 1, '#7a4a1a');
  rect(ctx, 3, 25, 26, 1, '#7a4a1a');
  // Nails
  for (const [x, y] of [[3,3],[27,3],[3,11],[27,11],[3,19],[27,19],[3,27],[27,27]]) {
    rect(ctx, x, y, 3, 3, '#4a3a2a');
    rect(ctx, x+1, y+1, 1, 1, '#6a5a4a');
  }
  // Top highlight
  rect(ctx, 0, 0, 32, 1, '#b07e4a');
  // Side shadow
  rect(ctx, 0, 31, 32, 1, '#5a3a1a');
  rect(ctx, 31, 0, 1, 32, '#5a3a1a');
}

export function generateTileTextures(scene: Phaser.Scene) {
  const tiles: [string, (ctx: CanvasRenderingContext2D) => void][] = [
    ['tile_grass_1', drawGrass1],
    ['tile_grass_2', drawGrass2],
    ['tile_grass_3', drawGrass3],
    ['tile_wall', drawWall],
    ['tile_path', drawPath],
    ['tile_water', drawWater],
    ['tile_sand', drawSand],
    ['tile_dark_grass', drawDarkGrass],
    ['tile_bridge', drawBridge],
  ];
  for (const [key, draw] of tiles) {
    const ctx = createTile(scene, key, TILE_SIZE, TILE_SIZE);
    if (ctx) { draw(ctx); commit(ctx, scene, key); }
  }
}

// ============================================================
// PLAYER SPRITESHEET (128x128 = 4 rows x 4 cols of 32x32)
// ============================================================

function drawBaseChar(ctx: CanvasRenderingContext2D, ox: number, oy: number) {
  // Hair
  rect(ctx, ox+9, oy, 14, 5, '#5c3a1e');
  rect(ctx, ox+8, oy+1, 16, 4, '#5c3a1e');
  rect(ctx, ox+10, oy+3, 8, 3, '#6b4a2e');
  // Head
  rect(ctx, ox+10, oy+4, 12, 7, '#f5d6b8');
  rect(ctx, ox+11, oy+4, 10, 7, '#f5d6b8');
  // Eyes (front facing)
  rect(ctx, ox+12, oy+7, 2, 2, '#1a1a2e');
  rect(ctx, ox+18, oy+7, 2, 2, '#1a1a2e');
  // Cheeks
  rect(ctx, ox+10, oy+9, 2, 2, '#f0c8a0');
  rect(ctx, ox+20, oy+9, 2, 2, '#f0c8a0');
  // Body/shirt
  rect(ctx, ox+9, oy+11, 14, 9, '#3b82f6');
  rect(ctx, ox+8, oy+12, 16, 8, '#3b82f6');
  rect(ctx, ox+10, oy+11, 12, 9, '#4a90f7');
  // Shirt detail - collar
  rect(ctx, ox+12, oy+11, 8, 2, '#2a70e0');
  // Arms
  rect(ctx, ox+6, oy+12, 4, 8, '#f5d6b8');
  rect(ctx, ox+22, oy+12, 4, 8, '#f5d6b8');
  // Hands
  rect(ctx, ox+6, oy+19, 4, 3, '#f0c8a0');
  rect(ctx, ox+22, oy+19, 4, 3, '#f0c8a0');

  // For left/right facing, we mirror differently
}

function drawLegs(ctx: CanvasRenderingContext2D, ox: number, oy: number, offset: number) {
  // Pants
  rect(ctx, ox+10+offset, oy, 5, 7, '#1e3a5f');
  rect(ctx, ox+17, oy, 5, 7, '#1e3a5f');
  // Shoes
  rect(ctx, ox+9+offset, oy+7, 7, 3, '#4a3a2a');
  rect(ctx, ox+16, oy+7, 7, 3, '#4a3a2a');
}

function drawLegsUp(ctx: CanvasRenderingContext2D, ox: number, oy: number, offset: number) {
  rect(ctx, ox+10+offset, oy, 5, 7, '#1e3a5f');
  rect(ctx, ox+17, oy, 5, 7, '#1e3a5f');
  rect(ctx, ox+9+offset, oy+7, 7, 3, '#3a2a1a');
  rect(ctx, ox+16, oy+7, 7, 3, '#3a2a1a');
}

function drawPlayerDown(ctx: CanvasRenderingContext2D, ox: number, oy: number, frame: number) {
  drawBaseChar(ctx, ox, oy);
  // Shirt bottom
  rect(ctx, ox+9, oy+20, 14, 3, '#3b82f6');
  // Legs alternate
  const offset = frame === 1 ? 2 : frame === 3 ? -2 : 0;
  drawLegs(ctx, ox, oy+22, offset);
  // Shadow
  rect(ctx, ox+8, oy+30, 16, 2, 'rgba(0,0,0,0.2)');
}

function drawPlayerUp(ctx: CanvasRenderingContext2D, ox: number, oy: number, frame: number) {
  // Back of hair (no face)
  rect(ctx, ox+8, oy, 16, 6, '#5c3a1e');
  rect(ctx, ox+9, oy+1, 14, 6, '#4a2a18');
  rect(ctx, ox+10, oy+5, 12, 4, '#5c3a1e');
  // Body
  rect(ctx, ox+9, oy+10, 14, 10, '#3b82f6');
  rect(ctx, ox+10, oy+10, 12, 9, '#4a90f7');
  // Arms
  rect(ctx, ox+6, oy+11, 4, 9, '#f5d6b8');
  rect(ctx, ox+22, oy+11, 4, 9, '#f5d6b8');
  // Legs
  const offset = frame === 1 ? 2 : frame === 3 ? -2 : 0;
  drawLegsUp(ctx, ox, oy+21, offset);
  // Shadow
  rect(ctx, ox+8, oy+30, 16, 2, 'rgba(0,0,0,0.2)');
}

function drawPlayerSide(ctx: CanvasRenderingContext2D, ox: number, oy: number, frame: number, facingRight: boolean) {
  const dir = facingRight ? 1 : -1;
  // Hair - side profile
  rect(ctx, ox+8, oy+1, 16, 5, '#5c3a1e');
  // Head profile
  rect(ctx, ox+10, oy+5, 8, 7, '#f5d6b8');
  rect(ctx, ox+11, oy+5, 7, 7, '#f5d6b8');
  // Eye
  if (facingRight) {
    rect(ctx, ox+15, oy+8, 2, 2, '#1a1a2e');
  } else {
    rect(ctx, ox+11, oy+8, 2, 2, '#1a1a2e');
  }
  // Body - side
  rect(ctx, ox+10, oy+12, 12, 9, '#3b82f6');
  rect(ctx, ox+11, oy+12, 10, 9, '#4a90f7');
  // Arms - one visible forward
  if (facingRight) {
    rect(ctx, ox+20, oy+13, 4, 8, '#f5d6b8');
    rect(ctx, ox+8, oy+15, 3, 5, '#f5d6b8');
  } else {
    rect(ctx, ox+8, oy+13, 4, 8, '#f5d6b8');
    rect(ctx, ox+21, oy+15, 3, 5, '#f5d6b8');
  }
  // Legs - walking
  const offset = frame === 1 ? 2 : frame === 3 ? -2 : 0;
  rect(ctx, ox+11+offset, oy+21, 5, 7, '#1e3a5f');
  rect(ctx, ox+16, oy+21, 5, 7, '#1e3a5f');
  // Shoes
  rect(ctx, ox+10+offset, oy+28, 7, 3, '#4a3a2a');
  rect(ctx, ox+15, oy+28, 7, 3, '#4a3a2a');
  // Shadow
  rect(ctx, ox+8, oy+30, 16, 2, 'rgba(0,0,0,0.2)');
}

export function generatePlayerTextures(scene: Phaser.Scene) {
  if (scene.textures.exists('player_sheet')) return;

  const canvas = scene.textures.createCanvas('player_sheet', 128, 128);
  if (!canvas) return;
  const ctx = canvas.getContext();

  // Row 0: Walk Down (4 frames)
  for (let f = 0; f < 4; f++) drawPlayerDown(ctx, f * 32, 0, f);
  // Row 1: Walk Left (4 frames)
  for (let f = 0; f < 4; f++) drawPlayerSide(ctx, f * 32, 32, f, false);
  // Row 2: Walk Right (4 frames)
  for (let f = 0; f < 4; f++) drawPlayerSide(ctx, f * 32, 64, f, true);
  // Row 3: Walk Up (4 frames)
  for (let f = 0; f < 4; f++) drawPlayerUp(ctx, f * 32, 96, f);

  canvas.refresh();

  // Add named frames
  const dirs = ['down', 'left', 'right', 'up'];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      canvas.add(`${dirs[row]}_${col}`, 0, col * 32, row * 32, 32, 32);
    }
  }

  // Create animations
  const frameRate = 7;
  for (const dir of dirs) {
    scene.anims.create({
      key: `walk_${dir}`,
      frames: Array.from({ length: 4 }, (_, i) => ({ key: 'player_sheet', frame: `${dir}_${i}` })),
      frameRate,
      repeat: -1,
    });
  }
}

// Shadow texture
export function generateShadowTexture(scene: Phaser.Scene) {
  if (scene.textures.exists('shadow')) return;
  const ctx = createTile(scene, 'shadow', 20, 6);
  if (!ctx) return;
  rect(ctx, 2, 0, 16, 6, 'rgba(0,0,0,0.25)');
  rect(ctx, 4, 1, 12, 4, 'rgba(0,0,0,0.20)');
  rect(ctx, 6, 2, 8, 2, 'rgba(0,0,0,0.15)');
  commit(ctx, scene, 'shadow');
}

// ============================================================
// INTERACTABLE OBJECTS
// ============================================================

function drawMonitor(ctx: CanvasRenderingContext2D) {
  rect(ctx, 0, 0, 32, 32, 'rgba(0,0,0,0)');
  // Stand
  rect(ctx, 12, 20, 8, 8, '#475569');
  rect(ctx, 14, 24, 4, 6, '#334155');
  // Screen
  rect(ctx, 4, 3, 24, 18, '#1e293b');
  rect(ctx, 5, 4, 22, 16, '#0f172a');
  // Display content
  rect(ctx, 7, 6, 18, 12, '#1a2a4a');
  rect(ctx, 8, 8, 6, 2, '#3b82f6');
  rect(ctx, 16, 8, 8, 2, '#3b82f6');
  rect(ctx, 8, 11, 14, 2, '#60a5fa');
  rect(ctx, 8, 14, 10, 2, '#93c5fd');
  // Glow
  rect(ctx, 6, 5, 2, 16, 'rgba(59,130,246,0.15)');
  rect(ctx, 24, 5, 2, 16, 'rgba(59,130,246,0.15)');
}

function drawScroll(ctx: CanvasRenderingContext2D) {
  rect(ctx, 0, 0, 32, 32, 'rgba(0,0,0,0)');
  // Scroll body
  rect(ctx, 8, 5, 16, 22, '#f5e6c8');
  rect(ctx, 9, 6, 14, 20, '#faf0dc');
  // Text lines
  rect(ctx, 11, 8, 10, 2, '#8b7355');
  rect(ctx, 11, 12, 10, 2, '#8b7355');
  rect(ctx, 11, 16, 6, 2, '#8b7355');
  // Rollers
  rect(ctx, 6, 4, 20, 3, '#d4a574');
  rect(ctx, 6, 25, 20, 3, '#d4a574');
  rect(ctx, 8, 3, 16, 2, '#c49a6a');
  rect(ctx, 8, 27, 16, 2, '#c49a6a');
  // Highlight
  rect(ctx, 10, 5, 12, 1, '#fff5e0');
}

function drawEnvelope(ctx: CanvasRenderingContext2D) {
  rect(ctx, 0, 0, 32, 32, 'rgba(0,0,0,0)');
  // Body
  rect(ctx, 4, 8, 24, 18, '#f59e0b');
  rect(ctx, 5, 9, 22, 16, '#fbbf24');
  // Flap
  rect(ctx, 8, 12, 16, 10, '#f59e0b');
  rect(ctx, 9, 13, 14, 8, '#fbbf24');
  // Triangle on flap
  rect(ctx, 12, 14, 8, 6, '#f59e0b');
  rect(ctx, 13, 15, 6, 4, '#fcd34d');
  // Address lines
  rect(ctx, 10, 14, 12, 2, '#e08500');
  rect(ctx, 12, 17, 8, 2, '#e08500');
  // Highlight
  rect(ctx, 6, 9, 20, 1, '#fde68a');
}

function drawStar(ctx: CanvasRenderingContext2D) {
  rect(ctx, 0, 0, 32, 32, 'rgba(0,0,0,0)');
  // Star shape using rectangles
  rect(ctx, 12, 2, 8, 6, '#ec4899');
  rect(ctx, 10, 4, 12, 8, '#ec4899');
  rect(ctx, 8, 8, 16, 8, '#ec4899');
  rect(ctx, 10, 10, 12, 12, '#ec4899');
  rect(ctx, 12, 12, 8, 14, '#ec4899');
  // Inner highlight
  rect(ctx, 13, 4, 6, 4, '#f472b6');
  rect(ctx, 11, 6, 10, 6, '#f472b6');
  rect(ctx, 9, 10, 14, 6, '#f472b6');
  rect(ctx, 11, 12, 10, 8, '#f472b6');
  rect(ctx, 13, 14, 6, 10, '#f472b6');
  // Center dot
  rect(ctx, 14, 10, 4, 4, '#ffffff');
}

function drawBriefcase(ctx: CanvasRenderingContext2D) {
  rect(ctx, 0, 0, 32, 32, 'rgba(0,0,0,0)');
  // Handle
  rect(ctx, 12, 5, 8, 3, '#f97316');
  rect(ctx, 13, 4, 6, 2, '#fb923c');
  // Body
  rect(ctx, 4, 8, 24, 20, '#f97316');
  rect(ctx, 5, 9, 22, 18, '#fb923c');
  // Center line
  rect(ctx, 14, 9, 4, 18, '#ea580c');
  // Buckle
  rect(ctx, 12, 12, 8, 4, '#fbbf24');
  rect(ctx, 13, 13, 6, 2, '#fcd34d');
  // Rivets
  rect(ctx, 6, 10, 2, 2, '#fbbf24');
  rect(ctx, 24, 10, 2, 2, '#fbbf24');
  // Highlight
  rect(ctx, 6, 9, 22, 1, '#fdba74');
}

function drawGraduation(ctx: CanvasRenderingContext2D) {
  rect(ctx, 0, 0, 32, 32, 'rgba(0,0,0,0)');
  // Cap top
  rect(ctx, 6, 6, 20, 12, '#06b6d4');
  rect(ctx, 7, 7, 18, 10, '#22d3ee');
  // Cap flat top
  rect(ctx, 8, 6, 16, 3, '#06b6d4');
  rect(ctx, 9, 6, 14, 2, '#22d3ee');
  // Tassel
  rect(ctx, 24, 8, 2, 8, '#f59e0b');
  rect(ctx, 25, 14, 4, 2, '#f59e0b');
  // Cap underside shadow
  rect(ctx, 8, 15, 16, 3, '#0891b2');
  // Base of cap
  rect(ctx, 10, 18, 12, 8, '#06b6d4');
  rect(ctx, 11, 19, 10, 6, '#22d3ee');
  // Highlight
  rect(ctx, 10, 6, 2, 12, 'rgba(255,255,255,0.2)');
}

export function generateInteractableTextures(scene: Phaser.Scene) {
  const items: [string, (ctx: CanvasRenderingContext2D) => void][] = [
    ['obj_info', drawMonitor],
    ['obj_project', drawScroll],
    ['obj_mail', drawEnvelope],
    ['obj_skill', drawStar],
    ['obj_briefcase', drawBriefcase],
    ['obj_graduation', drawGraduation],
  ];
  for (const [key, draw] of items) {
    const ctx = createTile(scene, key, TILE_SIZE, TILE_SIZE);
    if (ctx) { draw(ctx); commit(ctx, scene, key); }
  }
}

// ============================================================
// DECORATIVE OBJECTS
// ============================================================

function drawTree(ctx: CanvasRenderingContext2D) {
  // Trunk
  rect(ctx, 13, 18, 6, 14, '#6b4a2e');
  rect(ctx, 14, 20, 4, 12, '#7a5a3e');
  // Canopy
  rect(ctx, 6, 2, 20, 18, '#228b3a');
  rect(ctx, 4, 4, 24, 16, '#2d9a4a');
  rect(ctx, 8, 2, 16, 16, '#3db85e');
  rect(ctx, 6, 6, 20, 14, '#2d9a4a');
  // Canopy highlights
  rect(ctx, 8, 4, 8, 6, '#4ade80');
  rect(ctx, 16, 8, 8, 4, '#4ade80');
  rect(ctx, 6, 12, 6, 4, '#4ade80');
  rect(ctx, 20, 14, 6, 4, '#4ade80');
  // Shadow under canopy
  rect(ctx, 8, 18, 16, 2, 'rgba(0,0,0,0.15)');
  // Dark spots
  rect(ctx, 10, 6, 4, 4, '#1a7a3a');
  rect(ctx, 20, 10, 4, 4, '#1a7a3a');
  rect(ctx, 8, 14, 4, 3, '#1a7a3a');
}

function drawRock(ctx: CanvasRenderingContext2D) {
  rect(ctx, 0, 0, 32, 32, 'rgba(0,0,0,0)');
  rect(ctx, 6, 14, 20, 14, '#6b7280');
  rect(ctx, 4, 16, 24, 12, '#7a8388');
  rect(ctx, 8, 12, 16, 18, '#6b7280');
  rect(ctx, 6, 14, 20, 14, '#7a8388');
  // Highlights
  rect(ctx, 8, 14, 8, 4, '#9ca3af');
  rect(ctx, 18, 16, 6, 3, '#9ca3af');
  rect(ctx, 6, 14, 4, 2, '#b0b8c0');
  // Shadow
  rect(ctx, 8, 26, 18, 4, '#4b5563');
  rect(ctx, 4, 26, 6, 2, '#4b5563');
  // Cracks
  rect(ctx, 14, 18, 2, 6, '#4b5563');
  rect(ctx, 20, 22, 2, 4, '#4b5563');
}

function drawFlower(ctx: CanvasRenderingContext2D) {
  rect(ctx, 0, 0, 32, 32, 'rgba(0,0,0,0)');
  // Stem
  rect(ctx, 14, 14, 4, 16, '#22c55e');
  rect(ctx, 15, 16, 2, 14, '#16a34a');
  // Leaves
  rect(ctx, 10, 18, 6, 3, '#22c55e');
  rect(ctx, 16, 22, 6, 3, '#22c55e');
  // Petals
  rect(ctx, 10, 4, 12, 12, '#ec4899');
  rect(ctx, 8, 6, 16, 8, '#ec4899');
  rect(ctx, 12, 2, 8, 12, '#f472b6');
  rect(ctx, 10, 4, 12, 10, '#f472b6');
  // Center
  rect(ctx, 13, 6, 6, 6, '#fde047');
  rect(ctx, 14, 7, 4, 4, '#fef08a');
  // Highlight
  rect(ctx, 11, 5, 3, 3, '#fbcfe8');
}

function drawSign(ctx: CanvasRenderingContext2D) {
  rect(ctx, 0, 0, 32, 32, 'rgba(0,0,0,0)');
  // Post
  rect(ctx, 14, 14, 4, 18, '#6b4a2e');
  rect(ctx, 15, 16, 2, 16, '#7a5a3e');
  // Sign board
  rect(ctx, 4, 2, 24, 14, '#d4a574');
  rect(ctx, 5, 3, 22, 12, '#e0b888');
  // Board border
  rect(ctx, 4, 2, 24, 1, '#c49a6a');
  rect(ctx, 4, 2, 1, 14, '#c49a6a');
  rect(ctx, 4, 15, 24, 1, '#a08050');
  rect(ctx, 27, 2, 1, 14, '#a08050');
  // Arrow icon
  rect(ctx, 10, 6, 12, 6, '#3b82f6');
  rect(ctx, 14, 5, 4, 8, '#3b82f6');
  rect(ctx, 12, 7, 8, 4, '#60a5fa');
  // Nails
  rect(ctx, 6, 4, 2, 2, '#4a3a2a');
  rect(ctx, 24, 4, 2, 2, '#4a3a2a');
  rect(ctx, 6, 12, 2, 2, '#4a3a2a');
  rect(ctx, 24, 12, 2, 2, '#4a3a2a');
}

function drawLamp(ctx: CanvasRenderingContext2D) {
  rect(ctx, 0, 0, 32, 32, 'rgba(0,0,0,0)');
  // Pole
  rect(ctx, 14, 14, 4, 18, '#475569');
  rect(ctx, 15, 16, 2, 16, '#5a6a7e');
  // Lamp base
  rect(ctx, 12, 28, 8, 4, '#334155');
  rect(ctx, 10, 30, 12, 2, '#475569');
  // Lamp head
  rect(ctx, 10, 2, 12, 10, '#1e293b');
  rect(ctx, 11, 3, 10, 8, '#334155');
  // Glass
  rect(ctx, 12, 4, 8, 6, '#fef08a');
  rect(ctx, 13, 5, 6, 4, '#fef9c3');
  // Glow
  rect(ctx, 11, 5, 10, 4, 'rgba(254,240,138,0.3)');
  // Top cap
  rect(ctx, 12, 2, 8, 2, '#1e293b');
  rect(ctx, 13, 1, 6, 2, '#334155');
  // Light cone (subtle)
  rect(ctx, 10, 10, 12, 4, 'rgba(254,240,138,0.1)');
}

export function generateDecoTextures(scene: Phaser.Scene) {
  const decos: [string, (ctx: CanvasRenderingContext2D) => void][] = [
    ['deco_tree', drawTree],
    ['deco_rock', drawRock],
    ['deco_flower', drawFlower],
    ['deco_sign', drawSign],
    ['deco_lamp', drawLamp],
  ];
  for (const [key, draw] of decos) {
    const ctx = createTile(scene, key, TILE_SIZE, TILE_SIZE);
    if (ctx) { draw(ctx); commit(ctx, scene, key); }
  }
}
