"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Copy, Check, ArrowUpRight } from "lucide-react";

export default function SectionSocialCopy() {
  const [copied, setCopied] = useState(false);
  const email = "gilang.developer@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  return (
    <section id="social-copy" className="my-16 md:my-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 shadow-lg dark:border-zinc-800/80">
          {/* Background Image */}
          <Image
            src="/pexels-harrison-candlin-2441454.jpg"
            alt="Scenic background"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Overlay Mask for readability */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Foreground Content */}
          <div className="relative z-10 flex flex-col items-center justify-between p-8 text-center sm:p-12 md:p-16 lg:flex-row lg:text-left">
            {/* Heading & Tagline */}
            <div className="space-y-3 lg:max-w-md">
              <span className="inline-block rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-md">
                Get In Touch
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                Let's build something great.
              </h2>
              <p className="text-sm leading-relaxed text-zinc-200 sm:text-base">
                Got a question, collaboration idea, or just want to say hello?
                Drop me a message anytime.
              </p>
            </div>

            {/* Actions: Primary Email Copy + Social Links */}
            <div className="mt-8 flex w-full max-w-md flex-col space-y-4 lg:mt-0 lg:w-auto">
              {/* Primary Email Card with Copy Button */}
              <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-md backdrop-blur-md sm:flex-row dark:bg-black/20">
                <div className="text-center sm:text-left">
                  <span className="block text-[11px] font-medium tracking-wider text-zinc-300 uppercase">
                    Primary Email
                  </span>
                  <span className="font-mono text-sm font-semibold text-white sm:text-base">
                    {email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-zinc-900 shadow-sm transition-all duration-200 hover:bg-zinc-100 hover:shadow-md active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="size-4 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-4 text-zinc-600" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

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
