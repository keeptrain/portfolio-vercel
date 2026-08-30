import { Building2, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EXPERIENCES } from "../data";

export default function ExperiencesSection() {
  return (
    <section className="animate-in space-y-6 duration-200 fade-in-50">
      <h2 className="text-xl tracking-tight sm:text-2xl">Experiences</h2>

      <div className="space-y-8">
        {EXPERIENCES.map((exp, idx) => (
          <Card key={idx}>
            <CardHeader className="space-y-3">
              <CardTitle>{exp.role}</CardTitle>
              <CardDescription className="flex items-center gap-1.5 text-sm font-semibold">
                <Building2 className="size-4 shrink-0" />
                <span>{exp.company}</span>
              </CardDescription>
              <div className="flex items-center gap-3">
                <div className="ml-1 h-6 w-px shrink-0 bg-zinc-200 dark:bg-zinc-800" />
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide">
                  <Calendar className="size-3.5 shrink-0" />
                  {exp.period}
                </span>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-semibold tracking-wide dark:bg-zinc-800">
                  {exp.type}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <CardDescription>{exp.description}</CardDescription>

              <ul className="list-disc space-y-2.5 pl-5 text-sm leading-relaxed">
                {exp.highlights.map((item, itemIdx) => (
                  <li key={itemIdx} className="pl-1 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border px-2.5 py-1 text-[11px] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
