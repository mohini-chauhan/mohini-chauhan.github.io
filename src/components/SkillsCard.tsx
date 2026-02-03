import Card from "./Card";
import { TreemapChart } from "./charts";
import { useTheme } from "../context/ThemeContext";

// Skill categories with their technologies and proficiency
const skillCategories = [
  {
    label: 'Component Design',
    proficiency: 9,
    techs: ['React', 'Ant Design', 'TypeScript', 'JSX/TSX', 'HTML5'],
    color: '#FFD960'
  },
  {
    label: 'Styling',
    proficiency: 9,
    techs: ['Tailwind CSS', 'Sass/SCSS', 'CSS3', 'Framer Motion', 'CVA', 'CLSX'],
    color: '#FF6B6B'
  },
  {
    label: 'State Management',
    proficiency: 7,
    techs: ['React Hooks', 'Context API', 'Redux', 'Custom Hooks'],
    color: '#4ECDC4'
  },
  {
    label: 'Testing',
    proficiency: 6,
    techs: ['Jest', 'React Testing Library'],
    color: '#8330E3'
  },
  {
    label: 'Performance',
    proficiency: 8,
    techs: ['React.memo', 'Code Splitting', 'Lazy Loading', 'Image Optimization'],
    color: '#96CEB4'
  },
  {
    label: 'Build Tools',
    proficiency: 8,
    techs: ['Vite', 'Webpack', 'npm/yarn'],
    color: '#E879F9'
  },
  {
    label: 'Data Visualization',
    proficiency: 6,
    techs: ['Chart.js', 'React Chart.js 2'],
    color: '#45B7D1'
  },
  {
    label: 'Version Control',
    proficiency: 8,
    techs: ['GitHub', 'GitHub Actions', 'Git'],
    color: '#F7DC6F'
  }
];

export default function SkillsCard() {
  const { theme } = useTheme();

  return (
    <Card className="p-3 xs:p-4" animateBorder>
      <h4 className="header-foreground mb-3">Tech Stack & Proficiency</h4>
<p className="text-sm mb-2">
        Visualizing expertise across modern JS frameworks, CSS architectures, and build tools.
      </p>
      {/* Treemap Chart */}
      <div className="h-[300px] xs:h-[380px] lg:h-[403px] w-full overflow-hidden">
        <TreemapChart
          skillCategories={skillCategories}
          theme={theme}
          className="h-full"
        />
      </div>
    </Card>
  );
}
