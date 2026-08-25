import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionNavProps {
  children: ReactNode;
  className?: string;
}

export default function SectionNav({ children, className }: SectionNavProps) {
  return (
    <aside className={cn("sticky self-start", className)}>
      <nav className="border-l pl-0">
        <ul className="flex flex-col space-y-4">{children}</ul>
      </nav>
    </aside>
  );
}

interface SectionNavItemProps {
  children: ReactNode;
}

export function SectionNavItem({ children }: SectionNavItemProps) {
  return <li>{children}</li>;
}
