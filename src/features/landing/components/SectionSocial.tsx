import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowUpRight } from "lucide-react";
import CopyEmailButton from "./section-social/CopyEmailButton";

export default function SectionSocial() {
  const email = "gilang.developer@gmail.com";

  return (
    <section id="social" className="my-16 md:my-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl shadow-lg">
          {/* Background Image */}
          <Image
            src="/assets/pexels-harrison-candlin-2441454.jpg"
            alt="Scenic background"
            fill
            sizes="100vw"
            loading="eager"
            className="object-cover object-center"
          />

          {/* Overlay Mask for readability */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Foreground Content */}
          <div className="relative z-10 flex flex-col items-center justify-between p-8 text-center sm:p-12 md:p-16 lg:flex-row lg:text-left">
            {/* Heading & Tagline */}
            <div className="space-y-3 lg:max-w-lg">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                Let's build something great.
              </h2>
              <p className="text-sm leading-relaxed text-zinc-200 sm:text-base">
                Got a question, collaboration idea, or just want to say hello?
                Drop me a message anytime.
              </p>
            </div>

            {/* Actions: Primary Email Copy + Social Links */}
            <div className="mt-8 flex w-full max-w-md flex-col space-y-4 lg:mt-0 lg:max-w-md">
              {/* Client Component: Primary Email Copy Button */}
              <CopyEmailButton email={email} />

              {/* Secondary Social Links: GitHub & LinkedIn */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-white/20 bg-white/10 p-3.5 text-xs font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 dark:bg-black/20"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="size-4 text-zinc-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-white/20 bg-white/10 p-3.5 text-xs font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 dark:bg-black/20"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="size-4 text-zinc-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
