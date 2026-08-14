"use client";

import { useState } from "react";
import { Project } from "../data/projects";
import ProjectAdapter from "./ProjectAdapter";
import ProjectDetailDrawer from "./ProjectDetailDrawer";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-4 divide-y divide-gray-300 dark:divide-zinc-700">
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
