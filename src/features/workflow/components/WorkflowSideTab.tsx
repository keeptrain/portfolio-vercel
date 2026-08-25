"use client";

import SectionNav, { SectionNavItem } from "@/components/shared/SectionNav";
import { workflowSections } from "../data";
import { useWorkflowScrollspy } from "../hooks/useWorkflowScrollspy";
import { cn } from "@/lib/utils";

interface WorkflowSideTabProps {
  className?: string;
  onItemClick?: () => void;
}

export default function WorkflowSideTab({
  className,
  onItemClick,
}: WorkflowSideTabProps) {
  const { activeId, scrollToSection } = useWorkflowScrollspy();

  return (
    <SectionNav className={className}>
      {workflowSections.map((section) => (
        <SectionNavItem key={section.id}>
          <WorkflowSideTabItem
            section={section}
            isActive={activeId === section.id}
            scrollToSection={scrollToSection}
            onItemClick={onItemClick}
          />
        </SectionNavItem>
      ))}
    </SectionNav>
  );
}

interface WorkflowSideTabItemProps {
  section: (typeof workflowSections)[number];
  isActive: boolean;
  scrollToSection: (id: string) => void;
  onItemClick?: () => void;
}

function WorkflowSideTabItem({
  section,
  isActive,
  scrollToSection,
  onItemClick,
}: WorkflowSideTabItemProps) {
  return (
    <a
      href={`#${section.id}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(section.id);
        onItemClick?.();
      }}
      className={cn(
        "-ml-px flex flex-col items-start border-l-2 pl-4 text-left transition-all duration-300",
        isActive
          ? "border-zinc-500 text-zinc-900 dark:border-emerald-400 dark:text-zinc-100"
          : "border-transparent text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
      )}
    >
      <span className="font-mono text-xs font-bold">{section.number}</span>
      <span className="text-sm font-medium">{section.title}</span>
    </a>
  );
}
