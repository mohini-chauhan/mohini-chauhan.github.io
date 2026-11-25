const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** "2023-04" → months since year 0, so two dates subtract cleanly. */
const toMonths = (yearMonth: string) => Number(yearMonth.slice(0, 4)) * 12 + Number(yearMonth.slice(5, 7));

/**
 * How long a role lasted, e.g. "1 year 5 months". `start` and `end` are ISO
 * year-months ("2023-04"); `end` is null for the current role, which counts up
 * to `now`. Months are inclusive, as on a resume: Jan 2019 to Dec 2021 is 3 years.
 */
export function formatDuration(start: string, end: string | null, now: Date): string {
  const endMonths = end ? toMonths(end) : now.getFullYear() * 12 + now.getMonth() + 1;
  const months = endMonths - toMonths(start) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [years && plural(years, 'year'), rest && plural(rest, 'month')].filter(Boolean).join(' ');
}
