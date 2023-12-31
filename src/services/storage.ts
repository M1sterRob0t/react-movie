export default class AppStorage<T> {
  private _storeKey: string;
  private _storage: Storage;

  constructor(key: string, storage: Storage) {
    this._storeKey = key;
    this._storage = storage;
  }

  getItems(): T[] {
    const items = this._storage.getItem(this._storeKey);

    if (items) return JSON.parse(items);
    else return [];
  }

  setItems(items: T[]): void {
    this._storage.setItem(this._storeKey, JSON.stringify(items));
  }

  removeItems(): void {
    this._storage.clear();
  }
}
