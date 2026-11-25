import { describe, expect, it } from 'vitest';
import { formatDuration } from './format';

// Months are counted inclusively, the way LinkedIn and resumes do:
// Jan 2019 to Dec 2021 is 36 months, so "3 years".
describe('formatDuration', () => {
  const now = new Date(2026, 10, 25); // 25 November 2026

  it('shows whole years only', () => {
    expect(formatDuration('2019-01', '2021-12', now)).toBe('3 years');
  });

  it('shows years and months', () => {
    expect(formatDuration('2021-12', '2023-04', now)).toBe('1 year 5 months');
  });

  it('counts the current role up to the current month', () => {
    expect(formatDuration('2023-04', null, now)).toBe('3 years 8 months');
  });

  it('uses the singular for one month and one year', () => {
    expect(formatDuration('2024-01', '2024-01', now)).toBe('1 month');
    expect(formatDuration('2024-01', '2024-12', now)).toBe('1 year');
  });

  it('shows months only under a year', () => {
    expect(formatDuration('2024-01', '2024-07', now)).toBe('7 months');
  });
});
