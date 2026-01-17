import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import type { RadarChartProps } from './types';
import { createRadarChartOptions } from './utils';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart: React.FC<RadarChartProps> = ({ data, options, className = '' }) => {
  const chartOptions = createRadarChartOptions(options);

  return (
    <div className={`relative h-[291px] w-full ${className}`}>
      <Radar data={data} options={chartOptions} />
    </div>
  );
};

export default RadarChart;