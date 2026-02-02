import React from "react";
import Header from "./Header";
import ProfileCard from "./ProfileCard";
import ExperienceCard from "./ExperienceCard";
import SkillsCard from "./SkillsCard";
import ProjectGallery from "./ProjectGallery/ProjectGallery";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="min-h-screen w-full max-w-[100vw] bg-background bg-gradient-parent text-foreground transition-colors duration-300 overflow-x-hidden">
        <main className="px-2 xs:px-3 pt-[4.5rem] pb-12 grid lg:grid-cols-12 gap-2 xs:gap-3 w-full max-w-full overflow-hidden">
        <section className="w-full min-w-0 lg:col-span-4 flex flex-col gap-2 xs:gap-3">
          <ProfileCard />
          <SkillsCard />
        </section>
        <section className="w-full min-w-0 lg:col-span-8 flex flex-col gap-2 xs:gap-3">
          <ExperienceCard />
          <ProjectGallery />
        </section>
      </main>
        <Footer/>
      </div>
    </>
  );
}
