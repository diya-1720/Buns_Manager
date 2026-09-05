/**
 * BUNS MANAGER — Storage & Backup Manager
 * Handles local persistence, AES-GCM vault encryption, and export/import
 * Clean slate with multi-key migration resilience.
 */

import { CryptoEngine } from './crypto.js';

const STORAGE_KEYS = {
  VAULT_ITEMS: 'buns_manager_items',
  VAULT_META: 'buns_manager_meta',
  // Legacy migration keys
  LEGACY_ITEMS_1: 'buns_vault_items',
  LEGACY_ITEMS_2: 'papier_vault_items',
  LEGACY_META_1: 'buns_vault_meta',
  LEGACY_META_2: 'papier_vault_meta'
};

export class VaultStorage {
  constructor() {
    this.masterKey = null;
    this.inMemoryCache = null;
    this.migrateLegacyStorage();
  }

  /**
   * Migrate any existing data under previous keys if present
   */
  migrateLegacyStorage() {
    try {
      if (!localStorage.getItem(STORAGE_KEYS.VAULT_ITEMS)) {
        const prev = localStorage.getItem(STORAGE_KEYS.LEGACY_ITEMS_1) || localStorage.getItem(STORAGE_KEYS.LEGACY_ITEMS_2);
        if (prev) localStorage.setItem(STORAGE_KEYS.VAULT_ITEMS, prev);
      }
      if (!localStorage.getItem(STORAGE_KEYS.VAULT_META)) {
        const prevMeta = localStorage.getItem(STORAGE_KEYS.LEGACY_META_1) || localStorage.getItem(STORAGE_KEYS.LEGACY_META_2);
        if (prevMeta) localStorage.setItem(STORAGE_KEYS.VAULT_META, prevMeta);
      }
    } catch (e) {
      console.warn('Storage migration note:', e);
    }
  }

  /**
   * Check if a Master Password has been configured
   */
  hasMasterPassword() {
    const meta = localStorage.getItem(STORAGE_KEYS.VAULT_META);
    return !!meta;
  }

  /**
   * Configure a new Master Password
   */
  async setMasterPassword(password) {
    const salt = CryptoEngine.bufferToHex(CryptoEngine.getRandomBytes(16));
    const verifyHash = await CryptoEngine.hashString(password, salt);

    const meta = {
      salt,
      verifyHash,
      createdAt: Date.now()
    };

    localStorage.setItem(STORAGE_KEYS.VAULT_META, JSON.stringify(meta));
    this.masterKey = password;

    const currentItems = await this.getItems();
    await this.saveItems(currentItems);
  }

  /**
   * Verify and unlock the vault using the Master Password
   */
  async unlock(password) {
    const metaRaw = localStorage.getItem(STORAGE_KEYS.VAULT_META);
    if (!metaRaw) {
      this.masterKey = password;
      return true;
    }

    const meta = JSON.parse(metaRaw);
    const candidateHash = await CryptoEngine.hashString(password, meta.salt);

    if (candidateHash !== meta.verifyHash) {
      throw new Error('Incorrect Master Password');
    }

    this.masterKey = password;
    return true;
  }

  /**
   * Lock the vault and flush sensitive keys from memory
   */
  lock() {
    this.masterKey = null;
    this.inMemoryCache = null;
  }

  /**
   * Check if vault is currently unlocked in memory
   */
  isUnlocked() {
    if (!this.hasMasterPassword()) return true;
    return this.masterKey !== null;
  }

  /**
   * Retrieve all vault items
   */
  async getItems() {
    if (this.inMemoryCache) {
      return this.inMemoryCache;
    }

    const rawData = localStorage.getItem(STORAGE_KEYS.VAULT_ITEMS);

    if (!rawData) {
      this.inMemoryCache = [];
      return this.inMemoryCache;
    }

    if (this.hasMasterPassword()) {
      if (!this.masterKey) {
        throw new Error('Vault is locked');
      }
      try {
        const decryptedJson = await CryptoEngine.decrypt(rawData, this.masterKey);
        this.inMemoryCache = JSON.parse(decryptedJson);
        return this.inMemoryCache;
      } catch (err) {
        throw new Error('Failed to decrypt vault: ' + err.message);
      }
    } else {
      try {
        this.inMemoryCache = JSON.parse(rawData);
        return Array.isArray(this.inMemoryCache) ? this.inMemoryCache : [];
      } catch {
        this.inMemoryCache = [];
        return this.inMemoryCache;
      }
    }
  }

  /**
   * Save vault items to local storage
   */
  async saveItems(items) {
    this.inMemoryCache = items;

    if (this.hasMasterPassword()) {
      if (!this.masterKey) {
        throw new Error('Cannot save to locked vault');
      }
      const encrypted = await CryptoEngine.encrypt(JSON.stringify(items), this.masterKey);
      localStorage.setItem(STORAGE_KEYS.VAULT_ITEMS, encrypted);
    } else {
      localStorage.setItem(STORAGE_KEYS.VAULT_ITEMS, JSON.stringify(items));
    }
  }

  /**
   * Add a new item to the vault
   */
  async addItem(item) {
    const items = await this.getItems();
    const newItem = {
      ...item,
      id: 'acc_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    items.unshift(newItem);
    await this.saveItems(items);
    return newItem;
  }

  /**
   * Update an existing vault item
   */
  async updateItem(id, updates) {
    const items = await this.getItems();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) throw new Error('Account item not found');

    items[index] = {
      ...items[index],
      ...updates,
      updatedAt: Date.now()
    };

    await this.saveItems(items);
    return items[index];
  }

  /**
   * Delete an item from the vault
   */
  async deleteItem(id) {
    const items = await this.getItems();
    const filtered = items.filter(item => item.id !== id);
    await this.saveItems(filtered);
    return filtered;
  }

  /**
   * Toggle pinned status
   */
  async togglePin(id) {
    const items = await this.getItems();
    const item = items.find(i => i.id === id);
    if (item) {
      item.pinned = !item.pinned;
      await this.saveItems(items);
    }
    return items;
  }

  /**
   * Clear all items (start fresh)
   */
  async clearAll() {
    this.inMemoryCache = [];
    localStorage.removeItem(STORAGE_KEYS.VAULT_ITEMS);
    localStorage.removeItem(STORAGE_KEYS.LEGACY_ITEMS_1);
    localStorage.removeItem(STORAGE_KEYS.LEGACY_ITEMS_2);
  }

  /**
   * Export vault as formatted JSON backup
   */
  async exportJSON(encrypted = false) {
    if (encrypted && this.hasMasterPassword()) {
      const rawEncrypted = localStorage.getItem(STORAGE_KEYS.VAULT_ITEMS);
      const meta = localStorage.getItem(STORAGE_KEYS.VAULT_META);
      return JSON.stringify({
        type: 'BUNS_MANAGER_ENCRYPTED_BACKUP',
        version: '3.0',
        exportedAt: new Date().toISOString(),
        meta: JSON.parse(meta),
        payload: rawEncrypted
      }, null, 2);
    } else {
      const items = await this.getItems();
      return JSON.stringify({
        type: 'BUNS_MANAGER_PLAIN_BACKUP',
        version: '3.0',
        exportedAt: new Date().toISOString(),
        items
      }, null, 2);
    }
  }

  /**
   * Export vault as readable CSV
   */
  async exportCSV() {
    const items = await this.getItems();
    const headers = ['Service', 'Account Label', 'Username / Email', 'Password', 'Website URL', 'Category', 'Notes'];
    const escapeCSV = val => `"${(val || '').toString().replace(/"/g, '""')}"`;

    const rows = items.map(item => [
      escapeCSV(item.service),
      escapeCSV(item.label),
      escapeCSV(item.username),
      escapeCSV(item.password),
      escapeCSV(item.url),
      escapeCSV(item.category),
      escapeCSV(item.notes)
    ].join(','));

    return [headers.join(','), ...rows].join('\r\n');
  }

  /**
   * Import vault from JSON backup
   */
  async importBackup(jsonString, currentMasterPassword = null) {
    const data = JSON.parse(jsonString);

    if ((data.type === 'BUNS_MANAGER_PLAIN_BACKUP' || data.type === 'BUNS_VAULT_PLAIN_BACKUP' || data.type === 'PAPIER_VAULT_PLAIN_BACKUP') && Array.isArray(data.items)) {
      await this.saveItems(data.items);
      return data.items.length;
    } else if (data.type === 'BUNS_MANAGER_ENCRYPTED_BACKUP' || data.type === 'BUNS_VAULT_ENCRYPTED_BACKUP' || data.type === 'PAPIER_VAULT_ENCRYPTED_BACKUP') {
      if (!currentMasterPassword) {
        throw new Error('Master password required to restore encrypted backup');
      }
      const decrypted = await CryptoEngine.decrypt(data.payload, currentMasterPassword);
      const items = JSON.parse(decrypted);
      await this.saveItems(items);
      return items.length;
    } else if (Array.isArray(data)) {
      await this.saveItems(data);
      return data.length;
    }

    throw new Error('Unrecognized backup file format');
  }
}
