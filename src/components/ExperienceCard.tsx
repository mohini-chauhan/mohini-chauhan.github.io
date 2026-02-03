import Card from "./Card";
import { TimelineBarChart } from "./charts";
import type { ExperienceData } from "./charts";
import { useTheme } from "../context/ThemeContext";

const experiences: ExperienceData[] = [
  {
    company: "IT company",
    startYear: "Jan 2019",
    endYear: "Dec 2021",
    role: "Frontend Developer",
    highlights: [
      "20+ responsive apps with cross-browser performance",
      "50K+ daily users with 99.9% uptime",
      "40+ component library, 60% faster dev cycles"
    ],
    description: `💻 Development & Scale
✅ 20+ Responsive Apps – Performance across all major browsers
✅ High-Traffic SPAs – 50K+ daily users / 99.9% uptime
🛠️ Efficiency & Systems
⚡ Modular Library – 40+ components, 60% faster dev cycles
⚡ Mobile-First Design – 95%+ user satisfaction`,
  },
  {
    company: "HCL Technologies",
    startYear: "Dec 2021",
    endYear: "Apr 2023",
    role: "Software Engineer",
    highlights: [
      "Migrated 3 legacy codebases to React.js",
      "Mentored 5 junior developers",
      "Reduced code review cycles by 40%"
    ],
    description: `🚀 Migration & Architecture
✅ Legacy → React.js SPAs – Migrated 3 HTML5 codebases, boosting maintainability by 70%
✅ Centralized Redux – Ensured data consistency across 50+ components
👨‍🏫 Mentorship & Collaboration
👥 Mentored 5 junior devs – Advanced CSS, testing, and React best practices
📉 Code review cycles reduced by 40%
🤝 Cross-functional collaboration – Seamless integration with teams
`,
  },
  {
    company: "Intellect",
    startYear: "Apr 2023",
    endYear: "Present",
    role: "Senior Software Engineer",
    highlights: [
      "Tech Lead for 2-3 projects, 100K+ users",
      "Lighthouse score: 50 → 90",
      "15+ enterprise features/year"
    ],
    description: `🚀 Tech Leadership & Impact
✅ 15+ enterprise features/year – Powering products for 100K+ global users
✅ Shared Libraries (Chat, Video SDKs) – 80% faster integration across 5+ repos
✅ Tech Lead for 2-3 projects – On-time delivery with 95%+ code quality
🔧 Engineering Excellence
⚡ CI/CD Automation – Detects & removes "junk code," auto-reports build metrics
⚡ Performance Boost – Lighthouse score: 50 → 72 (code splitting, lazy loading)
⚡ Scalable Patterns – 25% faster feature development org-wide
🌟 Continuous Improvement
🔄 User feedback-driven iteration
📚 Foundational frontend practices for future teams
`,
  },
];

// Color palette for experience - darker shades for light mode readability
const experienceColorsDark = ['#FFD960', '#FF6B6B', '#4ECDC4'];
const experienceColorsLight = ['#713F12', '#991B1B', '#115E59'];

// Key metrics to highlight (dashboard style)
const keyMetrics = [
  { label: "Years Exp", value: "6+", color: "#FFD960" },
  { label: "Users Served", value: "100K+", color: "#FF6B6B" },
  { label: "Apps Built", value: "20+", color: "#4ECDC4" },
  { label: "Team Led", value: "5+", color: "#8330E3" },
];

export default function ExperienceCard() {
  const { isDarkMode } = useTheme();

  return (
    <Card className="p-3 xs:p-4" animateBorder>
      <h4 className="header-foreground">Professional Journey</h4>

      {/* Compact Key Metrics Strip */}
      <div className="flex flex-wrap gap-2 my-3">
        {keyMetrics.map((metric) => (
          <div
            key={metric.label}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${
              isDarkMode ? 'bg-white/5' : 'bg-amber-100/50'
            }`}
          >
            <span
              className="text-base font-bold"
              style={{ color: metric.color }}
            >
              {metric.value}
            </span>
            <span className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{metric.label}</span>
          </div>
        ))}
      </div>

      {/* Timeline Chart */}
      <TimelineBarChart experiences={experiences} />

      {/* Role Cards with Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        {experiences.map((exp, index) => (
          <div
            key={exp.company}
            className={`rounded-lg overflow-hidden ${
              isDarkMode ? 'bg-white/5' : 'bg-amber-100/40'
            }`}
          >
            {/* Color accent bar */}
            <div
              className="h-1"
              style={{ backgroundColor: experienceColorsDark[index] }}
            />
            <div className="p-3">
              {/* Role & Company */}
              <h5 className="font-semibold text-sm">{exp.role}</h5>
              <p
                className="text-xs mb-2"
                style={{ color: isDarkMode ? experienceColorsDark[index] : experienceColorsLight[index] }}
              >
                @ {exp.company}
              </p>
              {/* Highlights */}
              <ul className="space-y-1">
                {exp.highlights?.map((highlight: string, i: number) => (
                  <li key={i} className="text-xs flex items-start gap-1.5">
                    <span className="text-green-500 shrink-0">✓</span>
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
