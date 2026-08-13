"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import FilterLatestButton from "./button/FilterLatestButton";
import { useTranslations } from "@/i18n/TranslationContext";
import { Locale } from "@/i18n/locales";
import ProjectList from "@/features/projects/components/ProjectList";
import { projectsData } from "@/features/projects/data/projects";

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
          <ProjectList projects={projectsData} />
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
