'use client';

import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import Image from "next/image";
import {Bars3BottomRight, XMark} from "@/components/icons/heroicons";

export default function Header() {
  /*
    Header phases:
    - top: di paling atas, full
    - afterTop: scroll sedikit, berubah ke mx-12
    - peek: scroll ke bawah, peek dulu
    - hidden: scroll ke bawah terus, hidden
   */
  const [headerPhase, setHeaderPhase] = useState<'top' | 'afterTop' | 'peek' | 'hidden'>('top');
  const [isAtTop, setIsAtTop] = useState(true);

  // Header scroll logic refs
  const lastScrollYRef = useRef(0);
  const afterTop = useRef<NodeJS.Timeout | null>(null);
  const hideStepRef = useRef<NodeJS.Timeout | null>(null);
  const idleRef = useRef<NodeJS.Timeout | null>(null);

  // Menu states
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Refs for outside click detection
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  // Listen to scroll if scroll down 10 hidden if none scroll showing
  useEffect(() => {
    const threshold = 10;
    const AFTER_TOP_DELAY = 1000;
    const HIDE_STEP_DELAY = 200;

    const onScroll = () => {
      const y = window.scrollY;
      const down = y > lastScrollYRef.current;

      setIsAtTop(y <= threshold);

      // reset idle (kalau berhenti scroll, balikin header ke "top")
      if (idleRef.current) clearTimeout(idleRef.current);
      idleRef.current = setTimeout(() => setHeaderPhase(
          window.scrollY <= threshold ? 'top' : 'peek')
        , 500);

      if (y <= threshold) {
        if (afterTop.current) clearTimeout(afterTop.current);
        if (hideStepRef.current) clearTimeout(hideStepRef.current);
        setHeaderPhase('top');
        lastScrollYRef.current = y;
        return;
      }

      // Exit top area
      if (lastScrollYRef.current <= threshold && y > threshold) {
        if (afterTop.current) clearTimeout(afterTop.current);
        if (hideStepRef.current) clearTimeout(hideStepRef.current);
        setHeaderPhase('afterTop')

        afterTop.current = setTimeout(() => {
          setHeaderPhase('peek');
        }, AFTER_TOP_DELAY);
        lastScrollYRef.current = y;
        return
      }

      if (down) {
        // scroll ke bawah → peek dulu lalu hidden
        if (headerPhase === 'peek') {
          if (hideStepRef.current) clearTimeout(hideStepRef.current);
          hideStepRef.current = setTimeout(() => {
            setHeaderPhase('hidden');
          }, HIDE_STEP_DELAY);
          setOpenDesktopMenu(false);
        }
      } else {
        // scroll ke atas → munculkan
        if (afterTop.current) clearTimeout(afterTop.current);
        if (hideStepRef.current) clearTimeout(hideStepRef.current);
        setHeaderPhase('peek');
      }

      lastScrollYRef.current = y;
    };

    window.addEventListener('scroll', onScroll, {passive: true});
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (afterTop.current) clearTimeout(afterTop.current);
      if (hideStepRef.current) clearTimeout(hideStepRef.current);
      if (idleRef.current) clearTimeout(idleRef.current);
    };
  }, [headerPhase]);

  // Lock/unlock scroll when mobile menu open/close
  useEffect(() => {
    const html = document.documentElement;
    if (openMobileMenu) html.style.overflow = 'hidden';
    else html.style.overflow = '';
    return () => {
      html.style.overflow = '';
    };
  }, [openMobileMenu]);

  // Listen to viewport width changes
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const apply = () => {
      const d = mql.matches;
      setIsDesktop(d);

      if (d) {
        // Enter desktop mode -> mobile overlay must be closed & unlock
        setOpenMobileMenu(false);
        document.documentElement.style.overflow = '';
      } else {
        // Enter mobile mode -> desktop dropdown must be closed
        setOpenDesktopMenu(false);
      }
    };
    apply();
    mql.addEventListener('change', apply);
    return () => mql.removeEventListener('change', apply);
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
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [openDesktopMenu]);

  const animClass =
    headerPhase === 'hidden'
      ? 'animate-[headerHideFromPeek_260ms_ease-out_forwards]' : '';

  // X Icon only if the active menu in the current viewport is open
  const isOpenHere = isDesktop ? openDesktopMenu : openMobileMenu;

  const items = [
    {href: '/', label: 'Home'},
    {href: '#about', label: 'My Experience'},
    {href: '#projects', label: 'My Resume'},
    {href: '#contact', label: 'Contact'},
  ];

  return (
    <>
      {/* HEADER */}
      <header
        className={[
          'fixed inset-x-0 top-0 z-11',
          'bg-white/90 dark:bg-black backdrop-blur-sm',
          'header-transition',
          animClass,
          headerPhase === 'hidden' ? '' : headerPhase === 'peek' ? 'translate-y-[15px]' :
            headerPhase === 'afterTop' ? 'translate-y-[15px]' : !isAtTop ? 'translate-y-[15px]' : 'translate-y-0',
          // If not on the top , always using mx-1
          !isAtTop && 'mx-4 md:mx-12 rounded-md  border-r-1 border-black/10 '
        ].join(' ')}
      >
        <div className={`mx-auto max-w-7xl h-16 flex items-center justify-between
        ${isAtTop ? 'px-4 md:px-12' : 'px-4'}
        `}>
          {/* Left Logo */}
          <Link href="/">
            <Image alt="logo" src="/logo-border.png" width={60} height={10}
                   className="dark:invert dark:brightness-0"/>
          </Link>

          {/* Right button */}
          <div className="relative">
            <button
              ref={btnRef}
              onClick={() => {
                if (isDesktop) setOpenDesktopMenu(v => !v);
                else setOpenMobileMenu(v => !v);
              }}
              className="p-2 text-gray-800 dark:text-gray-200"
              aria-label={isOpenHere ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpenHere}
              aria-controls="menu"
            >
              {isOpenHere ? (
                <XMark color={"text-black dark:text-white"}/>
              ) : (
                <Bars3BottomRight color={"text-black dark:text-white"}/>
              )}
            </button>

            {/* Dropdown kecil DESKTOP (absolute di kanan) */}
            <div
              id="menu"
              ref={dropRef}
              className={`absolute right-0 top-0 z-[60]
              w-72 border border-gray-200 dark:border-chartreuse/25 bg-white dark:bg-black
              transition-all duration-200 origin-top-right
              ${openDesktopMenu ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-95'}
            `}
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setOpenDesktopMenu(false)}
                  className="p-2 text-gray-800 dark:text-gray-200"
                  aria-label="Close menu"
                >
                  <XMark color={"text-black dark:text-white"}/>
                </button>
              </div>
              <ul className="p-10 text-xl text-gray-700 dark:text-gray-200">
                {items.map(it => (
                  <li key={it.href} className="hover:text-purple-500">
                    <Link
                      href={it.href}
                      className="block p-4"
                      onClick={() => setOpenDesktopMenu(false)}
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* OVERLAY MOBILE (FULLSCREEN) */}
      <div
        className={`md:hidden fixed inset-0 z-[55] transition-opacity duration-200
          ${openMobileMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        {/* background */}
        <div className="absolute inset-0 bg-white dark:bg-gray-900"/>

        {/* bar atas di overlay (posisi sama) */}
        <div className="relative z-10 mx-auto max-w-7xl h-16 px-4 md:px-12 flex items-center justify-end">
          <button
            onClick={() => setOpenMobileMenu(false)}
            className="px-6 mt-14 text-gray-800 dark:text-gray-200"
            aria-label="Close menu"
          >
            <XMark color={"text-black dark:text-white"}/>
          </button>
        </div>

        {/* isi overlay */}
        <nav className="relative z-10 h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-8">
          {items.map(it => (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => setOpenMobileMenu(false)}
              className="text-2xl font-bold text-gray-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-300"
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
