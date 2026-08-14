"use client";

import { Project } from "../data/projects";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface ProjectDetailDrawerProps {
  project: Project;
  open: boolean;
  onClose: () => void;
}

export default function ProjectDetailDrawer(props: ProjectDetailDrawerProps) {
  const { project, open, onClose } = props;

  return (
    <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DrawerContent className="max-h-[90vh] sm:mx-auto sm:max-w-3xl">
        <div className="overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle className="text-xl sm:text-2xl">
              {project.name || project.title}
            </DrawerTitle>
            <DrawerDescription>{project.category}</DrawerDescription>
          </DrawerHeader>

          {/* Content Layout */}
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-12">
            {/* Left Column: Metadata */}
            <div className="space-y-4 md:col-span-4">
              <Metadata title="Year" content={project.year} />
              <Metadata title="Tech Stack" content={project.stack} />
              <Metadata title="Company" content={project.client || "—"} />
              <Metadata title="Repository" content={project.links || "—"} />
            </div>

            {/* Right Column: Project Description & Case Study Sections */}
            <div className="space-y-4 md:col-span-8">
              <Description
                title="Project Overview"
                content={project.description}
              />
              <Description
                title="What I Did?"
                content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium accusamus perferendis magni error, itaque exercitationem dolore aliquid iure blanditiis illo quam facilis, porro expedita autem quo! Molestiae quod possimus animi!"
              />
              <Description
                title="The Impact"
                content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium accusamus perferendis magni error, itaque exercitationem dolore aliquid iure blanditiis illo quam facilis, porro expedita autem quo! Molestiae quod possimus animi!"
              />
              <Description
                title="Challenge"
                content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium accusamus perferendis magni error, itaque exercitationem dolore aliquid iure blanditiis illo quam facilis, porro expedita autem quo! Molestiae quod possimus animi!"
              />
              <Description
                title="What I Learned"
                content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium accusamus perferendis magni error, itaque exercitationem dolore aliquid iure blanditiis illo quam facilis, porro expedita autem quo!"
              />
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function Metadata({
  title,
  content,
  isNda = false,
}: {
  title: string;
  content: string | string[];
  isNda?: boolean;
}) {
  return (
    <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800">
      <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
        {title}
      </span>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {Array.isArray(content) ? (
          content.map((item) => (
            <span
              key={item}
              className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {item}
            </span>
          ))
        ) : (
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              {content}
            </p>
            {isNda && (
              <p className="-mt-2 text-xs text-zinc-400 italic">
                *) Access limited due to NDA
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Description({ title, content }: { title: string; content: string }) {
  return (
    <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800">
      <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
        {title}
      </span>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-300">
        {content}
      </p>
    </div>
  );
}
