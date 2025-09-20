"use client";
import Link from "next/link";
import SectionContainer from "@/components/_/SectionContainer";
import React, { useState } from "react";
import { ProjectAdapter } from "@/components/ProjectsBlogs";
import { ArrowsUpDown } from "@/components/icons/HeroIcons";

export default function ProjectsPage() {
  type ProjectAdapterProps = {
    links: string;
    imageSrc: string;
    stack: string[];
    title: string;
  };

  const projectData: ProjectAdapterProps[] = [
    {
      links: "",
      imageSrc: "/test-png.jpg",
      stack: ["Laravel", "Livewire"],
      title: "A apps for bla bla bla bla",
    },
    {
      links: "",
      imageSrc: "/test-png.jpg",
      stack: ["Laravel"],
      title: "A apps for bla bla bla bla",
    },
    {
      links: "",
      imageSrc: "/test-png.jpg",
      stack: ["Laravel", "Livewire"],
      title: "A apps for bla bla bla bla",
    },
    {
      links: "",
      imageSrc: "/test-png.jpg",
      stack: ["Laravel"],
      title: "A apps for bla bla bla bla",
    },
  ];

  const [isLatest, setIsLatest] = useState(true);

  return (
    <>
      <div className="bg-zinc-50 pt-24 md:min-h-screen dark:bg-black">
        <SectionContainer>
          <h1 className="flex items-center justify-between font-serif text-lg md:text-3xl">
            <h2>List of Projects</h2>

            <div className="flex gap-2">
              {/*<Link href={`/`}>*/}
              {/*  <span className="text-gray-400 hover:text-black">..</span>*/}
              {/*</Link>*/}
              {/*<span className="text-black dark:text-white">/ Projects</span>*/}
            </div>
            <span
              onClick={() => setIsLatest(!isLatest)}
              className="flex items-center gap-2"
            >
              <p
                className={`text-md md:text-2xl ${isLatest ? "text-black underline dark:text-lime-100" : "text-gray-400"} cursor-pointer`}
              >
                Latest
              </p>
              {/*<ArrowsUpDown color={""}/>*/}
            </span>
          </h1>
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
