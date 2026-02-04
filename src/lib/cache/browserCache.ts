type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

class BrowserCache {
  private memory = new Map<string, CacheEntry<unknown>>();

  private isBrowser() {
    return typeof window !== "undefined";
  }

  get<T>(key: string): T | null {
    const mem = this.memory.get(key);
    if (mem && Date.now() < mem.expiresAt) {
      return mem.value as T;
    }

    if (!this.isBrowser()) return null;

    const raw = localStorage.getItem(key);
    if (!raw) return null;

    try {
      const entry = JSON.parse(raw) as CacheEntry<unknown>;

      if (Date.now() > entry.expiresAt) {
        localStorage.removeItem(key);
        return null;
      }

      this.memory.set(key, entry);
      return entry.value as T;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  }

  set<T>(key: string, value: T, ttlMs: number) {
    const entry: CacheEntry<T> = {
      value,
      expiresAt: Date.now() + ttlMs,
    };

    this.memory.set(key, entry as CacheEntry<unknown>);

    if (this.isBrowser()) {
      localStorage.setItem(key, JSON.stringify(entry));
    }
  }

  invalidate(key: string) {
    this.memory.delete(key);
    if (this.isBrowser()) {
      localStorage.removeItem(key);
    }
  }

  clear() {
    this.memory.clear();
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }
}

export const browserCache = new BrowserCache();
