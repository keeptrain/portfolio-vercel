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
      <div ref={scrollRef}>
        {/* Garis vertikal — selalu sepanjang konten */}
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-0 w-px bg-gray-200 dark:bg-white/10"
        />

        <ul className="space-y-4">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="relative">
              {/* Dot */}
              <span
                className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3
                rounded-full bg-black/50 dark:bg-white"/>

              {/* Content */}
              <div className="px-12">
                <h3 className="text-lg font-semibold cursor-pointer hover:underline"
                    onClick={onItemClick(idx)}>
                  {item.role}
                </h3>
                <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  {item.year} — {item.meta}
                </p>
              </div>
            </li>
          ))}
        </ul>
        {/*<div className="">*/}
        {/*  <span*/}
        {/*    className="text-sm font-mono uppercase text-sky-500 tracking-tighter">*/}
        {/*    Experience*/}
        {/*  </span>*/}
        {/*  <div className="mt-4 space-y-3">*/}
        {/*    <div className="flex items-baseline space-x-3">*/}
        {/*      <div className="w-2 h-2 bg-sky-500 rounded-full"></div>*/}
        {/*      <div className="flex flex-col">*/}
        {/*        <span className="text-sm text-gray-700">Frontend Developer</span>*/}
        {/*        <span className="text-sm text-gray-700">Current - Freelance . Full time</span>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*    <div className="flex items-baseline space-x-3">*/}
        {/*      <div className="w-2 h-2 bg-sky-500 rounded-full"></div>*/}
        {/*      <div className="flex flex-col">*/}
        {/*        <span className="text-sm text-gray-700">Frontend Developer</span>*/}
        {/*        <span className="text-sm text-gray-700">Company A (2023-2024)</span>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="mt-4 space-y-3">*/}
        {/*    <div className="flex items-baseline space-x-3">*/}
        {/*      <div className="w-2 h-2 bg-sky-500 rounded-full"></div>*/}
        {/*      <div className="flex flex-col">*/}
        {/*        <span className="text-sm text-gray-700">Frontend Developer</span>*/}
        {/*        <span className="text-sm text-gray-700">Current - Freelance . Full time</span>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*    <div className="flex items-baseline space-x-3">*/}
        {/*      <div className="w-2 h-2 bg-sky-500 rounded-full"></div>*/}
        {/*      <div className="flex flex-col">*/}
        {/*        <span className="text-sm text-gray-700">Frontend Developer</span>*/}
        {/*        <span className="text-sm text-gray-700">Company A (2023-2024)</span>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  Read more*/}

        {/*</div>*/}
      </div>
    </div>
  );
}
