import { Suspense } from "react";
import { Container } from "@/components/ui";
import ProjectFilterBar from "@/features/projects/components/ProjectFilterBar";
import ProjectList from "@/features/projects/components/ProjectList";
import ProjectListSkeleton from "@/features/projects/components/ProjectListSkeleton";
import { projectsData } from "@/features/projects/data/projects";

export default async function ProjectsPage() {
  return (
    <div className="min-h-[calc(100vh-12rem)]">
      <Container>
        <section id="projects" className="mt-10 md:mt-16">
          {/* Header & Filter Bar - Instant Server Rendering */}
          <div className="flex items-center justify-between pb-6">
            <h1 className="font-serif text-lg text-black md:text-3xl dark:text-white">
              List of Projects
            </h1>
            <ProjectFilterBar />
          </div>

          {/* Isolated Suspense Boundary for ProjectList only */}
          <Suspense fallback={<ProjectListSkeleton />}>
            <ProjectListAsync />
          </Suspense>
        </section>
      </Container>
    </div>
  );
}

// Async component to stream ProjectList
async function ProjectListAsync() {
  // Simulasi async data loading (misal dari Database/API)
  await new Promise((resolve) => setTimeout(resolve, 400));

  return <ProjectList projects={projectsData} />;
}
