"use client";

import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { workflowSections } from "./data";

export default function WorkflowPage() {
  const [activeId, setActiveId] = useState("brainstorming");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const stickyRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const rect = stickyRef.current.getBoundingClientRect();
        setIsStuck(rect.top <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0.1,
      },
    );

    workflowSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Container>
        {/* Page Header */}
        <section id="workflow-header" className="mt-10 mb-12 md:mt-16">
          <h1 className="font-serif text-xl text-zinc-900 md:text-2xl dark:text-zinc-100">
            Explain My Workflow
          </h1>
          <p className="mt-2 text-sm text-zinc-500 md:text-base dark:text-zinc-400">
            A detailed 5-step engineering process for building fast, reliable,
            and scalable software.
          </p>
        </section>

        {/* Mobile Menu Trigger & Drawer (Dynamic bg-white when stuck at top) */}
        <ListWorkflowMobileDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          activeId={activeId}
          scrollToSection={scrollToSection}
        />

        <div className="grid grid-cols-1 gap-8 pb-16 md:grid-cols-12 md:gap-12 md:pb-24">
          {/* Desktop Left Side: Sticky Vertical Tabs */}
          <div className="sticky top-24 hidden flex-col space-y-6 self-start border-l border-zinc-200 pl-0 md:col-span-4 md:flex lg:col-span-3 dark:border-zinc-800">
            {workflowSections.map((section) => {
              const isActive = activeId === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "-ml-px flex flex-col items-start border-l-2 pl-4 text-left transition-all duration-300",
                    isActive
                      ? "border-emerald-500 text-zinc-900 dark:border-emerald-400 dark:text-zinc-100"
                      : "border-transparent text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
                  )}
                >
                  <span className="font-mono text-xs font-bold">
                    {section.number}
                  </span>
                  <span className="text-sm font-medium">{section.title}</span>
                </button>
              );
            })}
          </div>

          {/* Right Side: Stacked Scrollable Workflow Content Sections */}
          <div className="space-y-16 md:col-span-8 lg:col-span-9">
            {workflowSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 space-y-6 border-b border-zinc-200/60 pb-12 last:border-0 dark:border-zinc-800/60"
              >
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-zinc-900 md:text-3xl dark:text-zinc-100">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
                    >
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
    </div>
  );
}

function ListWorkflowMobileDrawer({
  isOpen,
  onClose,
  activeId,
  scrollToSection,
}: {
  isOpen: boolean;
  onClose: () => void;
  activeId: string;
  scrollToSection: (id: string) => void;
}) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="p-6">
        <DrawerHeader className="px-0 pb-4 text-left">
          <DrawerTitle>Workflow Steps</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col space-y-5 border-l border-zinc-200 pb-6 pl-0 dark:border-zinc-800">
          {workflowSections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => {
                  scrollToSection(section.id);
                  onClose();
                }}
                className={cn(
                  "-ml-px flex flex-col items-start border-l-2 pl-4 text-left transition-all duration-300",
                  isActive
                    ? "border-emerald-500 text-zinc-900 dark:border-emerald-400 dark:text-zinc-100"
                    : "border-transparent text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
                )}
              >
                <span className="font-mono text-xs font-bold">
                  {section.number}
                </span>
                <span className="text-sm font-medium">{section.title}</span>
              </button>
            );
          })}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
