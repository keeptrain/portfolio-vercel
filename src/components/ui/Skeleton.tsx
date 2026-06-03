import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded bg-gray-200 dark:bg-zinc-800", className)} />
  );
}
