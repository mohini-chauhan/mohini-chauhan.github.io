import Card from "./Card";
import { RadarChart } from "./charts";
import { useTheme } from "../context/ThemeContext";
import React from "react";
import { color } from "bun";

export default function SkillsCard() {
  const { theme } = useTheme();

  const labels = [
    'Component Design',
    'Styling',
    'State Management',
    'Testing',
    'Performance',
    'Data Visualization',
    'Version Control'
  ];

  const expertiseDetails = {
    'Component Design': ['React', 'Ant Design', 'TypeScript', 'JSX/TSX', 'HTML5'],
    'Styling': ['Tailwind CSS', 'Sass/SCSS', 'CSS3', 'Framer Motion'],
    'State Management': ['React Hooks', 'Context API', 'Redux', 'Custom Hooks'],
    'Testing': ['Jest', 'React Testing Library'],
    'Performance': ['React.memo', 'Code Splitting', 'Lazy Loading','Image optimization'],
    'Data Visualization': ['Chart.js', 'React Chart.js 2'],
    'Version Control': ['GitHub', 'GitHub Actions']
  };

  const proficiencyData = [9, 9, 7, 6, 8, 6, 8];

  const data = {
    labels,
    datasets: [
      {
        label: 'Proficiency Level',
        data: proficiencyData,
        fill: true,
        backgroundColor: theme === 'dark' ? 'rgba(110, 141, 142, 0.82)' : '#ffeeb191',
        borderColor: theme === 'dark' ? 'rgb(169, 224, 216)' : 'rgba(59, 130, 246, 0.6)',
        borderWidth: 2,
        pointBackgroundColor: theme === 'dark' ? 'rgb(169, 224, 216)' : '#FFD960',
        pointHoverBackgroundColor: theme === 'dark' ? '#ffffff' : '#000000',
        pointHoverBorderColor: theme === 'dark' ? 'rgba(59, 130, 246, 1)' : 'rgba(59, 130, 246, 0.8)',
        pointRadius: 5,  
        color: '#fff',     // dot size
      },
    ],
  };

  const options = {
    animation: {
      duration: 2000,
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const details = expertiseDetails[label as keyof typeof expertiseDetails] || [];
            return [
              `Proficiency: ${context.parsed.r}/10`,
              ...details.map((detail: string) => `• ${detail}`)
            ];
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 10,
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        angleLines: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          color: theme === 'dark' ? 'rgb(135, 136, 140)' : 'rgb(105 106 100)',
        },
        ticks: {
          backdropColor: 'transparent',
          color: theme === 'dark' ? 'rgb(135, 136, 140)' : 'rgb(105 106 100)',
          stepSize: 2,
        },
      },
    },
  };

  return (
    <Card className="p-4">
      <h4 className="header-foreground">Proficiency Metrics</h4>
      <p className="text-sm mb-2">
        Visualizing expertise across modern JS frameworks, CSS architectures, and build tools.
      </p>
      <p className="text-xs text-gray-500 mb-4">
        Hover over each dot to see the tech stack details.
      </p>
      <RadarChart data={data} options={options} />
    </Card>
  );
}
