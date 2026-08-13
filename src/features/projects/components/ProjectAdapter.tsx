import Image from "next/image";

type ProjectAdapterProps = {
  links: string;
  imageSrc: string;
  stack: string[];
  title: string;
};

export default function ProjectAdapter({
  imageSrc,
  title,
  stack,
}: ProjectAdapterProps) {
  return (
    <>
      <div className="relative h-20 w-32 md:h-62.5 md:w-93.75">
        <Image
          alt="project thumbnail"
          src={imageSrc}
          fill
          sizes="(max-width: 768px) 128px, 375px"
          loading="lazy"
          className="rounded-lg opacity-80 hover:opacity-100"
        />
      </div>
      <div className="flex min-w-0 flex-col justify-center space-y-1 pl-4 md:space-y-2 md:pl-12 lg:pl-16">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 md:text-sm dark:text-white/80">
          {stack.map((tech, index) => (
            <p key={index}>{tech}</p>
          ))}
        </div>
        <h2 className="text-sm wrap-break-word md:text-3xl dark:text-white">
          {title}
        </h2>
      </div>
    </>
  );
}
