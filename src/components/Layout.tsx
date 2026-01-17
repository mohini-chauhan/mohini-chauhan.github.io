import React from "react";
import Header from "./Header";
import ProfileCard from "./ProfileCard";
import ExperienceCard from "./ExperienceCard";
import SkillsCard from "./SkillsCard";
import ProjectGallery from "./ProjectGallery/ProjectGallery";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background bg-gradient-parent text-foreground transition-colors duration-300">
      <Header />
      <section className="p-3 grid md:grid-cols-12 gap-3 w-full h-[calc(100dvh - 80px)]">
        <section className="w-full md:col-span-4 space-y-3">
          <ProfileCard />
          <SkillsCard />
          {/* <Certifications/> */}
        </section>
        <section className="w-full md:col-span-8 space-y-3">
          <ExperienceCard />
          <ProjectGallery/>
        </section>
      </section>
      <Footer/>
    </div>
  );
}
