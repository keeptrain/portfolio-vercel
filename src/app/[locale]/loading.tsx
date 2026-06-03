import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black dark:border-zinc-800 dark:border-t-white" />
      <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
    </div>
  );
}
