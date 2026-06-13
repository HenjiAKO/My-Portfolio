type Callback = (data?: any) => void;

class GameEventBus {
  private listeners: Map<string, Callback[]> = new Map();

  on(event: string, cb: Callback) {
    if (!this.listeners.has(event)) this.listeners.set(event, []);
    this.listeners.get(event)!.push(cb);
  }

  off(event: string, cb: Callback) {
    const cbs = this.listeners.get(event);
    if (cbs) this.listeners.set(event, cbs.filter((c) => c !== cb));
  }

  emit(event: string, data?: any) {
    this.listeners.get(event)?.forEach((cb) => cb(data));
  }
}

export const gameBus = new GameEventBus();
