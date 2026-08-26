import Image from "next/image";
import { Project } from "../data/projects";

type ProjectAdapterProps = {
  project: Project;
  onClick?: () => void;
};

export default function ProjectAdapter({
  project,
  onClick,
}: ProjectAdapterProps) {
  return (
    <div
      onClick={onClick}
      className="flex w-full cursor-pointer flex-row py-4 text-black/60 opacity-95 transition-colors duration-300 hover:text-black hover:opacity-100 dark:text-white/60 dark:hover:text-white"
    >
      <div className="relative h-20 w-32 shrink-0 md:h-62.5 md:w-93.75">
        <Image
          alt={`${project.title} thumbnail`}
          src={project.imageSrc}
          fill
          sizes="(max-width: 768px) 128px, 375px"
          loading="eager"
          className="rounded-lg object-cover opacity-80 transition-opacity duration-300 hover:opacity-100"
        />
      </div>
      <div className="flex min-w-0 flex-col justify-center space-y-1 pl-4 text-left md:space-y-2 md:pl-12 lg:pl-16">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 md:text-sm dark:text-white/80">
          {project.stack.map((tech, index) => (
            <span key={index}>{tech}</span>
          ))}
        </div>
        <span className="block text-sm font-semibold wrap-break-word md:text-3xl dark:text-white">
          {project.title}
        </span>
      </div>
    </div>
  );
}
