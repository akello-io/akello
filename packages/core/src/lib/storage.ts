

export class ClientStorage {
    private readonly storage: Storage

    constructor(storage: Storage) {
        this.storage = storage ?? localStorage
    }

    clear() {
        this.storage.clear()
    }
    
    getString(key: string): string | undefined {
        return this.storage.getItem(key) ?? undefined;
      }
    
      setString(key: string, value: string | undefined): void {
        if (value) {
          this.storage.setItem(key, value);
        } else {
          this.storage.removeItem(key);
        }
      }
    
      getObject<T>(key: string): T | undefined {
        const str = this.getString(key);
        return str ? (JSON.parse(str) as T) : undefined;
      }
    
      setObject<T>(key: string, value: T): void {
        this.setString(key, value ? JSON.stringify(value) : undefined);
      }

}