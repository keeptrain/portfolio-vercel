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
import AboutSideTab from "./AboutSideTab";
import { Button } from "@/components/ui/button";

export default function ListAboutMobileDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="sticky top-0 z-10 ml-6 w-fit pt-4 md:hidden">
          <Button variant="outline" size="sm">
            Menu
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="p-6 md:hidden">
        <DrawerHeader className="px-0 pb-4 text-left">
          <DrawerTitle>About Sections</DrawerTitle>
        </DrawerHeader>
        <AboutSideTab onItemClick={() => setOpen(false)} />
      </DrawerContent>
    </Drawer>
  );
}
