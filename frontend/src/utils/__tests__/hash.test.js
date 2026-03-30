import { expect, test, describe } from 'vitest';
import { simpleHash, stringToColor } from '../hash';

describe('hash utilities', () => {
  describe('simpleHash', () => {
    test('generates deterministic hash for same string', () => {
      const s = 'stacks-clicker';
      expect(simpleHash(s)).toBe(simpleHash(s));
    });

    test('generates different hashes for different strings', () => {
      expect(simpleHash('abc')).not.toBe(simpleHash('abd'));
    });

    test('generates valid 32-bit unsigned integer', () => {
      const hash = simpleHash('any-string');
      expect(hash).toBeGreaterThanOrEqual(0);
      expect(hash).toBeLessThanOrEqual(4294967295);
      expect(Number.isInteger(hash)).toBe(true);
    });

    test('returns stable seed hash for empty strings', () => {
      expect(simpleHash('')).toBe(5381);
    });

    test('handles undefined input by hashing empty string', () => {
      expect(simpleHash(undefined)).toBe(5381);
    });

    test('coerces numeric input consistently', () => {
      expect(simpleHash(42)).toBe(simpleHash('42'));
    });

    test('handles unicode input deterministically', () => {
      expect(simpleHash('Yoruba-ọrọ')).toBe(simpleHash('Yoruba-ọrọ'));
    });
  });

  describe('stringToColor', () => {
    test('generates HSL string', () => {
      const color = stringToColor('test');
      expect(color).toMatch(/^hsl\(\d+, 70%, 65%\)$/);
    });

    test('is deterministic', () => {
      expect(stringToColor('stacks')).toBe(stringToColor('stacks'));
    });

    test('keeps hue channel within 0-359 range', () => {
      const match = stringToColor('range-check').match(/^hsl\((\d+), 70%, 65%\)$/);
      const hue = Number(match?.[1]);
      expect(hue).toBeGreaterThanOrEqual(0);
      expect(hue).toBeLessThan(360);
    });

    test('returns different colors for different ids in common cases', () => {
      expect(stringToColor('tx-1')).not.toBe(stringToColor('tx-2'));
    });

    test('handles undefined input without throwing', () => {
      expect(stringToColor(undefined)).toMatch(/^hsl\(\d+, 70%, 65%\)$/);
    });

    test('coerces numeric input consistently in color generation', () => {
      expect(stringToColor(7)).toBe(stringToColor('7'));
    });
  });
});
