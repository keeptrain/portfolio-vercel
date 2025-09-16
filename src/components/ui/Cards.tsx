import React from "react";
import {Clock, HandThumbUp} from "@/components/icons/HeroIcons";

type Props = {
  overflowX?: boolean,
}

type Project = {
  title: string;
  description: string;
  tags: string[];
  link: string;
};

type Blog = {
  title: string;
  description: string;
  watch: number;
  like: number;
  readingTime: string;
  link: string;
};

const dataProjects: Project[] = [
  {
    title: "JakReq",
    description: "React web application with modern UI",
    tags: ["Laravel", "PHP"],
    link: "#",
  },
  {
    title: "RPTRA",
    description: "React web application with modern UI",
    tags: ["Laravel", "PHP"],
    link: "#",
  },
  {
    title: "Cullinarix",
    description: "React web application with modern UI",
    tags: ["Mobile", "Android", "Kotlin"],
    link: "#",
  }
]

const dataBlogs: Blog[] = [
  {
    title: "Javascript async/await",
    description: "Learn about async/await in JavaScript",
    watch: 1200,
    like: 300,
    readingTime: "5 min",
    link: "#",
  },
  {
    title: "Kotlin coroutines ",
    description: "Learn about coroutines in Kotlin",
    watch: 1200,
    like: 300,
    readingTime: "5 min",
    link: "#",
  },
  {
    title: "Cullinarix",
    description: "React web application with modern UI",
    watch: 1200,
    like: 300,
    readingTime: "5 min",
    link: "#",
  }
]

const Cards = ({overflowX}: Props) => {
  const containerClasses = overflowX
    ? 'overflow-x-auto'
    : 'overflow-y-auto';
  const flexDirection = overflowX
    ? 'flex gap-4 mb-4'
    : 'flex-row space-y-4 mr-4 h-40';
  const data = overflowX ? dataProjects : dataBlogs;

  return (
    <div className={`${containerClasses}`}>
      <div className={`${flexDirection}`}>
        {data.map((item, index) => {
          if (overflowX) {
            const project = item as Project;
            return (
              <div key={index}
                   className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[280px] border border-chartreuse/30">
                <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-lime-100 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-chartreuse/20 text-chartreuse rounded text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            )
          } else {
            const blog = item as Blog;
            return (
              <div key={index}
                   className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[280px] border border-chartreuse/30">
                <h3 className="text-lg font-bold text-chartreuse mb-2">{blog.title}</h3>
                <p className="text-sm text-lime-100 mb-3">{blog.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <HandThumbUp color={undefined}/>
                  <Clock color={undefined}/>
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default Cards