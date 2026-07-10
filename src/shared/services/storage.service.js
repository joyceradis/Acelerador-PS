export class StorageService {
  constructor(storage = window.localStorage) {
    this.storage = storage;
  }

  getItem(key, fallback = null) {
    const value = this.storage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  }

  setItem(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  removeItem(key) {
    this.storage.removeItem(key);
  }
}

export const storageService = new StorageService();
