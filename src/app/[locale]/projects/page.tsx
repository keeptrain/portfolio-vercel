"use client";

import SectionContainer from "@/components/_/SectionContainer";
import ProjectAdapter from "@/components/shared/ProjectAdapter";
import React, { useState } from "react";

export default function ProjectsPage() {
  type ProjectAdapterProps = {
    links: string;
    imageSrc: string;
    stack: string[];
    title: string;
  };

  const projectData: ProjectAdapterProps[] = [
    {
      links: "/projects/jakreq",
      imageSrc: "/images/projects/jakreq-thumb.jpg",
      stack: ["Laravel", "Livewire"],
      title: "JakReq — Request Management System",
    },
    {
      links: "/projects/cullinarix",
      imageSrc: "/images/projects/cullinarix-thumb.jpg",
      stack: ["Android", "Kotlin", "XML"],
      title: "Cullinarix — Food Discovery App",
    },
  ];

  const [isLatest, setIsLatest] = useState(true);

  return (
    <>
      <div className="bg-zinc-50 pt-24 md:min-h-screen dark:bg-black">
        <SectionContainer>
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-lg md:text-3xl">List of Projects</h1>
            <div className="flex gap-2">
              <button onClick={() => setIsLatest(!isLatest)} className="flex items-center gap-2" aria-label="Toggle latest">
                <p
                  className={`text-md md:text-2xl ${isLatest ? "text-black underline dark:text-lime-100" : "text-gray-400"} cursor-pointer`}
                >
                  Latest
                </p>
              </button>
            </div>
          </div>
          {projectData.map((project: ProjectAdapterProps, index) => (
            <div
              key={index}
              onClick={() => project.links}
              className="flex flex-row border-b border-gray-300 py-4 text-black/60 opacity-95 transition-colors duration-300 hover:cursor-pointer hover:text-black hover:opacity-100 dark:border-zinc-700"
            >
              <ProjectAdapter
                imageSrc={project.imageSrc}
                stack={project.stack}
                title={project.title}
                links={project.links}
              />
            </div>
          ))}
        </SectionContainer>
      </div>
    </>
  );
}