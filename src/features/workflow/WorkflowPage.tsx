"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import WorkflowSideTab from "./components/WorkflowSideTab";
import { workflowSections } from "./data";
import { useWorkflowScrollspy } from "./hooks/useWorkflowScrollspy";
import { ChevronRight } from "lucide-react";

export default function WorkflowPage() {
  const { activeId, scrollToSection } = useWorkflowScrollspy();

  return (
    <main className="mt-10 md:mt-16 md:mb-12">
      {/* Page Header */}
      <Container className="md:mb-12">
        <h1 className="font-serif text-lg md:text-3xl">Explain My Workflow</h1>
        <p className="mt-2 text-sm text-zinc-500 md:text-base dark:text-zinc-400">
          A detailed 5-step engineering process for building fast, reliable, and
          scalable software.
        </p>
      </Container>

      {/* Mobile Menu Trigger & Drawer */}
      <ListWorkflowMobileDrawer
        activeId={activeId}
        scrollToSection={scrollToSection}
      />

      <Container>
        <div className="grid grid-cols-1 pb-16 md:grid-cols-12 md:pb-24">
          {/* Desktop Left Side: Sticky Vertical Tabs */}
          <WorkflowSideTab
            activeId={activeId}
            scrollToSection={scrollToSection}
            className="sticky top-24 hidden self-start md:col-span-4 md:flex lg:col-span-3"
          />

          {/* Right Side: Stacked Scrollable Workflow Content Sections */}
          <div className="space-y-16 md:col-span-8 lg:col-span-9">
            {workflowSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 space-y-6 border-b border-zinc-200/60 pb-12 last:border-0 dark:border-zinc-800/60"
              >
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold md:text-2xl">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-base leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>

                <div className="space-y-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 dark:border-zinc-800/80 dark:bg-zinc-900/50">
                  <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                    {section.bulletTitle}
                  </h3>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
                    {section.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}

function ListWorkflowMobileDrawer({
  activeId,
  scrollToSection,
}: {
  activeId: string;
  scrollToSection: (id: string) => void;
}) {
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
        <WorkflowSideTab
          activeId={activeId}
          scrollToSection={scrollToSection}
          onItemClick={() => setOpen(false)}
        />
      </DrawerContent>
    </Drawer>
  );
}
