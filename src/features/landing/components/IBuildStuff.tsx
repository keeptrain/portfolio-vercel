"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import FilterLatestButton from "./button/FilterLatestButton";
import { useTranslations } from "@/i18n/TranslationContext";
import { Locale } from "@/i18n/locales";
import ProjectAdapter from "@/features/projects/components/ProjectAdapter";

type ProjectItem = {
  links: string;
  imageSrc: string;
  stack: string[];
  title: string;
};

const projectData: ProjectItem[] = [
  {
    links: "/projects/jakreq",
    imageSrc: "/images/projects/jakreq-thumb.jpg",
    stack: ["Laravel", "Livewire"],
    title: "JakReq — Request Management System",
  },
  {
    links: "/projects/cullinarix",
    imageSrc: "/images/projects/cullinarix-thumb.jpg",
    stack: ["Android", "Kotlin", "XML"],
    title: "Cullinarix — Food Discovery App",
  },
];

interface IBuildStuffProps {
  locale: Locale;
}

const IBuildStuff = ({ locale }: IBuildStuffProps) => {
  const { t } = useTranslations();

  return (
    <section id="projects-blogs" className="py-16 sm:py-20 md:py-24 lg:py-32">
      <Container>
        <div className="w-full space-y-4 sm:space-y-6 md:space-y-8">
          <h1 className="font-medium-ex text-2xl leading-tight text-black sm:text-3xl md:text-4xl dark:text-white">
            {t("projects.title")}
            <br />
            {t("projects.subtitle")}
          </h1>
          <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between">
            <p className="text-sm text-black sm:text-base md:text-2xl dark:text-white/80">
              {t("projects.description")}
            </p>
            <FilterLatestButton />
          </div>
          <div className="divide-y divide-gray-300 dark:divide-zinc-700">
            {projectData.map((project: ProjectItem, index) => (
              <div
                key={index}
                className="flex flex-row py-3 text-black/60 opacity-95 transition-colors duration-300 hover:text-black hover:opacity-100 sm:py-4"
              >
                <ProjectAdapter
                  imageSrc={project.imageSrc}
                  stack={project.stack}
                  title={project.title}
                  links={project.links}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link
              href={`/${locale}/projects`}
              className="font-medium-ex rounded-full bg-white px-5 py-2 text-sm shadow-sm sm:text-base md:px-8 md:py-3 md:text-lg dark:bg-zinc-900 dark:text-white"
            >
              {t("projects.viewMore")}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default IBuildStuff;
