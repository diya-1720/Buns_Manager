/**
 * Cryptographic Engine using Native Web Crypto API (SubtleCrypto)
 * - Zero-Knowledge Client-Side Architecture
 * - AES-GCM 256-bit encryption
 * - PBKDF2 Key Derivation (100,000 iterations, SHA-256)
 */

export class CryptoEngine {
  /**
   * Convert buffer to Hex string
   */
  static bufferToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  /**
   * Convert Hex string to Uint8Array
   */
  static hexToBuffer(hex) {
    const tokens = hex.match(/.{1,2}/g) || [];
    return new Uint8Array(tokens.map(byte => parseInt(byte, 16)));
  }

  /**
   * Generate cryptographically secure random bytes
   */
  static getRandomBytes(length = 16) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return array;
  }

  /**
   * Derive an AES-GCM 256-bit CryptoKey from a Master Password using PBKDF2
   */
  static async deriveKey(password, saltBuffer) {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );

    return window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: saltBuffer,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Hash a string (SHA-256) for verification
   */
  static async hashString(text, salt = '') {
    const enc = new TextEncoder();
    const buffer = await window.crypto.subtle.digest('SHA-256', enc.encode(salt + text));
    return this.bufferToHex(buffer);
  }

  /**
   * Encrypt plain text using AES-256-GCM
   * Returns a compact JSON string containing { s: saltHex, iv: ivHex, d: ciphertextHex }
   */
  static async encrypt(plainText, masterPassword) {
    const enc = new TextEncoder();
    const salt = this.getRandomBytes(16);
    const iv = this.getRandomBytes(12); // 96-bit standard for GCM

    const key = await this.deriveKey(masterPassword, salt);
    const cipherBuffer = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      enc.encode(plainText)
    );

    return JSON.stringify({
      s: this.bufferToHex(salt),
      iv: this.bufferToHex(iv),
      d: this.bufferToHex(cipherBuffer)
    });
  }

  /**
   * Decrypt ciphertext payload using AES-256-GCM
   */
  static async decrypt(payloadString, masterPassword) {
    try {
      const payload = JSON.parse(payloadString);
      if (!payload.s || !payload.iv || !payload.d) {
        throw new Error('Invalid encrypted payload structure');
      }

      const salt = this.hexToBuffer(payload.s);
      const iv = this.hexToBuffer(payload.iv);
      const cipherData = this.hexToBuffer(payload.d);

      const key = await this.deriveKey(masterPassword, salt);
      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        cipherData
      );

      const dec = new TextDecoder();
      return dec.decode(decryptedBuffer);
    } catch (err) {
      throw new Error('Decryption failed: Incorrect password or corrupted vault data');
    }
  }
}
