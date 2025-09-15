import {useRef} from "react";

type DataItem = {
  title: string;
  desc: string;
}

const data: DataItem[] = [
  {
    title: 'Clean Code',
    desc: 'Write clean, maintainable, and efficient code following best practices and coding standards'
  },
  {
    title: 'Collaboration',
    desc: 'Work closely with cross-functional teams including designers, product managers, and other developers'
  },
  {
    title: 'Continuous Learning',
    desc: 'Stay updated with the latest industry trends, technologies, and best practices to continuously improve skills'
  },
  {
    title: 'Problem Solving',
    desc: 'Approach challenges with a problem-solving mindset, finding innovative solutions to complex issues'
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
        className="
          mt-6 pb-4
          flex gap-4
          overflow-x-auto scrollbar-hide
          cursor-grab
          touch-pan-x select-none
        "
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="
              relative flex-none w-80 md:w-1/4 lg:w-126 h-50
              border border-gray-400 dark:border-chartreuse rounded-2xl p-6  overflow-hidden
            "
          >
            <h3 className="text-lg font-semibold mb-2 text-black dark:text-chartreuse">{item.title}</h3>
            <p className="text-black dark:text-white">{item.desc}</p>
            <h2 className="absolute -bottom-3 text-6xl text-black/10 dark:text-chartreuse/50">0{index + 1}</h2>
          </div>
        ))}
      </div>


    </>
  );
}

export default HowIWork