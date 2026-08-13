import { Container } from "@/components/ui";
import ProjectAdapter from "@/features/projects/components/ProjectAdapter";
import ProjectFilterBar from "@/features/projects/components/ProjectFilterBar";
import { projectsData } from "@/features/projects/data/projects";

export default function ProjectsPage() {
  return (
    <div className="min-h-[calc(100vh-12rem)]">
      <Container>
        <section id="projects" className="mt-10 md:mt-16">
          <div className="flex items-center justify-between pb-6">
            <h1 className="font-serif text-lg text-black md:text-3xl dark:text-white">
              List of Projects
            </h1>
            <ProjectFilterBar />
          </div>
          <div className="flex flex-col gap-4 divide-y divide-gray-300 dark:divide-zinc-700">
            {projectsData.map((project, index) => (
              <ProjectAdapter key={index} project={project} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
