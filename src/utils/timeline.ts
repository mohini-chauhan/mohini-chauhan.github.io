// Helper functions for timeline calculations

/**
 * Get chart colors based on theme
 */
export const getChartColors = (theme: 'light' | 'dark'): string[] => {
  if (typeof document === 'undefined') {
    // Server-side rendering fallback
    return theme === 'dark' 
      ? ['#FFD960', '#FF6B6B', '#4ECDC4', '#8330E3', '#96CEB4']
      : ['#ae9235', '#f38686', '#84cbc6', '#23778a', '#96CEB4'];
  }

  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  
  return [
    computedStyle.getPropertyValue('--chart-color-1').trim() || '#FFD960',
    computedStyle.getPropertyValue('--chart-color-2').trim() || '#FF6B6B',
    computedStyle.getPropertyValue('--chart-color-3').trim() || '#4ECDC4',
    computedStyle.getPropertyValue('--chart-color-4').trim() || (theme === 'dark' ? '#8330E3' : '#45B7D1'),
    computedStyle.getPropertyValue('--chart-color-5').trim() || '#96CEB4',
  ];
};

/**
 * Parse date strings like "Jan 2019" into Date objects
 */
export const parseDate = (dateStr: string): Date => {
  if (dateStr === 'Present') {
    return new Date();
  }
  // Parse "MMM YYYY" format
  const parts = dateStr.split(' ');
  if (parts.length !== 2) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }
  const [month, yearStr] = parts;
  if (!yearStr) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }
  const monthIndex = new Date(`${month} 1, 2000`).getMonth();
  const year = Number.parseInt(yearStr, 10);
  return new Date(year, monthIndex, 1);
};

/**
 * Calculate exact duration between two dates
 */
export const calculateDuration = (startDate: Date, endDate: Date) => {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();

  // Calculate total months between dates (inclusive)
  const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;

  // Convert to years and months
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return { years, months };
};

/**
 * Format duration as readable text
 */
export const formatDurationText = (years: number, months: number): string => {
  let yearText = '';
  if (years > 0) {
    const plural = years > 1 ? 's' : '';
    yearText = `${years} year${plural}`;
  }

  let monthText = '';
  if (months > 0) {
    const plural = months > 1 ? 's' : '';
    monthText = `${months} month${plural}`;
  }

  return [yearText, monthText].filter(Boolean).join(' ');
};