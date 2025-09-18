import {useRef} from "react";

type DataItem = {
  title: string;
  desc: string;
}

const data: DataItem[] = [
  {
    title: 'Plan',
    desc: 'Before writing any code, I take the time to fully understand the problem or feature requirements.'
  },
  {
    title: 'Develop',
    desc: 'I focus on writing clean, readable code and practice an iterative approach.'
  },
  {
    title: 'Validate',
    desc: 'Once my code is written, I perform thorough self-testing to verify that it functions as expected and meets all requirements.'
  },
  {
    title: 'Collaborate',
    desc: 'I believe in the power of teamwork. I submit my work for code review, viewing feedback as an invaluable opportunity for growth.'
  },
]

const HowIWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;

    // capture pointer supaya move/up tetap ke elemen ini
    (e.target as Element).setPointerCapture?.(e.pointerId);

    isDown.current = true;
    el.classList.add('drag-active'); // optional feedback
    startX.current = e.clientX;
    startScrollLeft.current = el.scrollLeft;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el || !isDown.current) return;

    e.preventDefault(); // cegah seleksi teks saat drag
    const dx = e.clientX - startX.current;
    const speed = 1.5; // sesuaikan
    el.scrollLeft = startScrollLeft.current - dx * speed;
  };

  const endDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    isDown.current = false;
    el?.classList.remove('drag-active');
    if (e) (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="mt-6 pb-4 grid grid-cols-1 md:flex gap-4
        md:cursor-grab md:touch-pan-x md:select-none md:overflow-x-auto scrollbar-hide"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="relative flex-none w-full h-full md:w-1/2 md:h-60 lg:w-126
            border border-gray-400 dark:border-white/30 rounded-2xl p-4 md:p-6"
          >
            <h3 className="text-md md:text-2xl font-medium mb-2 text-black dark:text-white">{item.title}</h3>
            <p className="text-xs md:text-lg font-light text-black dark:text-white/80 mb-6">{item.desc}</p>
            <h2 className="absolute -bottom-2 md:-bottom-2 text-4xl md:text-6xl text-black/10 dark:text-white/15">0{index + 1}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default HowIWork