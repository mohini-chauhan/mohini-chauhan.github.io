import { motion } from "framer-motion";
import Card from "../Card";
import { ProjectData } from "./projects";
import { useTheme } from "../../context/ThemeContext";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function ProjectGallery() {
  const { theme } = useTheme();

  return (
    <Card className="p-3 xs:p-4 h-full" animateBorder>
      <h4 className="header-foreground text-lg font-semibold">
        Projects Overview
      </h4>
      <p className="text-sm text-muted-foreground mb-3">
        Sample projects showcasing UI, architecture, and modern web practices.
      </p>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3"
      >
        {ProjectData.map((project) => (
          <motion.a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{
              y: -3,
              scale: 1.02,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`group rounded-xl overflow-hidden cursor-pointer ${
              theme === 'dark'
                ? 'bg-gray-800/60'
                : 'bg-gradient-to-br from-gray-50 to-white'
            }`}
            style={{
              border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
            }}
          >
            {/* Colored Accent Bar */}
            <div
              className="h-1.5 w-full"
              style={{ backgroundColor: project.color }}
            />

            {/* Content */}
            <div className="p-3">
              {/* Title */}
              <div className="flex items-center justify-between mb-2">
                <h5
                  className="font-semibold text-sm"
                  style={{ color: theme === 'dark' ? project.color : undefined }}
                >
                  {project.title}
                </h5>
                <span
                  className="text-xs opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ color: project.color }}
                >
                  →
                </span>
              </div>

              {/* Tech Stack - All visible */}
              <div className="flex flex-wrap gap-1 mb-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-1.5 py-0.5 text-[10px] rounded font-medium ${
                      theme === 'dark'
                        ? 'bg-gray-700/80 text-gray-400'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Highlights - Always visible */}
              {project.highlights && (
                <ul className="space-y-0.5">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="text-[11px] flex items-start gap-1"
                    >
                      <span className="text-green-500 shrink-0">✓</span>
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.a>
        ))}
      </motion.section>
    </Card>
  );
}
