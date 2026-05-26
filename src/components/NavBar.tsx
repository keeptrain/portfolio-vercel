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
import { Bars3BottomRight, XMark } from "@/components/icons/HeroIcons";
import ThemeSwitcher from "@/components/ui/button/ThemeSwitcher";
import { IndonesiaFlag } from "@/components/icons/FlagIcons";
import OpenToWorkBadge from "@/components/_/OpenToWorkBadge";

const ITEMS = [
  { href: "/", label: "Home" },
  { href: "#about", label: "My Skills" },
  { href: "#projects", label: "My Resume" },
  { href: "#contact", label: "Contact" },
];

export default function NavBar() {
  const pathname = usePathname();
  const isRootRoute = pathname === "/";

  /*
    Header phases:
    - top:      di paling atas, full width
    - floating: baru keluar dari top, posisi turun, shape floating (no border)
    - hidden:   scroll ke bawah cukup jauh, sembunyi
    - peek:     scroll ke atas, muncul kembali dengan shape floating
   */
  const [headerPhase, setHeaderPhase] = useState<
    "top" | "floating" | "hidden" | "peek"
  >("top");

  // Header scroll logic refs
  const lastScrollYRef = useRef(0);
  const headerPhaseRef = useRef(headerPhase);
  const scrollDownFromTopRef = useRef(0);

  // Menu states
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Refs for outside click detection
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  // Sync ref with latest state so scroll handler never closes over stale value
  useEffect(() => {
    headerPhaseRef.current = headerPhase;
  }, [headerPhase]);

  // Listen to scroll
  useEffect(() => {
    const threshold = 10; // px: masih dianggap "top"
    const deadzone = 4; // px: abaikan jitter kecil
    const hideAfter = 60; // px: scroll ke bawah sejauh ini dari top baru hide

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollYRef.current;
      const currentPhase = headerPhaseRef.current;

      if (y <= threshold) {
        if (currentPhase !== "top") {
          setHeaderPhase("top");
        }
        scrollDownFromTopRef.current = 0;
        lastScrollYRef.current = y;
        return;
      }

      if (delta > deadzone) {
        // Scroll ke bawah
        if (currentPhase === "top") {
          setHeaderPhase("floating");
          scrollDownFromTopRef.current = 0;
        } else if (currentPhase === "floating") {
          scrollDownFromTopRef.current += delta;
          if (scrollDownFromTopRef.current >= hideAfter) {
            setHeaderPhase("hidden");
            setOpenDesktopMenu(false);
          }
        } else if (currentPhase === "peek") {
          setHeaderPhase("hidden");
          setOpenDesktopMenu(false);
        }
        // kalau sudah hidden, biarkan tetap hidden
      } else if (delta < -deadzone) {
        // Scroll ke atas
        scrollDownFromTopRef.current = 0;
        if (currentPhase === "hidden" || currentPhase === "floating") {
          setHeaderPhase("peek");
        }
      }

      lastScrollYRef.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock/unlock scroll when mobile menu open/close
  useEffect(() => {
    const html = document.documentElement;
    if (openMobileMenu) html.style.overflow = "hidden";
    else html.style.overflow = "";
    return () => {
      html.style.overflow = "";
    };
  }, [openMobileMenu]);

  // Listen to viewport width changes
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const apply = () => {
      const d = mql.matches;
      setIsDesktop(d);

      if (d) {
        // Enter desktop mode -> mobile overlay must be closed & unlock
        setOpenMobileMenu(false);
        document.documentElement.style.overflow = "";
      } else {
        // Enter mobile mode -> desktop dropdown must be closed
        setOpenDesktopMenu(false);
      }
    };
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  // Outside click behavior for desktop dropdown
  useEffect(() => {
    if (!openDesktopMenu) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!dropRef.current?.contains(t) && !btnRef.current?.contains(t)) {
        setOpenDesktopMenu(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [openDesktopMenu]);

  const animClass = useMemo(
    () =>
      headerPhase === "hidden"
        ? "animate-[headerHideFromPeek_260ms_ease-out_forwards]"
        : "",
    [headerPhase],
  );

  // Posisi translate: semua non-top state sama (tidak berubah-ubah)
  const translateClass = useMemo(() => {
    if (headerPhase === "top") return "translate-y-0";
    return "translate-y-[15px]";
  }, [headerPhase]);

  // Shape floating (mx + rounded) diterapkan sejak keluar dari top
  // Tanpa border yang mencolok, hanya shape dan subtle shadow
  const capsuleClass = useMemo(() => {
    if (headerPhase === "top") return "";
    return "mx-4 rounded-4xl shadow-sm shadow-black/5 md:mx-12 lg:mx-28 dark:shadow-none";
  }, [headerPhase]);

  const headerClassName = useMemo(
    () =>
      [
        "fixed top-0 right-0 z-11 md:inset-x-0",
        "bg-white/30 backdrop-blur-md dark:bg-zinc-950/30",
        "header-transition",
        animClass,
        translateClass,
        capsuleClass,
      ]
        .filter(Boolean)
        .join(" "),
    [animClass, translateClass, capsuleClass],
  );

  // Padding selalu sama — tidak berubah saat phase berubah
  const innerPadding = "px-4 md:px-12";

  // X Icon only if the active menu in the current viewport is open
  const isOpenHere = isDesktop ? openDesktopMenu : openMobileMenu;

  const toggleMenu = useCallback(() => {
    if (isDesktop) setOpenDesktopMenu((v) => !v);
    else setOpenMobileMenu((v) => !v);
  }, [isDesktop]);

  const closeDesktopMenu = useCallback(() => setOpenDesktopMenu(false), []);
  const closeMobileMenu = useCallback(() => setOpenMobileMenu(false), []);

  return (
    <>
      {/* HEADER */}
      <header className={headerClassName}>
        <div
          className={`mx-auto flex h-12 max-w-7xl items-center justify-between md:h-16 ${innerPadding}`}
        >
          {isRootRoute ? (
            <div className="relative hidden h-6 w-12 md:block md:h-10 md:w-100">
              <OpenToWorkBadge />
            </div>
          ) : (
            <span className="font-medium-ex flex items-center gap-4 text-lg">
              <Link href="/">
                <span className="text-gray-400 hover:text-black">..</span>
              </Link>
              <span className="text-black dark:text-white">/ Projects</span>
            </span>
          )}

          {/* Right button */}
          <div className="relative">
            <button
              ref={btnRef}
              onClick={toggleMenu}
              className="p-2 text-gray-800 dark:text-gray-200"
              aria-label={isOpenHere ? "Close menu" : "Open menu"}
              aria-expanded={isOpenHere}
              aria-controls="menu"
            >
              {isOpenHere ? (
                <XMark color="text-black dark:text-white" />
              ) : (
                <Bars3BottomRight color="text-black dark:text-white" />
              )}
            </button>

            {/* Desktop Dropdown on the right */}
            <div
              id="menu"
              ref={dropRef}
              className={`dark:border-chartreuse/25 absolute top-0 right-0 z-[60] w-72 origin-top-right border border-gray-200 bg-white transition-all duration-200 dark:bg-black ${openDesktopMenu ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
            >
              <div className="flex justify-end">
                <button
                  onClick={closeDesktopMenu}
                  className="p-2 text-gray-800 dark:text-gray-200"
                  aria-label="Close menu"
                >
                  <XMark color="text-black dark:text-white" />
                </button>
              </div>
              <ul className="p-10 text-xl text-gray-700 dark:text-gray-200">
                {ITEMS.map((it) => (
                  <li key={it.href} className="hover:text-purple-500">
                    <Link
                      href={it.href}
                      className="block p-4"
                      onClick={closeDesktopMenu}
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
                <div className="mt-4 flex items-center justify-between">
                  <ThemeSwitcher />
                  <IndonesiaFlag color="" />
                </div>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* OVERLAY MOBILE (FULLSCREEN) */}
      <div
        className={`fixed inset-0 z-[55] transition-opacity duration-200 md:hidden ${openMobileMenu ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        {/* background */}
        <div className="absolute inset-0 bg-white dark:bg-gray-900" />

        {/* bar atas di overlay (posisi sama) */}
        <div className="relative z-10 mx-auto flex h-16 max-w-7xl items-center justify-end px-4 md:px-12">
          <button
            onClick={closeMobileMenu}
            className="mt-14 px-6 text-gray-800 dark:text-gray-200"
            aria-label="Close menu"
          >
            <XMark color="text-black dark:text-white" />
          </button>
        </div>

        {/* isi overlay */}
        <nav className="relative z-10 flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8">
          {ITEMS.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={closeMobileMenu}
              className="text-2xl font-bold text-gray-900 hover:text-sky-600 dark:text-white dark:hover:text-sky-300"
            >
              {it.label}
            </Link>
          ))}
          <IndonesiaFlag color="" />
          <div className="mt-4 flex items-center justify-between gap-12">
            <ThemeSwitcher />
          </div>
        </nav>
      </div>
    </>
  );
}
