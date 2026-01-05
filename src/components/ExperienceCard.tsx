import Card from "./Card";
import { TimelineBarChart } from "./charts";
import type { ExperienceData } from "./charts";

const experiences: ExperienceData[] = [
  {
    company: "IT company",
    startYear: "Jan 2019",
    endYear: "Dec 2021",
    role: "Frontend Developer",
    description: "Led development of web applications using React and Node.js",
  },
  {
    company: "HCL Technologies",
    startYear: "Dec 2021",
    endYear: "Apr 2023",
    role: "Software Engineer",
    description: "Built scalable web services and maintained legacy systems",
  },
  {
    company: "Intellect",
    startYear: "Apr 2023",
    endYear: "Present",
    role: "Senior Software Engineer 1",
    description:
      "Developed mobile applications and learned modern web technologies",
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
