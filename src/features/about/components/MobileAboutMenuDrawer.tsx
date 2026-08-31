"use client";

import { useState } from "react";
import { ChevronRight, MenuIcon } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import AboutSideTab, { TabIcon, TabLink, TabText } from "./AboutSideTab";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import ListLanguagesMobileMenus from "./details/ListLanguagesMobileMenus";
import { TOC } from "../data";

export default function MobileAboutMenuDrawer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="sticky top-0 z-10 ml-4 w-fit pt-4 md:ml-6 md:hidden">
          <Button variant="outline" size="sm">
            Menu
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="p-6">
        <DrawerHeader className="shrink-0 px-0 pb-4 text-left">
          <DrawerTitle>About Sections</DrawerTitle>
        </DrawerHeader>
        <div className="min-h-0 flex-1 overflow-y-hidden">
          <AboutSideTab onItemClick={() => setOpen(false)} />
          {pathname === "/en/about/techstack/languages" && (
            <div className="py-4">
              <OnThisPageTab />
              <div className="max-h-100 overflow-y-auto">
                <ListLanguagesMobileMenus items={TOC} />
              </div>
            </div>
          )}
        </div>
        {pathname === "/en/about/techstack/languages" && (
          <DrawerFooter className="-p-6">
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}

function OnThisPageTab() {
  return (
    <TabLink
      href={"#on-this-page"}
      isActive={true}
      onItemClick={() => console.log("On this page clicked")}
    >
      <TabIcon Icon={MenuIcon} isActive={true} />
      <TabText title={"On this page"} isActive={true} />
    </TabLink>
  );
}
