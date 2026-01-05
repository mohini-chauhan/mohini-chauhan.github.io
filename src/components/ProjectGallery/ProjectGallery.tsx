import Card from "../Card";
import { ProjectData } from "./projects";

export default function ProjectGallery() {
  return (
    <Card className="p-4">
      <h4 className="header-foreground">Projects Overview</h4>
      <p className="text-sm">
        Sample frontend projects showcasing UI, architecture, and modern web
        development practices.
      </p>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
        {ProjectData.map((project) => (
          <section
            key={project.id}
            className="rounded-lg bg-background-card border border-border"
          >
            <section className="h-[150px] w-full">
              <img
                src={project.img}
                alt={project.title}
                className="h-full w-full object-cover rounded-t-lg"
              />
            </section>
            <section className="p-2">
              <h5 className="font-semibold">{project.title}</h5>
              <a
                href={project.link}
                className="text-sm text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
              </a>
            </section>
          </section>
        ))}
      </section>
    </Card>
  );
}
