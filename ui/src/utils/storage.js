const storage = localStorage;

/**
 * Add item/s to the storage
 *
 * @param {string} key
 * @param {string} item
 */
export function setItem(key, item) {
    return storage.setItem(key, item);
}

/**
 * Retrives item/s from the storage using provided key
 *
 * @param {string} key
 */
export function getItem(key) {
    return storage.getItem(key);
}

/**
 * Removes item/s from the storage using provided key
 *
 * @param {string} key
 * @param {string} item
 */
export function removeItem(key) {
    return storage.removeItem(key);
}

export function clear() {
    return storage.clear();
}

export default storage;