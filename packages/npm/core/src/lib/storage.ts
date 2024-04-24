/**
 * Represents a client-side storage utility.
 */
export class ClientStorage {
    private readonly storage: Storage;

    /**
     * Creates a new instance of ClientStorage.
     * @param storage The underlying storage implementation.
     */
    constructor(storage: Storage) {
        this.storage = storage ?? localStorage;
    }

    /**
     * Clears all items from the storage.
     */
    clear(): void {
        this.storage.clear();
    }

    /**
     * Retrieves the string value associated with the specified key.
     * @param key The key of the item to retrieve.
     * @returns The string value associated with the key, or undefined if the key does not exist.
     */
    getString(key: string): string | undefined {
        return this.storage.getItem(key) ?? undefined;
    }

    /**
     * Sets the string value associated with the specified key.
     * @param key The key of the item to set.
     * @param value The string value to set.
     */
    setString(key: string, value: string | undefined): void {
        if (value) {
            this.storage.setItem(key, value);
        } else {
            this.storage.removeItem(key);
        }
    }

    /**
     * Retrieves the object value associated with the specified key.
     * @param key The key of the item to retrieve.
     * @returns The object value associated with the key, or undefined if the key does not exist or the value is not a valid JSON string.
     */
    getObject<T>(key: string): T | undefined {
        const str = this.getString(key);
        return str ? (JSON.parse(str) as T) : undefined;
    }

    /**
     * Sets the object value associated with the specified key.
     * @param key The key of the item to set.
     * @param value The object value to set.
     */
    setObject<T>(key: string, value: T): void {
        this.setString(key, value ? JSON.stringify(value) : undefined);
    }
}