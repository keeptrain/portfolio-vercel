"use client";

import { useState, useEffect, Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { ChevronRight } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useSearchParams } from "next/navigation";
import { AboutNav } from "./components/AboutNav";
import { Section } from "./types";
import { ABOUT_SECTIONS } from "./constants";

function AboutContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as Section | null;

  const [activeTab, setActiveTab] = useState<Section>("experiences");

  useEffect(() => {
    // 1. Prioritize query parameter ?tab=
    if (tabParam && (Section as readonly string[]).includes(tabParam)) {
      setActiveTab(tabParam);
      return;
    }

    // 2. Fallback check for hash #
    const handleHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.replace("#", "");
      if (hash && (Section as readonly string[]).includes(hash)) {
        setActiveTab(hash as Section);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [tabParam]);

  const selectTab = (id: Section) => {
    setActiveTab(id);
    window.history.replaceState(null, "", `?tab=${id}`);
  };

  const ActiveComponent = ABOUT_SECTIONS[activeTab]?.component;

  return (
    <main className="mt-10 md:mt-16 md:mb-12">
      {/* Page Header */}
      <Container className="md:mb-12">
        <h1 className="font-serif text-lg md:text-3xl">About Me</h1>
      </Container>

      {/* Mobile Drawer Trigger */}
      <ListAboutMobileDrawer activeTab={activeTab} selectTab={selectTab} />

      <Container>
        <div className="grid grid-cols-1 pb-16 md:grid-cols-12 md:pb-24">
          {/* Desktop Left Side: Navigation Tabs */}
          <AboutNav
            activeTab={activeTab}
            selectTab={selectTab}
            className="sticky top-24 hidden self-start md:col-span-4 md:flex lg:col-span-3"
          />

          {/* Right Side: Tab-Switching Content */}
          <div className="min-h-125 md:col-span-8 lg:col-span-9">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>
      </Container>
    </main>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="min-h-125" />}>
      <AboutContent />
    </Suspense>
  );
}

function ListAboutMobileDrawer({
  activeTab,
  selectTab,
}: {
  activeTab: Section;
  selectTab: (id: Section) => void;
}) {
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
          activeTab={activeTab}
          selectTab={selectTab}
          iconSizeClassName="size-4"
          textSizeClassName="text-sm font-medium"
        />
      </DrawerContent>
    </Drawer>
  );
}
