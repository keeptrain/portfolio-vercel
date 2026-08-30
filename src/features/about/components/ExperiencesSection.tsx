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

      <div className="relative ml-1 border-l border-zinc-200 pl-6 dark:border-zinc-800">
        <div className="space-y-8">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="relative">
              <div className="flex flex-col md:flex-row md:gap-6">
                <div>
                  {/* Dot vertical */}
                  <span className="absolute top-1.5 -left-7.25 size-2.5 rounded-full border-2 border-white bg-zinc-400 dark:border-zinc-950 dark:bg-zinc-500" />
                </div>
                <div className="space-y-4">
                  {/* Period above card */}
                  <Period exp={exp} />

                  <Card className="w-full max-w-3xl">
                    <CardHeader className="space-y-1">
                      <CardTitle>{exp.role}</CardTitle>
                      <CardDescription className="flex items-center gap-1.5 text-sm font-semibold">
                        <Building2 className="size-4 shrink-0" />
                        <span>{exp.company}</span>
                      </CardDescription>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Period({ exp }: { exp: (typeof EXPERIENCES)[number] }) {
  return (
    <div className="flex items-center gap-2">
      <Calendar className="size-3.5 shrink-0 text-zinc-400" />
      <span className="text-xs font-semibold tracking-wide">{exp.period}</span>
      <span className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-semibold tracking-wide dark:bg-zinc-800">
        {exp.type}
      </span>
    </div>
  );
}
