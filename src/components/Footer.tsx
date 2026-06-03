"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "@/components/icons/HeroIcons";
import { ArrowUpRight } from "@/components/icons/HandyArrows";
import ThemeSwitcher from "@/components/ui/button/ThemeSwitcher";
import LanguageSwitcher from "@/components/ui/button/LanguageSwitcher";
import { useTranslations } from "@/i18n/TranslationContext";
import { Container } from "@/components/ui/Container";

const Footer = () => {
  const { t } = useTranslations();

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    timeZone: "Asia/Jakarta",
  };

  const jakartaTime = new Intl.DateTimeFormat("id-ID", options).format(
    new Date(),
  );

  return (
    <footer id="footer" className="dark:bg-black">
      <Container>
        {/*Contact Section*/}
        <div className="flex justify-center py-12 sm:py-16">
          <div className="shadow-blue-old/30 dark:shadow-blue-old flex w-full flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-sm sm:flex-row sm:gap-8 sm:px-10 sm:py-8 md:w-1/2 md:gap-12 md:px-12 md:py-10 md:shadow-md dark:border-none dark:bg-black">
            <h2 className="text-blue-grey dark:shadow-blue-old text-center font-serif text-sm break-words sm:text-left sm:text-base md:text-xl dark:text-blue-300/80">
              {t("footer.contactCta")}
            </h2>
            <Link
              href={"/contact"}
              className="font-medium-ex text-blue-old flex items-center justify-center rounded-lg px-4 py-3 text-center text-sm tracking-tight sm:justify-start sm:px-0 sm:py-0 sm:text-base md:text-xl dark:text-blue-300/80"
            >
              <span className="hidden underline hover:decoration-wavy sm:flex">
                {t("footer.sendMessage")}
              </span>
              <ArrowUpRight color={"text-blue-old"} />
            </Link>
          </div>
        </div>
      </Container>

      {/* Footer Section */}
      <div className="rounded-4xl bg-white p-2 shadow-[0_-1px_3px_rgba(0,0,0,0.08)] sm:p-6 md:p-12 dark:bg-black dark:shadow-[0_-1px_3px_rgba(255,255,255,0.08)]">
        <Container>
          <div className="flex flex-col rounded-4xl border border-gray-200 shadow-lg shadow-zinc-200/50 sm:flex-row sm:justify-between dark:border-none dark:shadow-zinc-700">
            <div className="flex flex-1 flex-col px-4 py-6 sm:px-6 md:px-8">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-baseline sm:gap-0">
                <div className="font-serif text-sm tracking-widest text-black sm:text-base md:text-lg dark:text-white">
                  <span className="gap-2 text-black dark:text-white">
                    &copy; 2026 <br />
                  </span>
                  {t("footer.basedIn")}
                  <span className="flex items-start gap-2">{jakartaTime}</span>
                </div>

                <div className="flex gap-4 sm:gap-8">
                  <a
                    href={"#hero"}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 font-serif text-sm text-zinc-700 hover:text-black sm:px-0 sm:py-0 sm:text-base md:text-lg dark:text-white dark:hover:text-white"
                  >
                    <span className="hidden sm:flex">
                      {t("footer.backToTop")}
                    </span>
                    <ArrowUp color={""} />
                  </a>
                </div>
              </div>
              <div className="relative flex h-10 items-center justify-center">
                {/* Left border */}
                <div className="grow border-b border-black/10 dark:border-white/30" />

                {/* Center signature */}
                <div className="relative mx-4 h-1/2 w-14 sm:h-full sm:w-20 md:w-24">
                  <Image
                    alt={"logo"}
                    src={"/signature.svg"}
                    fill
                    sizes="(max-width: 640px) 56px, (max-width: 768px) 80px, 96px"
                    className="pointer-none opacity-30 select-none dark:opacity-100 dark:brightness-0 dark:invert dark:filter"
                  />
                </div>

                {/* Right border */}
                <div className="grow border-b border-black/10 dark:border-white/30" />
              </div>
              <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
                <div className="flex font-serif tracking-widest text-black dark:text-white">
                  <SocialLink />
                </div>
                <div className="flex items-center justify-start text-xs font-light tracking-widest text-zinc-500 sm:justify-end dark:text-white">
                  <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
                    <LanguageSwitcher />
                    <div className="hidden h-6 w-px bg-black/10 sm:block dark:bg-white/30" />
                    <ThemeSwitcher />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

const SocialLink = () => {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/keeptrain",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/ggilang",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex gap-2 pt-2">
      {socialLinks.map((link, i) => (
        <a
          key={i}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
          aria-label={`Follow me on ${link.name}`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default Footer;
