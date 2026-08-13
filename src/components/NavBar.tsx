"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Bars3BottomRight, XMark } from "@/components/icons/HeroIcons";
import { useTranslations } from "@/i18n/TranslationContext";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

const CENTER_SECTIONS = ["about", "projects-blogs"];

type HeaderPhase = "top" | "floating" | "hidden" | "peek";

export default function NavBar({ locale = "en" }: { locale?: string }) {
  const { t } = useTranslations();
  const pathname = usePathname();
  const isRootRoute = pathname === `/${locale}` || pathname === "/";
  const isMobile = useIsMobile();

  const items = useMemo(
    () => [
      { href: `/${locale}/#projects`, label: t("nav.myResume") },
      { href: `/${locale}/#blogs`, label: t("nav.blogs") },
      { href: `/${locale}/#contact`, label: t("nav.contact") },
    ],
    [locale, t],
  );

  const [headerPhase, setHeaderPhase] = useState<HeaderPhase>("top");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const lastScrollYRef = useRef(0);
  const headerPhaseRef = useRef<HeaderPhase>(headerPhase);
  const scrollDownFromTopRef = useRef(0);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    headerPhaseRef.current = headerPhase;
  }, [headerPhase]);

  useEffect(() => {
    const threshold = 10;
    const deadzone = 4;
    const hideAfter = 60;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollYRef.current;
      const phase = headerPhaseRef.current;

      if (y <= threshold) {
        if (phase !== "top") setHeaderPhase("top");
        scrollDownFromTopRef.current = 0;
        lastScrollYRef.current = y;
        return;
      }

      if (delta > deadzone) {
        if (phase === "top") {
          setHeaderPhase("floating");
          scrollDownFromTopRef.current = 0;
        } else if (phase === "floating") {
          scrollDownFromTopRef.current += delta;
          if (scrollDownFromTopRef.current >= hideAfter) {
            setHeaderPhase("hidden");
            setIsMenuOpen(false);
          }
        } else if (phase === "peek") {
          setHeaderPhase("hidden");
          setIsMenuOpen(false);
        }
      } else if (delta < -deadzone) {
        scrollDownFromTopRef.current = 0;
        if (phase === "hidden" || phase === "floating") setHeaderPhase("peek");
      }

      lastScrollYRef.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isRootRoute) return;

    const observed: { el: HTMLElement; observer: IntersectionObserver }[] = [];

    CENTER_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-25% 0px -55% 0px" },
      );
      observer.observe(el);
      observed.push({ el, observer });
    });

    const onTop = () => {
      if (window.scrollY < 100) setActiveSection("");
    };
    window.addEventListener("scroll", onTop, { passive: true });

    return () => {
      observed.forEach(({ el, observer }) => observer.unobserve(el));
      window.removeEventListener("scroll", onTop);
    };
  }, [isRootRoute]);

  useEffect(() => {
    const html = document.documentElement;
    if (isMobile && isMenuOpen) html.style.overflow = "hidden";
    else html.style.overflow = "";
    return () => {
      html.style.overflow = "";
    };
  }, [isMobile, isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
    document.documentElement.style.overflow = "";
  }, [isMobile]);

  useEffect(() => {
    if (isMobile || !isMenuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!dropRef.current?.contains(t) && !btnRef.current?.contains(t)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [isMobile, isMenuOpen]);

  const toggleMenu = useCallback(() => setIsMenuOpen((v) => !v), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const isFloating = headerPhase !== "top";

  const headerClassName = useMemo(
    () => buildHeaderClass(headerPhase),
    [headerPhase],
  );

  const getLinkClass = useCallback(
    (id: string) => computeLinkClass(id, activeSection),
    [activeSection],
  );

  return (
    <>
      <header className={headerClassName}>
        <Container className="flex h-12 items-center justify-between md:h-16">
          <HeaderLogo locale={locale} isRootRoute={isRootRoute} />

          {isRootRoute && (
            <DesktopNavLinks
              locale={locale}
              getLinkClass={getLinkClass}
              t={t}
            />
          )}

          <div className="flex items-center gap-2">
            <div className="relative">
              <MenuToggleButton
                ref={btnRef}
                isOpen={isMenuOpen}
                onClick={toggleMenu}
              />

              <DesktopDropdown
                ref={dropRef}
                isOpen={!isMobile && isMenuOpen}
                items={items}
                locale={locale}
                onClose={closeMenu}
              />
            </div>
          </div>
        </Container>
      </header>

      <MobileOverlay
        isOpen={isMobile && isMenuOpen}
        isFloating={isFloating}
        items={items}
        locale={locale}
        onClose={closeMenu}
      />
    </>
  );
}

function buildHeaderClass(phase: HeaderPhase): string {
  return cn(
    "fixed inset-x-0 top-0 z-50",
    "bg-white/30 backdrop-blur-md dark:bg-zinc-950/30",
    "header-transition",
    phase === "hidden" && "-translate-y-full",
    phase === "top" ? "translate-y-0" : "translate-y-[15px]",
    phase !== "top" &&
      "mx-4 rounded-4xl shadow-sm shadow-black/5 md:mx-12 lg:mx-28 dark:shadow-none",
  );
}

function computeLinkClass(id: string, active: string): string {
  const base = "text-sm font-medium transition-colors duration-200";
  if (active === id)
    return cn(base, "text-black dark:text-white font-semibold");
  if (active !== "" && active !== id)
    return cn(
      base,
      "text-zinc-300 dark:text-zinc-600 hover:text-black dark:hover:text-white",
    );
  return cn(
    base,
    "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white",
  );
}

function HeaderLogo({
  locale,
  isRootRoute,
}: {
  locale: string;
  isRootRoute: boolean;
}) {
  if (!isRootRoute) {
    return (
      <span className="font-medium-ex flex items-center gap-4 text-lg">
        <Link href={`/${locale}`}>
          <span className="text-gray-400 hover:text-black">..</span>
        </Link>
        <span className="text-black dark:text-white">/ Projects</span>
      </span>
    );
  }

  return (
    <div className="relative hidden h-6 w-12 md:block md:h-10 md:w-96"></div>
  );
}

function DesktopNavLinks({
  locale,
  getLinkClass,
  t,
}: {
  locale: string;
  getLinkClass: (id: string) => string;
  t: (key: string) => string;
}) {
  return (
    <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
      <Link href={`/${locale}/#about`} className={getLinkClass("about")}>
        {t("nav.about")}
      </Link>
      <Link
        href={`/${locale}/#projects-blogs`}
        className={getLinkClass("projects-blogs")}
      >
        {t("nav.myProjects")}
      </Link>
    </div>
  );
}

const MenuToggleButton = React.forwardRef<
  HTMLButtonElement,
  { isOpen: boolean; onClick: () => void }
>(function MenuToggleButton({ isOpen, onClick }, ref) {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={cn(
        "p-2 text-gray-800 dark:text-gray-200",
        "focus:ring-2 focus:ring-blue-500 focus:outline-none",
      )}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="menu"
    >
      {isOpen ? (
        <XMark color="text-black dark:text-white" />
      ) : (
        <Bars3BottomRight color="text-black dark:text-white" />
      )}
    </button>
  );
});

const DesktopDropdown = React.forwardRef<
  HTMLDivElement,
  {
    isOpen: boolean;
    items: Array<{ href: string; label: string }>;
    locale: string;
    onClose: () => void;
  }
>(function DesktopDropdown({ isOpen, items, locale, onClose }, ref) {
  return (
    <div
      id="menu"
      ref={ref}
      className={cn(
        "dark:border-chartreuse/25 absolute top-0 right-0 z-50 w-72 origin-top-right border border-gray-200 bg-white transition-all duration-200 dark:bg-black",
        isOpen
          ? "scale-100 opacity-100"
          : "pointer-events-none scale-95 opacity-0",
      )}
    >
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className={cn(
            "p-2 text-gray-800 dark:text-gray-200",
            "focus:ring-2 focus:ring-blue-500 focus:outline-none",
          )}
          aria-label="Close menu"
        >
          <XMark color="text-black dark:text-white" />
        </button>
      </div>
      <ul className="p-10 text-xl text-gray-700 dark:text-gray-200">
        {items.map((it) => (
          <li key={it.href} className="hover:text-purple-500">
            <Link href={it.href} className="block p-4" onClick={onClose}>
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});

function MobileOverlay({
  isOpen,
  isFloating,
  items,
  locale,
  onClose,
}: {
  isOpen: boolean;
  isFloating: boolean;
  items: Array<{ href: string; label: string }>;
  locale: string;
  onClose: () => void;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-200 md:hidden",
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
    >
      <div className="absolute inset-0 bg-white dark:bg-gray-900" />

      <Container
        className={cn(
          "relative z-10 flex h-12 items-center justify-end transition-all duration-200 md:h-16",
          isFloating && "mx-4 md:mx-12 lg:mx-28",
        )}
      >
        <button
          onClick={onClose}
          className={cn(
            "flex items-center justify-center rounded-lg p-3 text-gray-800 dark:text-gray-200",
            "focus:ring-2 focus:ring-blue-500 focus:outline-none",
          )}
          aria-label="Close menu"
        >
          <XMark color="text-black dark:text-white" />
        </button>
      </Container>

      <nav className="relative z-10 flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            onClick={onClose}
            className="rounded-lg px-4 py-3 text-2xl font-bold text-gray-900 hover:text-sky-600 dark:text-white dark:hover:text-sky-300"
          >
            {it.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
