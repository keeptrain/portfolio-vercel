"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import WorkflowSideTab from "./WorkflowSideTab";

export default function ListWorkflowMobileDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="sticky top-0 z-10 flex w-full p-6 font-medium backdrop-blur-md md:hidden">
          <span className="flex items-center gap-1.5">
            Menu <ChevronRight className="size-4 text-zinc-500" />
          </span>
        </button>
      </DrawerTrigger>
      <DrawerContent className="p-6">
        <DrawerHeader className="px-0 pb-4 text-left">
          <DrawerTitle>Workflow Steps</DrawerTitle>
        </DrawerHeader>
        <WorkflowSideTab onItemClick={() => setOpen(false)} />
      </DrawerContent>
    </Drawer>
  );
}
