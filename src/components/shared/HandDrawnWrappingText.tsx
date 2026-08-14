import React from "react";
import { cn } from "@/lib/utils";

interface HandDrawnWrappingTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function HandDrawnWrappingText({
  children,
  className,
}: HandDrawnWrappingTextProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center py-1.5 text-xs font-semibold tracking-wide text-gray-900 dark:text-white",
        className,
      )}
    >
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
      <span className="relative z-10">{children}</span>
    </div>
  );
}
