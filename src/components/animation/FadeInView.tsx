"use client";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface FadeInViewProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function FadeInView({ children, className, delay = 0, direction = "up" }: FadeInViewProps) {
  const { ref, isInView } = useInView({ rootMargin: "-100px", once: true });

  const transforms = {
    up: "translateY(30px)",
    down: "translateY(-30px)",
    left: "translateX(30px)",
    right: "translateX(-30px)",
  };

  return (
    <div
      ref={ref}
      className={cn("transition-all duration-500 ease-out", className)}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translate(0)" : transforms[direction],
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}