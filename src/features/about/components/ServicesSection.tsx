import { SERVICES } from "../data";

export default function ServicesSection() {
  return (
    <section className="animate-in space-y-6 duration-200 fade-in-50">
      <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Services</h2>

      <div className="flex flex-col gap-4">
        {SERVICES.map((service) => (
          <div
            key={service.title}
            className="space-y-2 rounded-2xl border border-zinc-200/80 p-6 dark:border-zinc-800/80"
          >
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              {service.title}
            </h3>
            <p className="text-xs leading-relaxed text-zinc-500 md:text-sm dark:text-zinc-400">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
