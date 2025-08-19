'use client';

import React, {useEffect, useRef, useState} from 'react';

interface Props {
  onItemClick: (index: number) => () => void;
}

type Item = { role: string; year: string; meta: string };

const items: Item[] = [
  {role: 'Laravel Developer', year: 'Current', meta: 'Freelance · Full time'},
  {role: 'Laravel Developer', year: '2025', meta: 'On site · Full time'},
  {role: 'Laravel Developer', year: '2024', meta: 'Hybrid · Full time'},
  {role: 'View more', year: '', meta: ''},
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
    <div className="relative">
      <div ref={scrollRef} className="scroll-smooth scrollbar-hide">

        {/* Garis vertikal — selalu sepanjang konten */}
        <div aria-hidden
             className="absolute top-0 bottom-0 left-0 w-px bg-gray-300/70 dark:bg-white/10"/>

        <ul className="space-y-6">
          {items.map((item, idx) => (
            <li
              key={idx}
              onClick={onItemClick(idx)}
              className="relative space-x-12 cursor-pointer hover:bg-zinc-50"
            >
              {/* Dot */}
              <span
                className="absolute -translate-x-1/2
                left-0 sm:left-0 mt-2 h-3 w-3 rounded-full bg-black dark:bg-white"
              />
              {/* Konten */}
              <div>
                <h3 className="text-lg font-semibold">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  {item.year} — {item.meta}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Bottom fadder */}
        <div
          className={`pointer-events-none sticky -bottom-1 h-16 lg:h-32 -mb-10 z-10
            ${atBottom ? 'opacity-0' : 'opacity-100'}
            transition-opacity duration-200
            bg-gradient-to-t from-white to-transparent dark:from-gray-950`}/>
      </div>
    </div>
  );
}
