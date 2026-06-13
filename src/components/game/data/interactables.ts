export interface InteractableDef {
  id: string;
  name: string;
  scene: string;
  gridX: number;
  gridY: number;
  sectionId: string;
}

// Entries are no longer needed — SelectorScene builds interactables inline.
// Keeping the interface for type consistency.
export const INTERACTABLES: InteractableDef[] = [];
