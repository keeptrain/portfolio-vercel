"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const Projects = () => {
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      title: t("projects.ecommerce.title"),
      description: t("projects.ecommerce.description"),
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      github: "https://github.com",
      demo: "https://demo.com",
      image: "🛒",
    },
    {
      id: 2,
      title: t("projects.taskmanager.title"),
      description: t("projects.taskmanager.description"),
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      github: "https://github.com",
      demo: "https://demo.com",
      image: "📋",
    },
    {
      id: 3,
      title: t("projects.weather.title"),
      description: t("projects.weather.description"),
      technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Tailwind CSS"],
      github: "https://github.com",
      demo: "https://demo.com",
      image: "🌤️",
    },
  ];

  return (
    <section
      id="projects"
      className="min-h-screen bg-gray-50 py-20 dark:bg-gray-800"
    >
      <div className="container-max section-padding">
        <h2 className="mb-16 text-center text-3xl font-bold text-gray-900 sm:text-4xl dark:text-gray-100">
          {t("projects.title")}
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="card group overflow-hidden rounded-xl shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="flex h-48 items-center justify-center bg-linear-to-br from-primary-100 to-primary-200 text-6xl dark:from-primary-900/20 dark:to-primary-800/20">
                {project.image}
              </div>

              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">
                  {project.title}
                </h3>

                <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Link
                    href={project.github}
                    className="flex items-center gap-2 text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    {t("projects.code")}
                  </Link>

                  <Link
                    href={project.demo}
                    className="flex items-center gap-2 text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    {t("projects.demo")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
