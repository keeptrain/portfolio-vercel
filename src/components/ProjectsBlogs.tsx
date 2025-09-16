import SectionContainer from "@/components/_/SectionContainer";
import React, {useState} from "react";
import MoreButton from "@/components/ui/button/MoreButton";
import Image from "next/image";
import Link from "next/link";
import {number} from "prop-types";
import {LaravelWithText} from "@/components/icons/DevIcons";
import {DevicePhoneMobile, GlobeAlt} from "@/components/icons/HeroIcons";

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
    stack: [<GlobeAlt color={""} />, "Laravel,", "Livewire"],
    title: "JakReq - A apps for bla bla bla bla"
  },
  {
    links: "",
    imageSrc: "/test-png.jpg",
    stack: [<DevicePhoneMobile color={""} />, "Android,", "Kotlin,", "XML"],
    title: "Cullinarix - A apps for bla bla bla bla"
  },
]

const ProjectsBlogs = () => {
  const [isLatest, setIsLatest] = useState(true);

  return (
    <section id="projects-blogs" className="md:min-h-screen bg-zinc-50 dark:bg-black mt-12 md:mt-0">
      <SectionContainer>
        <div className="flex items-center md:h-screen">
          <div className="w-full space-y-2 md:space-y-4">
            <h1 className="md:text-3xl font-bold text-black dark:text-chartreuse uppercase">
              I build &
              <br/>
              design stuff
            </h1>
            <div className="flex flex-col md:flex-row md:justify-between space-y-2">
              <p className="text-sm md:text-2xl text-black dark:text-lime-100">
                Open source projects, web apps <br/> and experimentals.
              </p>
              <span onClick={() => setIsLatest(!isLatest)}>
                <p className={`text-md md:text-2xl
                ${isLatest ? 'text-black dark:text-lime-100 underline' : 'text-gray-400'} cursor-pointer`}>
                  Latest
                </p>
              </span>
            </div>
            {projectData.map((project: ProjectAdapterProps, index) => (
              <div key={index} onClick={() => project.links}
                   className="flex flex-row border-b border-gray-300 dark:border-zinc-700 py-2 text-black/60 hover:text-black opacity-95
                   hover:opacity-100 hover:cursor-pointer transition-colors duration-300">
                <ProjectAdapter imageSrc={project.imageSrc} stack={project.stack}
                                title={project.title} links={project.links}/>
              </div>
            ))}
            <div className="flex justify-end">
              <MoreButton route={"projects"} label={'See my projects'}/>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}

export const ProjectAdapter = ({imageSrc,title,stack}: ProjectAdapterProps ) => {
  return (
    <>
      <div className="relative h-20 w-32 md:h-[250px] md:w-[375px]">
        <Image alt={"logo"} src={imageSrc} fill className="rounded-lg opacity-80 hover:opacity-100"/>
      </div>
      <div className="flex flex-col justify-center pl-4 md:pl-12 lg:pl-16 space-y-1 md:space-y-2">
        <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-500 dark:text-lime-100">
          {stack.map((tech, index) => (
            <p key={index}>{tech}</p>
          ))}
        </div>
        <h2 className="flex items-center text-sm md:text-3xl dark:text-lime-100 max-w-prose">{title}</h2>
      </div>
    </>
  )
}

export default ProjectsBlogs;