'use client';

import {useEffect, useRef, useState} from 'react';

type Item = { role: string; year: string; meta: string };

const items: Item[] = [
  {role: 'Product Lead at Apple', year: '2024', meta: 'On site · Full time'},
  {role: 'Product Designer at Apple', year: '2023', meta: 'Hybrid · Part time'},
  {role: 'Ui–Ux Designer at Apple', year: '2022', meta: 'Remote · Full time'},
  {role: 'Visual Designer at Apple', year: '2021', meta: 'Remote · Contract'},
];

export default function ExperienceTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const end = el.scrollHeight - el.clientHeight - 1;
      setAtBottom(el.scrollTop >= end);
    };
    onScroll();
    el.addEventListener('scroll', onScroll, {passive: true});
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative dark:bg-gray-950">
      {/* SCROLL AREA (≈ terlihat 3 item) */}
      <div
        ref={scrollRef}
        className="
        sm:max-h-96
        overflow-y-auto
        scroll-smooth
      "
      >
        {/* Wrapper konten agar garis mengikuti tinggi list */}
        <div className="relative">  {/* pb-10 agar item terakhir tak ketutup fader */}
          {/* Garis vertikal — selalu sepanjang konten */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-2 sm:left-2 w-px bg-gray-300/70 dark:bg-white/10"
          />

          <ul className="space-y-0 sm:space-y-2">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="relative pl-10 sm:pl-12 overflow-visible"
              >
                {/* Dot — dipusatkan tepat di atas garis menggunakan translate-x-1/2 */}
                <span
                  className="
                  mt-10
                  absolute top-2 left-2 sm:left-2 -translate-x-1/2
                  h-3.5 w-3.5 rounded-full
                  bg-black dark:bg-white
                  ring-4 ring-white dark:ring-gray-950
                "
                />
                {/* Konten */}
                <h3 className="pt-10 text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  {item.year} — {item.meta}
                </p>
              </li>
            ))}
          </ul>

          {/* FADER BAWAH (sticky di dalam scroll area) */}
          <div
            className={`pointer-events-none sticky bottom-0 h-16 -mb-10 z-10
            ${atBottom ? 'opacity-0' : 'opacity-100'}
            transition-opacity duration-200
            bg-gradient-to-t from-white to-transparent dark:from-gray-950
          `}
          />
        </div>
      </div>

      {/* Glow lembut tepi bawah kartu */}
      <div
        className="pointer-events-none absolute inset-x-4 bottom-2 h-6 rounded-full bg-gradient-to-b from-transparent to-black/5 dark:to-white/5 blur-md"/>
    </div>
  );

}
