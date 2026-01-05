import type { ChartOptions } from 'chart.js';

// Default chart configuration that can be customized
export const defaultChartConfig = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 2, // width:height ratio
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      padding: 12,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        padding: 10,
      },
    },
    y: {
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
        lineWidth: 1,
      },
      ticks: {
        padding: 10,
      },
    },
  },
  elements: {
    point: {
      radius: 4,
      hoverRadius: 6,
    },
    line: {
      tension: 0.4,
      borderWidth: 2,
    },
  },
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
};

// Specific defaults for different chart types
export const lineChartDefaults = {
  ...defaultChartConfig,
  elements: {
    ...defaultChartConfig.elements,
    line: {
      ...defaultChartConfig.elements.line,
      fill: false,
    },
  },
};

export const barChartDefaults = {
  ...defaultChartConfig,
  elements: {
    ...defaultChartConfig.elements,
    bar: {
      borderRadius: 4,
      borderSkipped: false,
    },
  },
  scales: {
    ...defaultChartConfig.scales,
    x: {
      ...defaultChartConfig.scales.x,
      grid: {
        display: false,
      },
    },
    y: {
      ...defaultChartConfig.scales.y,
      beginAtZero: true,
    },
  },
};

export const radarChartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      padding: 12,
    },
  },
  scales: {
    r: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      angleLines: {
        display: true,
      },
      pointLabels: {
        font: {
          size: 12,
        },
      },
      ticks: {
        display: false,
      },
    },
  },
  elements: {
    point: {
      radius: 4,
      hoverRadius: 6,
    },
    line: {
      borderWidth: 2,
    },
  },
};

const createBaseChartOptions = () => defaultChartConfig;

export const createLineChartOptions = (customOptions?: ChartOptions<'line'>): ChartOptions<'line'> => ({
  ...lineChartDefaults,
  ...customOptions,
});

export const createBarChartOptions = (customOptions?: ChartOptions<'bar'>): ChartOptions<'bar'> => ({
  ...barChartDefaults,
  ...customOptions,
});

export const createRadarChartOptions = (customOptions?: ChartOptions<'radar'>): ChartOptions<'radar'> => ({
  ...radarChartDefaults,
  ...customOptions,
});

export const createGaugeChartOptions = (value: number, max: number, label?: string): any => ({
  responsive: true,
  maintainAspectRatio: false,
  rotation: -90,
  circumference: 180,
  cutout: '60%',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
    title: {
      display: !!label,
      text: label,
      position: 'bottom',
    },
  },
  scales: {
    y: {
      display: false,
    },
    x: {
      display: false,
    },
  },
});

export const createGaugeData = (value: number, max: number, color: string = '#36A2EB') => ({
  datasets: [
    {
      data: [value, max - value],
      backgroundColor: [color, '#E5E5E5'],
      borderWidth: 0,
    },
  ],
});