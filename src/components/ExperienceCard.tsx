import Card from "./Card";
import { TimelineBarChart } from "./charts";
import type { ExperienceData } from "./charts";

const experiences: ExperienceData[] = [
  {
    company: "IT company",
    startYear: "Jan 2019",
    endYear: "Dec 2021",
    role: "Frontend Developer",
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

export default function ExperienceCard() {
  return (
    <Card className="p-4">
      <h4 className="header-foreground">Professional Journey</h4>
      <p className="text-sm">A Data-Driven Look at My Career Growth</p>
      <TimelineBarChart experiences={experiences} />
    </Card>
  );
}
