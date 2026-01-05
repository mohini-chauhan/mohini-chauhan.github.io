import type { ChartData, ChartOptions, ChartTypeRegistry } from 'chart.js';

export interface BaseChartProps<T extends keyof ChartTypeRegistry = keyof ChartTypeRegistry> {
  data: ChartData<T>;
  options?: ChartOptions<T>;
  className?: string;
}

export type LineChartProps = BaseChartProps<'line'>;

export type BarChartProps = BaseChartProps<'bar'>;

export type RadarChartProps = BaseChartProps<'radar'>;

export type TimelineBarChartProps = {
  experiences: ExperienceData[];
  options?: ChartOptions<'bar'>;
  className?: string;
};

export type GaugeChartProps = BaseChartProps<'doughnut'> & {
  value: number;
  max: number;
  min?: number;
  label?: string;
  color?: string;
};

export interface ExperienceData {
  company: string;
  startYear: string;
  endYear: string | 'Present';
  role: string;
  description?: string;
}