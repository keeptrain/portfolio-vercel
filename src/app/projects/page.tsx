'use client';
import Link from "next/link";
import SectionContainer from "@/components/_/SectionContainer";
import React, {useState} from "react";
import {ProjectAdapter} from "@/components/ProjectsBlogs";
import {ArrowsUpDown} from "@/components/icons/HeroIcons";

export default function ProjectsPage() {
  type ProjectAdapterProps = {
    links: string;
    imageSrc: string;
    stack: string[];
    title: string;
  }

  const projectData: ProjectAdapterProps[] = [
    {
      links: "",
      imageSrc: "/test-png.jpg",
      stack: ["Laravel", "Livewire"],
      title: "A apps for bla bla bla bla"
    },
    {
      links: "",
      imageSrc: "/test-png.jpg",
      stack: ["Laravel"],
      title: "A apps for bla bla bla bla"
    },
    {
      links: "",
      imageSrc: "/test-png.jpg",
      stack: ["Laravel", "Livewire"],
      title: "A apps for bla bla bla bla"
    },
    {
      links: "",
      imageSrc: "/test-png.jpg",
      stack: ["Laravel"],
      title: "A apps for bla bla bla bla"
    },
  ]

  const [isLatest, setIsLatest] = useState(true);

  return (
    <>
      <div className="md:min-h-screen pt-24 bg-zinc-50 dark:bg-black">
        <SectionContainer>
          <h1 className="flex items-center justify-between text-lg md:text-3xl font-serif p-6">
            <div>

            </div>
            <div className="flex gap-2">
              <Link href={`/`}>
                <span className="text-gray-400 hover:text-black">..</span>
              </Link>
              <span className="text-black dark:text-white">/ Projects</span>
            </div>
            <span onClick={() => setIsLatest(!isLatest)} className="flex items-center gap-2">
                <p className={`text-md md:text-2xl
                ${isLatest ? 'text-black dark:text-lime-100 underline' : 'text-gray-400'} cursor-pointer`}>
                  Latest
                </p>
              {/*<ArrowsUpDown color={""}/>*/}
            </span>
          </h1>
          {projectData.map((project: ProjectAdapterProps, index) => (
            <div key={index} onClick={() => project.links}
                 className="flex flex-row border-b border-gray-300 dark:border-zinc-700 py-4 text-black/60 hover:text-black opacity-95
                   hover:opacity-100 hover:cursor-pointer transition-colors duration-300">
              <ProjectAdapter imageSrc={project.imageSrc} stack={project.stack}
                              title={project.title} links={project.links}/>
            </div>
          ))}

        </SectionContainer>
      </div>
    </>
  )
}
