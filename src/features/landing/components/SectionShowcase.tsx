import Image from "next/image";
import Link from "next/link";
import { getLocale } from "@/i18n/server";

const leftProject = {
  title: "Cullinarix",
  image: "/images/projects/cullinarix-mockups.jpeg",
};

const rightProject = {
  title: "RPTRA Cibubur",
  image: "/images/projects/rptra-cibubur-mockups.jpeg",
};

export default function SectionShowcase() {
  const locale = getLocale();

  return (
    <section id="showcase" className="my-20 md:my-40">
      {/* Off-screen bleeding 2-Column Grid Wall */}
      <div className="relative overflow-hidden">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:items-end md:gap-20">
          {/* Left Project */}
          <div>
            <h2 className="mb-6 px-4 text-3xl font-semibold md:hidden">
              Projects I've Built.
            </h2>
            <div className="relative aspect-16/10 w-full shadow-xs md:self-end">
              <Image
                src={leftProject.image}
                alt={leftProject.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="eager"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div>
            <h2 className="mb-10 hidden text-4xl font-semibold md:block">
              Projects I've Built.
            </h2>
            {/* Right Project */}
            <div className="relative aspect-16/10 w-full shadow-xs">
              <Image
                src={rightProject.image}
                alt={rightProject.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Gradient Blur Overlay on the bottom of the grid */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-50 bg-linear-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Content & Action Button below the showcase wall */}
      <div className="relative z-10 mx-auto -mt-10 max-w-xl space-y-4 text-center">
        <p className="text-sm font-medium text-zinc-600 sm:text-base md:text-lg dark:text-zinc-400">
          For{" "}
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            performance
          </span>
          ,{" "}
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            efficiency
          </span>{" "}
          and{" "}
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            user experience
          </span>
          .
        </p>
        <div>
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-2.5 text-sm font-medium text-zinc-900 shadow-2xs transition-all hover:bg-zinc-50 hover:shadow-xs dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            Explore Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
