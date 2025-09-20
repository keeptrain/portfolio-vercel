import SectionContainer from "@/components/_/SectionContainer";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
    stack: ["Laravel,", "Livewire"],
    title: "JakReq - A apps for bla bla bla bla",
  },
  {
    links: "",
    imageSrc: "/test-png.jpg",
    stack: ["Android,", "Kotlin,", "XML"],
    title: "Cullinarix - A apps for bla bla bla bla",
  },
];

const ProjectsBlogs = () => {
  const [isLatest, setIsLatest] = useState(true);

  return (
    <section
      id="projects-blogs"
      className="mt-12 bg-zinc-50 md:mt-0 md:min-h-screen dark:bg-black"
    >
      <SectionContainer>
        <div className="flex items-center md:h-screen">
          <div className="w-full space-y-2 md:space-y-4">
            <h1 className="font-medium-ex leading-tight text-black md:text-3xl dark:text-white">
              I build &
              <br />
              design stuff
            </h1>
            <div className="flex flex-col space-y-2 md:flex-row md:justify-between">
              <p className="text-sm text-black md:text-2xl dark:text-white/80">
                Open source projects, web apps <br /> and experimentals.
              </p>
              <span onClick={() => setIsLatest(!isLatest)}>
                <p
                  className={`text-md md:text-2xl ${isLatest ? "text-black underline dark:text-white" : "text-zinc-400"} cursor-pointer`}
                >
                  Latest
                </p>
              </span>
            </div>
            {projectData.map((project: ProjectAdapterProps, index) => (
              <div
                key={index}
                onClick={() => project.links}
                className="flex flex-row border-b border-gray-300 py-2 text-black/60 opacity-95 transition-colors duration-300 hover:cursor-pointer hover:text-black hover:opacity-100 dark:border-zinc-700"
              >
                <ProjectAdapter
                  imageSrc={project.imageSrc}
                  stack={project.stack}
                  title={project.title}
                  links={project.links}
                />
              </div>
            ))}
            <div className="flex justify-center">
              <Link
                href={"/projects"}
                className="font-medium-ex rounded-4xl bg-white px-4 py-2 text-sm shadow-sm md:px-8 md:py-3 md:text-lg dark:bg-zinc-900 dark:text-white"
              >
                View more
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export const ProjectAdapter = ({
  imageSrc,
  title,
  stack,
}: ProjectAdapterProps) => {
  return (
    <>
      <div className="relative h-20 w-32 md:h-[250px] md:w-[375px]">
        <Image
          alt={"logo"}
          src={imageSrc}
          fill
          className="rounded-lg opacity-80 hover:opacity-100"
        />
      </div>
      <div className="flex flex-col justify-center space-y-1 pl-4 md:space-y-2 md:pl-12 lg:pl-16">
        <div className="flex items-center gap-2 text-xs text-zinc-500 md:text-sm dark:text-white/80">
          {stack.map((tech, index) => (
            <p key={index}>{tech}</p>
          ))}
        </div>
        <h2 className="flex max-w-prose items-center text-sm md:text-3xl dark:text-white">
          {title}
        </h2>
      </div>
    </>
  );
};

export default ProjectsBlogs;
