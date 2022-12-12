class Storage {
  #storage: typeof localStorage;

  constructor() {
    this.#storage = localStorage;
  }

  get(key: string): string | null {
    const result = this.#storage.getItem(key);

    try {
      const parsedResult = result ? JSON.parse(result) : null;

      return parsedResult;
    } catch {
      return result;
    }
  }

  set(key: string, value: string | object): void {
    try {
      this.#storage.setItem(key, JSON.stringify(value));
    } catch {
      throw new Error('You have bad key-value pair for storage');
    }
  }
}

export const storage = new Storage();
