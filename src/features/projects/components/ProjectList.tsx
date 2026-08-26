"use client";

import { useState } from "react";
import { Project } from "../data/projects";
import ProjectAdapter from "./ProjectAdapter";
import ProjectDetailDrawer from "./ProjectDetailDrawer";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectProject = (project: Project) => {
    if (project.links) {
      if (project.links.startsWith("https")) {
        window.open(project.links, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = project.links;
      }
      return;
    }
    setSelectedProject(project);
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-4 divide-y divide-gray-300 pb-6 dark:divide-zinc-700">
        {projects.map((project, index) => (
          <ProjectAdapter
            key={project.slug || index}
            project={project}
            onClick={() => handleSelectProject(project)}
          />
        ))}
      </div>

      {/* Single Controlled Drawer Instance */}
      <ProjectDetailDrawer
        project={selectedProject}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
