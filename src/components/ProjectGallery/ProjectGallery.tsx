import { motion } from "framer-motion";
import Card from "../Card";
import { ProjectData } from "./projects";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ProjectGallery() {
  return (
    <Card className="p-4">
      <h4 className="header-foreground text-lg font-semibold">
        Projects Overview
      </h4>
      <p className="text-sm text-muted-foreground">
        Sample frontend projects showcasing UI, architecture, and modern web
        development practices.
      </p>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4"
      >
        {ProjectData.map((project) => (
          <motion.article
            key={project.id}
            variants={itemVariants}
            whileHover={{
              y: -6,
              boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group rounded-xl bg-background-card border border-border overflow-hidden cursor-pointer"
          >
            {/* Image */}
            <div className="h-[150px] w-full overflow-hidden">
              <motion.img
                src={project.img}
                alt={project.title}
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col gap-1">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group"
              >
                <h5 className="font-semibold group-hover:text-primary">
                  {project.title}
                </h5>
                <motion.span
                  className="opacity-0 group-hover:opacity-100"
                  whileHover={{ scale: 1.2 }}
                >
                ›
                </motion.span>
              </a>
            </div>
          </motion.article>
        ))}
      </motion.section>
    </Card>
  );
}
