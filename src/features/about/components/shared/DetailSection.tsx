export function DetailSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-3 py-6">
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {children ??
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Notes untuk bagian ini — ganti dengan catatan pribadi tentang scope/closure."}
      </p>
    </section>
  );
}
