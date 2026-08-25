"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AboutNav } from "./AboutNav";
import { Section } from "../types";
import { ABOUT_SECTIONS } from "../constants";

export default function ListAboutMobileDrawer() {
  const segment = useSelectedLayoutSegment();
  const activeTab: Section =
    segment && (Section as readonly string[]).includes(segment)
      ? (segment as Section)
      : "experiences";
  const currentTab = ABOUT_SECTIONS[activeTab];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="sticky top-0 z-10 flex w-full p-6 font-medium backdrop-blur-md md:hidden">
          <span className="flex items-center gap-1.5">
            {currentTab?.title || "Select Section"}{" "}
            <ChevronRight className="size-4 text-zinc-500" />
          </span>
        </button>
      </DrawerTrigger>
      <DrawerContent className="p-6">
        <DrawerHeader className="px-0 pb-4 text-left">
          <DrawerTitle>About Sections</DrawerTitle>
        </DrawerHeader>
        <AboutNav
          iconSizeClassName="size-4"
          textSizeClassName="text-sm font-medium"
        />
      </DrawerContent>
    </Drawer>
  );
}
