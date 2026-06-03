"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import ProjectAdapter from "@/components/shared/ProjectAdapter";
import FilterLatestButton from "./button/FilterLatestButton";
import { useTranslations } from "@/i18n/TranslationContext";
import { Locale } from "@/i18n/locales";

type ProjectItem = {
  links: string;
  imageSrc: string;
  stack: string[];
  title: string;
};

const projectData: ProjectItem[] = [
  {
    links: "",
    imageSrc: "/test-png.jpg",
    stack: ["Laravel,", "Livewire"],
    title: "JakReq - A apps for bla bla bla bla",
  },
  {
    links: "",
    imageSrc: "/test-png.jpg",
    stack: ["Android,", "Kotlin,", "XML"],
    title: "Cullinarix - A apps for bla bla bla bla",
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
          <h1 className="font-medium-ex text-2xl sm:text-3xl leading-tight text-black md:text-4xl dark:text-white">
            {t("projects.title")}
            <br />
            {t("projects.subtitle")}
          </h1>
          <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between">
            <p className="text-sm sm:text-base text-black md:text-2xl dark:text-white/80">
              {t("projects.description")}
            </p>
            <FilterLatestButton />
          </div>
          <div className="divide-y divide-gray-300 dark:divide-zinc-700">
            {projectData.map((project: ProjectItem, index) => (
              <div
                key={index}
                className="flex flex-row py-3 sm:py-4 text-black/60 opacity-95 transition-colors duration-300 hover:text-black hover:opacity-100"
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
              className="font-medium-ex rounded-full bg-white px-5 py-2 text-sm sm:text-base shadow-sm md:px-8 md:py-3 md:text-lg dark:bg-zinc-900 dark:text-white"
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
