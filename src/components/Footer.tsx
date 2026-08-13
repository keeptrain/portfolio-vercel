import Image from "next/image";
import { ArrowUp } from "@/components/icons/HeroIcons";
import { Container } from "@/components/ui/Container";
import { ArrowRightLeftIcon } from "lucide-react";
import { IndonesiaFlag, USFlag } from "./icons/FlagIcons";
import Link from "next/link";
import { getT, getLocale } from "@/i18n/server";
import { getPathname } from "@/lib/server-utils";

export default function Footer() {
  const t = getT();

  const jakartaTime = new Intl.DateTimeFormat("id-ID", {
    hour: "numeric",
    minute: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date());

  return (
    <footer>
      {/* Footer Section */}
      <div className="rounded-4xl bg-white p-2 shadow-[0_-1px_3px_rgba(0,0,0,0.08)] sm:p-6 md:p-12 dark:bg-black dark:shadow-[0_-1px_3px_rgba(255,255,255,0.08)]">
        <Container>
          <div className="flex flex-col rounded-4xl border border-gray-200 shadow-lg shadow-zinc-200/50 sm:flex-row sm:justify-between dark:border-none dark:shadow-zinc-700">
            <div className="flex-1 px-4 py-6 sm:px-6 md:px-8">
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
                    href="#"
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
                <div className="flex font-serif tracking-widest text-black dark:text-white"></div>
                <div className="flex items-center justify-start text-xs font-light tracking-widest text-zinc-500 sm:justify-end dark:text-white">
                  <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
                    <LanguageSwitcher />
                    <div className="hidden h-6 w-px bg-black/10 sm:block dark:bg-white/30" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

async function LanguageSwitcher() {
  const currentLang = getLocale();
  const currentPathname = await getPathname();
  const isEn = currentLang === "en";
  const targetLocale = isEn ? "id" : "en";

  // Bentuk target pathname sub-route di Server Side 100% tanpa props
  const targetPathname = currentPathname.replace(
    `/${currentLang}`,
    `/${targetLocale}`,
  );

  return (
    <Link
      href={targetPathname}
      scroll={false}
      prefetch={true}
      className="inline-flex items-center gap-2 font-medium transition-colors hover:text-black dark:hover:text-white"
    >
      <ArrowRightLeftIcon className="size-4" />
      {isEn ? (
        <IndonesiaFlag className="size-5" />
      ) : (
        <USFlag className="size-5" />
      )}
      <span>{targetLocale.toUpperCase()}</span>
    </Link>
  );
}
