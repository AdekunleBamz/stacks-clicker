import { describe, expect, test } from 'vitest';
import { parseContractError } from '../errors';

describe('parseContractError', () => {
  test('maps numeric contract codes to friendly messages', () => {
    expect(parseContractError('(err u101)')).toContain('Insufficient Funds');
  });

  test('maps user rejected messages to rejection copy', () => {
    expect(parseContractError('User rejected transaction')).toContain('User Rejected');
  });

  test('matches user rejected pattern case-insensitively', () => {
    expect(parseContractError('USER REJECTED TX')).toContain('User Rejected');
  });

  test('maps insufficient-balance strings to insufficient funds copy', () => {
    expect(parseContractError('insufficient balance for fee')).toContain('Insufficient Funds');
  });

  test('parses error objects using their message property', () => {
    expect(parseContractError({ message: '(err u100)' })).toContain('Unauthorized');
  });

  test('parses error objects using reason property', () => {
    expect(parseContractError({ reason: '(err u103)' })).toContain('Cooldown Active');
  });

  test('parses error objects using error property', () => {
    expect(parseContractError({ error: '(err u104)' })).toContain('Limit Reached');
  });

  test('maps plain numeric strings directly', () => {
    expect(parseContractError('500')).toContain('Network Error');
  });

  test('maps numeric values after string coercion', () => {
    expect(parseContractError(403)).toContain('Contract Paused');
  });

  test('prefers explicit numeric codes over keyword heuristics', () => {
    expect(parseContractError('Error 101: user rejected')).toContain('Insufficient Funds');
  });

  test('handles null input without throwing', () => {
    expect(parseContractError(null)).toContain('Transaction failed');
  });

  test('keeps short unknown messages untruncated', () => {
    expect(parseContractError('minor network blip')).toBe('Transaction failed: minor network blip');
  });

  test('passes through backoff-active messages with retry timing', () => {
    const msg = 'Broadcast backoff active for quickpoll-v2p.ping. Please try again in 12 seconds';
    expect(parseContractError(msg)).toBe(msg);
  });

  test('passes through rate-limit messages', () => {
    const msg = 'Per-minute rate limit exceeded for stacks quota. Please try again in 22 seconds';
    expect(parseContractError(msg)).toBe(msg);
  });

  test('passes through quota-only messages', () => {
    const msg = 'Per-minute quota reached for stacks provider';
    expect(parseContractError(msg)).toBe(msg);
  });

  test('passes through TooMuchChaining messages', () => {
    const msg = 'BROADCAST ERROR — TooMuchChaining';
    expect(parseContractError(msg)).toBe(msg);
  });

  test('falls back to truncated raw message when code is unknown', () => {
    const message =
      'This is an unknown error message that is intentionally long for fallback truncation coverage';
    const parsed = parseContractError(message);
    expect(parsed).toMatch(/^Transaction failed: /);
    expect(parsed.endsWith('...')).toBe(true);
  });
});
