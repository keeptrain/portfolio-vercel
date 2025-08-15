'use client';

import React, {useEffect, useRef, useState} from 'react';

interface Props {
  onItemClick: (index: number) => void;
}

type Item = { role: string; year: string; meta: string };

const items: Item[] = [
  {role: 'Laravel Developer', year: 'Current', meta: 'Freelance · Full time'},
  {role: 'Laravel Developer', year: '2025', meta: 'On site · Full time'},
  {role: 'Laravel Developer', year: '2024', meta: 'Hybrid · Full time'},
  {role: 'Android Developer', year: '2022', meta: 'Online · Full time'},
];

export default function ExperienceTimeline({onItemClick}: Props) {
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
      <div ref={scrollRef} className="
        max-h-64 sm:max-h-80
        overflow-y-auto
        scroll-smooth
        scrollbar-hide">

        {/* Garis vertikal — selalu sepanjang konten */}
        <div aria-hidden
             className="absolute top-0 bottom-0 left-2 sm:left-2 w-px bg-gray-300/70 dark:bg-white/10"/>

        <ul className="space-y-0 sm:space-y-6">
          {items.map((item, idx) => (
            <li
              key={idx}
              onClick={() => onItemClick(idx)}
              className="relative pl-10 sm:pl-14 overflow-visible">
              <span
                className="
                  mt-5
                  absolute top-2 left-2 sm:left-2 -translate-x-1/2
                  h-3.5 w-3.5 rounded-full
                  bg-black dark:bg-white
                  ring-4 ring-white dark:ring-gray-950
                "
              />
              {/* Konten */}
              <h3 className="pt-5 text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                {item.role}
              </h3>
              <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                {item.year} — {item.meta}
              </p>
            </li>
          ))}
        </ul>


        {/* Bottom fadder */}
        <div
          className={`pointer-events-none sticky bottom-0 h-32 -mb-10 z-10
            ${atBottom ? 'opacity-0' : 'opacity-100'}
            transition-opacity duration-200
            bg-gradient-to-t from-white to-transparent dark:from-gray-950`}/>
      </div>
    </div>
  );
}
