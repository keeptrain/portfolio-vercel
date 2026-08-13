"use client";

import Image from "next/image";
import { Project } from "../data/projects";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

interface ProjectDetailDrawerProps {
  project: Project;
  open: boolean;
  onClose: () => void;
}

export default function ProjectDetailDrawer({
  project,
  open,
  onClose,
}: ProjectDetailDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DrawerContent className="sm:mx-auto sm:max-w-3xl">
        <div className="w-full overflow-y-auto p-4 sm:p-6">
          <DrawerHeader className="px-0">
            <DrawerTitle className="text-xl font-bold sm:text-2xl md:text-3xl">
              {project.title}
            </DrawerTitle>
          </DrawerHeader>

          {/* Content Layout */}
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
            {/* Metadata Column */}
            <div className="space-y-4 md:col-span-5">
              <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800">
                <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  CATEGORY
                </span>
                <p className="mt-1 text-sm font-semibold sm:text-base">
                  {project.category}
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800">
                <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  YEAR
                </span>
                <p className="mt-1 text-sm font-semibold sm:text-base">
                  {project.year}
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800">
                <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  STACK
                </span>
                <p className="mt-1 text-sm leading-relaxed font-semibold sm:text-base">
                  {project.stack.join(" / ")}
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800">
                <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  CLIENT
                </span>
                <p className="mt-1 text-sm font-semibold sm:text-base">
                  {project.client || "—"}
                </p>
                {project.isNda && (
                  <p className="mt-1 text-xs text-zinc-400 italic">
                    *) Access limited due to NDA
                  </p>
                )}
              </div>
            </div>

            {/* Logo / Banner */}
            <div className="flex items-center justify-center md:col-span-7">
              <div className="relative flex h-48 w-full items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-100/80 p-6 sm:h-64 md:h-72 dark:border-zinc-800 dark:bg-zinc-900/60">
                <Image
                  src={project.logoSrc || project.imageSrc}
                  alt={`${project.title} logo`}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-contain p-4"
                />
              </div>
            </div>

            {/* Description */}
            <div className="pt-2 pb-4 md:col-span-12">
              <DrawerDescription className="text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-300">
                {project.description}
              </DrawerDescription>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
