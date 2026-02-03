export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  link: string;
  github?: string;
  highlights?: string[];
  color: string;
}

export const ProjectData: Project[] = [
  {
    id: 1,
    title: "Unikaksha",
    description: "Educational platform enabling seamless learning experiences with course management and student tracking.",
    techStack: ["React", "Firebase", "Tailwind CSS"],
    highlights: ["Authentication", "Real-time DB", "Responsive UI"],
    link: "https://fir-unikaksha.web.app/",
    color: "#FFD960"
  },
  {
    id: 2,
    title: "Smarter Code",
    description: "Interactive code learning platform with live code editor and progressive skill-building modules.",
    techStack: ["React", "Firebase", "CSS3"],
    highlights: ["Mobile-first design", "Animation", "User Auth"],
    link: "https://smartercode-d5499.web.app/",
    color: "#FF6B6B"
  },
  {
    id: 3,
    title: "Hiking Explorer",
    description: "Travel discovery app showcasing hiking trails with beautiful imagery and location details.",
    techStack: ["React", "Netlify", "Mobile-first design"],
    highlights: ["Image Gallery", "Mobile-First Design", "Fast Loading"],
    link: "https://exploringhikes.netlify.app/",
    color: "#4ECDC4"
  },
  {
    id: 4,
    title: "Skiddos",
    description: "Kid-friendly educational platform with engaging UI designed for young learners.",
    techStack: ["React", "Netlify", "Animation"],
    highlights: ["Mobile-first design", "Interactive", "Accessible"],
    link: "https://skiddos-demo.netlify.app/",
    color: "#8330E3"
  },
  {
    id: 5,
    title: "Library Manager",
    description: "Digital library management system with book cataloging, search, and user management features.",
    techStack: ["React", "Firebase", "Material UI"],
    highlights: ["CRUD Operations", "Search/Filter", "Mobile-first design"],
    link: "https://library-management-1aefd.web.app/home",
    color: "#96CEB4"
  },
  {
    id: 6,
    title: "Virtual Kitchen",
    description: "Interactive 3D kitchen visualization built as a creative CodePen experiment.",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    highlights: ["3D CSS", "Interactive", "Creative UI"],
    link: "https://codepen.io/Mohinii/pen/OJmEeVR",
    color: "#45B7D1"
  },
];
