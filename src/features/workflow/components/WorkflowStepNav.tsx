import { cn } from "@/lib/utils";
import { workflowSections } from "../data";

interface WorkflowStepNavProps {
  activeId: string;
  scrollToSection: (id: string) => void;
  onItemClick?: () => void;
  className?: string;
}

export function WorkflowStepNav({
  activeId,
  scrollToSection,
  onItemClick,
  className,
}: WorkflowStepNavProps) {
  return (
    <nav
      className={cn(
        "flex flex-col space-y-6 border-l border-zinc-200 pl-0 dark:border-zinc-800",
        className,
      )}
    >
      {workflowSections.map((section) => {
        const isActive = activeId === section.id;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => {
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
            <span className="font-mono font-bold">{section.number}</span>
            <span className="font-medium">{section.title}</span>
          </button>
        );
      })}
    </nav>
  );
}
