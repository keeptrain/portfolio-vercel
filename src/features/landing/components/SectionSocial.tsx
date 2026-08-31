import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import CopyEmailButton from "./section-social/CopyEmailButton";
import { getT } from "@/i18n/server";

export default function SectionSocial() {
  const t = getT();
  const email = "gilang.developer@gmail.com";

  return (
    <section id="social" className="my-16 md:my-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl shadow-lg">
          {/* Background Image */}
          <Image
            src="/assets/pexels-harrison-candlin-2441454.jpg"
            alt="Scenic background"
            fill
            sizes="100vw"
            loading="eager"
            className="object-cover object-center"
          />

          {/* Overlay Mask for readability */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Foreground Content */}
          <div className="relative z-10 flex flex-col items-center justify-between p-8 text-center sm:p-12 md:p-16 lg:flex-row lg:text-left">
            {/* Heading & Tagline */}
            <div className="space-y-3 lg:max-w-lg">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                {t("sectionSocial.heading")}
              </h2>
              <p className="text-sm leading-relaxed text-zinc-200 sm:text-base">
                {t("sectionSocial.description")}
              </p>
            </div>

            {/* Actions: Primary Email Copy + Social Links */}
            <div className="mt-8 flex w-full max-w-md flex-col space-y-4 lg:mt-0 lg:max-w-md">
              {/* Client Component: Primary Email Copy Button */}
              <CopyEmailButton email={email} />

              {/* Secondary Social Links: GitHub & LinkedIn */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="https://github.com/keeptrain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 p-3.5 text-xs font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 dark:bg-black/20"
                >
                  <GithubIcon />
                  <span>GitHub</span>
                </Link>
                <Link
                  href="https://linkedin.com/in/ggilang/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 p-3.5 text-xs font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 dark:bg-black/20"
                >
                  <span className="font-sans">in</span>
                  <span>LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function GithubIcon() {
  return (
    <svg className="size-4 fill-white" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}
