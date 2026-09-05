/**
 * Vault Security Audit & Health Engine
 * Evaluates password vulnerability, detects reused passwords, and provides actionable insights.
 */

import { PasswordGenerator } from './generator.js';

export class VaultAudit {
  /**
   * Run full security audit on a list of vault items
   */
  static analyze(items = []) {
    if (!items || items.length === 0) {
      return {
        total: 0,
        weakCount: 0,
        reusedCount: 0,
        strongCount: 0,
        healthScore: 100,
        weakItems: [],
        reusedItems: []
      };
    }

    const passwordFrequency = new Map();
    const weakItems = [];
    const reusedItems = [];
    let strongCount = 0;

    // Track password occurrences
    items.forEach(item => {
      const pwd = item.password || '';
      passwordFrequency.set(pwd, (passwordFrequency.get(pwd) || 0) + 1);

      const strength = PasswordGenerator.evaluateStrength(pwd);
      if (strength.score <= 2) {
        weakItems.push(item);
      } else {
        strongCount++;
      }
    });

    // Flag items with reused passwords
    items.forEach(item => {
      const pwd = item.password || '';
      if (pwd && passwordFrequency.get(pwd) > 1) {
        reusedItems.push(item);
      }
    });

    // Compute Health Score (0 - 100)
    let score = 100;
    const weakPenalty = (weakItems.length / items.length) * 45;
    const reusedPenalty = (reusedItems.length / items.length) * 45;

    score = Math.max(10, Math.round(score - weakPenalty - reusedPenalty));

    return {
      total: items.length,
      weakCount: weakItems.length,
      reusedCount: reusedItems.length,
      strongCount,
      healthScore: score,
      weakItems,
      reusedItems
    };
  }
}
