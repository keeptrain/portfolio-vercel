import { Container } from "@/components/ui";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ProjectsLoading() {
  return (
    <div className="min-h-[calc(100vh-12rem)]">
      <Container>
        <section id="projects" className="mt-10 md:mt-16">
          {/* Header & Filter Bar (Kept intact as per user request) */}
          <div className="flex items-center justify-between pb-6">
            <h1 className="font-serif text-lg text-black md:text-3xl dark:text-white">
              List of Projects
            </h1>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
          </div>

          {/* Skeleton List for ProjectList only */}
          <div className="flex flex-col gap-4 divide-y divide-gray-300 pb-6 dark:divide-zinc-700">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex w-full flex-row py-4"
              >
                {/* Thumbnail Skeleton */}
                <Skeleton className="h-20 w-32 shrink-0 rounded-lg md:h-62.5 md:w-93.75" />

                {/* Content Skeleton */}
                <div className="flex flex-1 flex-col justify-center space-y-2 pl-4 md:space-y-3 md:pl-12 lg:pl-16">
                  {/* Tech stack badges skeleton */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-16 rounded-md" />
                    <Skeleton className="h-4 w-20 rounded-md" />
                    <Skeleton className="h-4 w-14 rounded-md" />
                  </div>

                  {/* Title Skeleton */}
                  <Skeleton className="h-6 w-3/4 rounded-md md:h-9 md:w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
