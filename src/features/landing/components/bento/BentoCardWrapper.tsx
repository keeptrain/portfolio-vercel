import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface BentoCardStyleOptions {
  enableHover?: boolean;
  tagCard?: {
    enabled?: boolean;
    label?: string;
    action?: React.ReactNode;
  };
}

interface BentoCardWrapperProps {
  children: React.ReactNode;
  className?: string;
  style?: BentoCardStyleOptions;
}

interface BentoCardHeaderProps {
  label?: string;
  action?: React.ReactNode;
}

export default function BentoCardWrapper({
  children,
  className = "",
  style = {},
}: BentoCardWrapperProps) {
  const { enableHover = false, tagCard } = style;

  const hoverStyles = enableHover
    ? "transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:hover:border-zinc-700/80"
    : "";

  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-md md:p-6 dark:border-zinc-800/80 dark:bg-zinc-900/70",
        hoverStyles,
        className
      )}
    >
      {tagCard?.enabled && (
        <BentoCardHeader label={tagCard.label} action={tagCard.action} />
      )}
      {children}
    </Card>
  );
}

export function BentoCardHeader({ label, action }: BentoCardHeaderProps) {
  if (!label && !action) return null;

  return (
    <div className="mb-3 flex items-center justify-between">
      {label ? (
        <div className="relative inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold tracking-wide text-gray-900 dark:text-white">
          {/* Hand-drawn SVG frame wrapping the text */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-gray-900/90 dark:text-white/90"
            viewBox="0 0 120 40"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 12,20 C 10,7 28,4 60,5 C 92,4 110,7 108,20 C 110,33 92,36 60,35 C 28,36 10,33 12,20 Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span className="relative z-10">{label}</span>
        </div>
      ) : (
        <div />
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
