"use client";

import SectionContainer from "@/components/_/SectionContainer";
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
    <section id="projects-blogs" className="mt-12 md:mt-0 md:min-h-screen">
      <SectionContainer>
        <div className="flex items-center md:h-screen">
          <div className="w-full space-y-2 md:space-y-4">
            <h1 className="font-medium-ex text-2xl leading-tight text-black md:text-3xl dark:text-white">
              {t("projects.title")}
              <br />
              {t("projects.subtitle")}
            </h1>
            <div className="flex flex-col space-y-2 md:flex-row md:justify-between">
              <p className="text-sm text-black md:text-2xl dark:text-white/80">
                {t("projects.description")}
              </p>
              <FilterLatestButton />
            </div>
            {projectData.map((project: ProjectItem, index) => (
              <div
                key={index}
                className="flex flex-row border-b border-gray-300 py-2 text-black/60 opacity-95 transition-colors duration-300 hover:text-black hover:opacity-100 dark:border-zinc-700"
              >
                <ProjectAdapter
                  imageSrc={project.imageSrc}
                  stack={project.stack}
                  title={project.title}
                  links={project.links}
                />
              </div>
            ))}
            <div className="flex justify-center">
              <Link
                href={`/${locale}/projects`}
                className="font-medium-ex rounded-4xl bg-white px-4 py-2 text-sm shadow-sm md:px-8 md:py-3 md:text-lg dark:bg-zinc-900 dark:text-white"
              >
                {t("projects.viewMore")}
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default IBuildStuff;