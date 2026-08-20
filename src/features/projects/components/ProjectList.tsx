"use client";

import { Project } from "../data/projects";
import ProjectAdapter from "./ProjectAdapter";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <>
      <div className="flex flex-col gap-4 divide-y divide-gray-300 pb-6 dark:divide-zinc-700">
        {projects.map((project, index) => (
          <ProjectAdapter key={project.slug || index} project={project} />
        ))}
      </div>
    </>
  );
}
