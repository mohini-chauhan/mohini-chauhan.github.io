import React from 'react';
import { motion } from 'framer-motion';

export interface SkillCategory {
  label: string;
  proficiency: number;
  techs: string[];
  color: string;
}

export interface TreemapChartProps {
  skillCategories: SkillCategory[];
  theme: 'light' | 'dark';
  className?: string;
}

interface LayoutRect {
  x: number;
  y: number;
  w: number;
  h: number;
  data: SkillCategory;
}

// Squarified treemap algorithm for better aspect ratios
const squarify = (
  data: SkillCategory[],
  x: number,
  y: number,
  width: number,
  height: number
): LayoutRect[] => {
  const results: LayoutRect[] = [];
  const totalValue = data.reduce((sum, d) => sum + d.proficiency * d.techs.length, 0);

  if (data.length === 0 || totalValue === 0) return results;

  // Sort by value descending
  const sorted = [...data].sort((a, b) =>
    (b.proficiency * b.techs.length) - (a.proficiency * a.techs.length)
  );

  // Use a 2-row or 2-column grid approach for better distribution
  const isWide = width > height;

  if (sorted.length <= 2) {
    // Simple split for 1-2 items
    let offset = 0;
    sorted.forEach((item) => {
      const value = item.proficiency * item.techs.length;
      const ratio = value / totalValue;

      if (isWide) {
        const w = width * ratio;
        results.push({ x: x + offset, y, w, h: height, data: item });
        offset += w;
      } else {
        const h = height * ratio;
        results.push({ x, y: y + offset, w: width, h, data: item });
        offset += h;
      }
    });
  } else {
    // Split into two groups for better layout
    let group1Value = 0;
    const halfTotal = totalValue / 2;
    let splitIndex = 0;

    for (let i = 0; i < sorted.length; i++) {
      const item = sorted[i];
      if (!item) continue;
      const itemValue = item.proficiency * item.techs.length;
      if (group1Value + itemValue <= halfTotal || i === 0) {
        group1Value += itemValue;
        splitIndex = i + 1;
      } else {
        break;
      }
    }

    // Ensure at least one item in each group
    if (splitIndex === 0) splitIndex = 1;
    if (splitIndex >= sorted.length) splitIndex = sorted.length - 1;

    const group1 = sorted.slice(0, splitIndex);
    const group2 = sorted.slice(splitIndex);
    const group1Ratio = group1Value / totalValue;

    if (isWide) {
      const w1 = width * group1Ratio;
      results.push(...squarify(group1, x, y, w1, height));
      results.push(...squarify(group2, x + w1, y, width - w1, height));
    } else {
      const h1 = height * group1Ratio;
      results.push(...squarify(group1, x, y, width, h1));
      results.push(...squarify(group2, x, y + h1, width, height - h1));
    }
  }

  return results;
};

const TreemapChart: React.FC<TreemapChartProps> = ({ skillCategories, theme, className = '' }) => {
  const layoutItems = squarify(skillCategories, 0, 0, 100, 100);
  const isDark = theme !== 'light';

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div className="relative w-full h-full rounded-lg overflow-hidden">
        {layoutItems.map((item, index) => (
          <motion.div
            key={item.data.label}
            className="absolute overflow-hidden cursor-pointer group"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              width: `${item.w}%`,
              height: `${item.h}%`,
              padding: '2px',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.04, duration: 0.25 }}
            whileHover={{ scale: 1.02, zIndex: 10 }}
          >
            <div
              className="w-full h-full rounded-lg p-2.5 flex flex-col transition-all duration-200 shadow-sm group-hover:shadow-md"
              style={{
                backgroundColor: isDark
                  ? `${item.data.color}60`
                  : `${item.data.color}`,
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.5)'}`,
              }}
            >
              {/* Category Label */}
              <div className="flex items-center justify-between mb-1">
                <span
                  className="font-bold text-[11px] leading-tight truncate"
                  style={{ color: isDark ? '#fff' : '#1a1a1a' }}
                >
                  {item.data.label}
                </span>
                <span
                  className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.6)',
                    color: isDark ? '#e5e7eb' : '#374151',
                  }}
                >
                  {item.data.proficiency}/10
                </span>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1 overflow-hidden flex-1 content-start">
                {item.data.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-1.5 py-0.5 text-[9px] rounded-md font-medium truncate"
                    style={{
                      backgroundColor: isDark ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.7)',
                      color: isDark ? '#f3f4f6' : '#1f2937',
                      maxWidth: '100%',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TreemapChart;
