/**
 * Password & Passphrase Generation Engine
 * Uses cryptographically secure pseudorandom number generator (CSPRNG)
 */

const CHAR_SETS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  ambiguous: '0Ool1I|'
};

const PASSPHRASE_WORDS = [
  'anchor', 'aurora', 'beacon', 'breeze', 'bridge', 'canopy', 'cascade', 'cedar',
  'cipher', 'cloud', 'cobalt', 'compass', 'copper', 'cradle', 'creek', 'crystal',
  'dawn', 'delta', 'drift', 'echo', 'ember', 'falcon', 'feather', 'forest',
  'glacier', 'grove', 'harbor', 'haven', 'horizon', 'island', 'jasper', 'lagoon',
  'lantern', 'lotus', 'lunar', 'meadow', 'mirage', 'monarch', 'nebula', 'oasis',
  'orbit', 'orchid', 'pebble', 'phoenix', 'pine', 'polar', 'prism', 'quartz',
  'radiant', 'rain', 'ravine', 'reef', 'ripple', 'river', 'ruby', 'sage',
  'sail', 'sapphire', 'shadow', 'sierra', 'silver', 'solstice', 'spark', 'summit',
  'temple', 'tide', 'timber', 'trail', 'valley', 'velvet', 'vessel', 'voyage',
  'willow', 'wind', 'zenith', 'zephyr'
];

export class PasswordGenerator {
  /**
   * Generate a random integer in range [0, max - 1] securely
   */
  static getRandomInt(max) {
    if (max <= 0) return 0;
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  }

  /**
   * Generate a strong random password
   */
  static generatePassword(options = {}) {
    const {
      length = 18,
      uppercase = true,
      lowercase = true,
      numbers = true,
      symbols = true,
      avoidAmbiguous = false
    } = options;

    let availableChars = '';
    const guaranteedChars = [];

    let lowerChars = CHAR_SETS.lower;
    let upperChars = CHAR_SETS.upper;
    let numChars = CHAR_SETS.numbers;
    let symChars = CHAR_SETS.symbols;

    if (avoidAmbiguous) {
      const isNotAmbiguous = ch => !CHAR_SETS.ambiguous.includes(ch);
      lowerChars = lowerChars.split('').filter(isNotAmbiguous).join('');
      upperChars = upperChars.split('').filter(isNotAmbiguous).join('');
      numChars = numChars.split('').filter(isNotAmbiguous).join('');
    }

    if (lowercase && lowerChars.length > 0) {
      availableChars += lowerChars;
      guaranteedChars.push(lowerChars[this.getRandomInt(lowerChars.length)]);
    }

    if (uppercase && upperChars.length > 0) {
      availableChars += upperChars;
      guaranteedChars.push(upperChars[this.getRandomInt(upperChars.length)]);
    }

    if (numbers && numChars.length > 0) {
      availableChars += numChars;
      guaranteedChars.push(numChars[this.getRandomInt(numChars.length)]);
    }

    if (symbols && symChars.length > 0) {
      availableChars += symChars;
      guaranteedChars.push(symChars[this.getRandomInt(symChars.length)]);
    }

    if (availableChars.length === 0) {
      availableChars = CHAR_SETS.lower + CHAR_SETS.numbers;
    }

    const passwordArr = [...guaranteedChars];
    const remainingLength = Math.max(0, length - passwordArr.length);

    for (let i = 0; i < remainingLength; i++) {
      const idx = this.getRandomInt(availableChars.length);
      passwordArr.push(availableChars[idx]);
    }

    // Cryptographically shuffle array (Fisher-Yates)
    for (let i = passwordArr.length - 1; i > 0; i--) {
      const j = this.getRandomInt(i + 1);
      [passwordArr[i], passwordArr[j]] = [passwordArr[j], passwordArr[i]];
    }

    return passwordArr.join('');
  }

  /**
   * Generate a memorable passphrase (e.g. "copper-beacon-summit-horizon")
   */
  static generatePassphrase(wordCount = 4, separator = '-') {
    const selectedWords = [];
    for (let i = 0; i < wordCount; i++) {
      const idx = this.getRandomInt(PASSPHRASE_WORDS.length);
      selectedWords.push(PASSPHRASE_WORDS[idx]);
    }
    return selectedWords.join(separator);
  }

  /**
   * Calculate password strength and entropy
   */
  static evaluateStrength(password = '') {
    if (!password) {
      return { score: 0, label: 'Empty', color: 'weak', entropy: 0 };
    }

    let charsetSize = 0;
    if (/[a-z]/.test(password)) charsetSize += 26;
    if (/[A-Z]/.test(password)) charsetSize += 26;
    if (/[0-9]/.test(password)) charsetSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;

    const entropy = Math.round(password.length * Math.log2(Math.max(charsetSize, 2)));

    let score = 1;
    let label = 'Weak';
    let color = 'weak';

    if (password.length >= 14 && entropy >= 70) {
      score = 4;
      label = 'Military Grade';
      color = 'strong';
    } else if (password.length >= 12 && entropy >= 55) {
      score = 3;
      label = 'Strong';
      color = 'strong';
    } else if (password.length >= 8 && entropy >= 35) {
      score = 2;
      label = 'Moderate';
      color = 'medium';
    }

    return { score, label, color, entropy };
  }
}
