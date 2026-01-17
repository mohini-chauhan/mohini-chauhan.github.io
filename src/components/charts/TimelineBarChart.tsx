import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import type { TimelineBarChartProps } from "./types";
import { useTheme } from "../../context/ThemeContext";
import { parseDate, calculateDuration, formatDurationText, getChartColors } from "../../utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const TimelineBarChart: React.FC<TimelineBarChartProps> = ({
  experiences,
  options,
  className = "",
}) => {
  const { theme } = useTheme();

  // Parse all dates and calculate min/max years for scaling
  const parsedExperiences = experiences.map(exp => ({
    ...exp,
    startDate: parseDate(exp.startYear),
    endDate: exp.endYear === 'Present' ? new Date() : parseDate(exp.endYear),
  }));

  const allDates = parsedExperiences.flatMap(exp => [exp.startDate, exp.endDate]);
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));

  const minYear = minDate.getFullYear();
  const maxYear = maxDate.getFullYear();

  // Get theme-aware colors from CSS custom properties
  const chartColors = getChartColors(theme);

  // Generate colors for each experience
  const backgroundColors = parsedExperiences.map((_, index) => 
    chartColors[index % chartColors.length]
  );
  const borderColors = backgroundColors; // Same colors for borders

  // Prepare data for horizontal bar chart with floating bars [start, end]
  const data = {
    labels: parsedExperiences.map((exp) => exp.company),
    datasets: [
      {
        label: "Experience Timeline",
        data: parsedExperiences.map((exp) => [
          exp.startDate.getFullYear() + exp.startDate.getMonth() / 12,
          exp.endDate.getFullYear() + exp.endDate.getMonth() / 12,
        ]),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 25, // Controls the thickness/height of horizontal bars
      },
    ],
  };

  // Custom tooltip
  const customTooltip = {
    callbacks: {
      title: (context: any) => {
        const index = context[0]?.dataIndex;
        if (index !== undefined && parsedExperiences[index]) {
          const exp = parsedExperiences[index];
          return `${exp.company} - ${exp.role}`;
        }
        return "";
      },
      label: (context: any) => {
      const index = context.dataIndex;
      if (index !== undefined && parsedExperiences[index]) {
        const exp = parsedExperiences[index];
        const start = exp.startYear;
        const end = exp.endYear === "Present" ? "Present" : exp.endYear;
        const duration = calculateDuration(exp.startDate, exp.endDate);
        const durationText = formatDurationText(duration.years, duration.months);

        // Split description by newlines and filter out empty lines
        const descriptionLines = exp.description
          ? exp.description.split('\n').filter(line => line.trim() !== '')
          : [];

        return [
          `Duration: ${durationText} (${start} - ${end})`,
          ...descriptionLines
        ];
      }
      return [];
    },
    },
    backgroundColor:
      theme === "dark" ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.9)",
    titleColor: theme === "dark" ? "white" : "black",
    bodyColor: theme === "dark" ? "white" : "black",
    borderColor:
      theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
  };

  const chartOptions = {
    indexAxis: "y" as const, // Horizontal bars
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: customTooltip,
      datalabels: {
        anchor: "center" as const,
        color: "rgb(96 78 8)" ,
        font: {
          size: 12,
          weight: "normal" as const,
        },
        formatter: (value: any, context: any) => {
          const index = context.dataIndex;
          if (index !== undefined && parsedExperiences[index]) {
            const exp = parsedExperiences[index];
            const duration = calculateDuration(exp.startDate, exp.endDate);
            let durationText = '';
            if (duration.years > 0) {
              durationText = duration.months > 0 
                ? `${duration.years}y ${duration.months}m`
                : `${duration.years}y`;
            } else {
              durationText = `${duration.months}m`;
            }
            
            // Add "-Present" suffix if end year is Present
            if (exp.endYear === "Present") {
              return `${durationText} - Present`;
            }
            
            return durationText;
          }
          return "";
        },
      },
    },
    scales: {
      x: {
        beginAtZero: false,
        min: minYear,
        max: maxYear,
        grid: {
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: theme === "dark" ? "rgb(135, 136, 140)" : "rgb(105 106 100)",
          stepSize: 1,
          callback: (tickValue: string | number) =>
            Math.floor(Number(tickValue)).toString(),
        },
        title: {
          display: true,
          text: "Years",
          color: theme === "dark" ? "rgb(135, 136, 140)" : "rgb(105 106 100)",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme === "dark" ? "rgb(135, 136, 140)" : "rgb(105 106 100)",
        },
        title: {
          display: true,
          text: "Company",
          color: theme === "dark" ? "rgb(135, 136, 140)" : "rgb(105 106 100)",
        },
      },
    },
    ...options,
  };

  return (
    <div className={`relative h-[260px] w-full ${className}`}>
      <Bar data={data} options={chartOptions} />
    </div>
  );
};

export default TimelineBarChart;
