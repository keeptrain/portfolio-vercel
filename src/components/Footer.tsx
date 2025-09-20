"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import InputUnderline from "@/components/ui/input/InputUnderline";
import Image from "next/image";
import MoreButton from "@/components/ui/button/MoreButton";
import Link from "next/link";
import { ArrowUp } from "@/components/icons/HeroIcons";
import { ArrowUpRight } from "@/components/icons/HandyArrows";

const Footer = () => {
  const { t } = useLanguage();

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    timeZone: "Asia/Jakarta",
  };

  const jakartaTime = new Intl.DateTimeFormat("id-ID", options).format(
    new Date(),
  );

  return (
    <footer id="footer" className="dark:bg-black">
      {/*Contact Section*/}
      <div className="relative mx-4 h-50 md:mx-0 md:h-30">
        <div className="absolute top-1/2 left-1/2 flex h-30 w-full -translate-x-1/2 -translate-y-1/2 justify-between gap-12 space-y-2 rounded-2xl border border-gray-200 bg-white px-6 shadow-sm shadow-blue-old/30 md:w-1/2 md:-translate-y-[25%] md:p-12 md:shadow-md dark:border-none dark:bg-black dark:shadow-blue-old">
          <h2 className="flex items-center justify-center text-start font-serif text-sm text-blue-grey md:justify-start md:text-xl dark:text-blue-300/80 dark:shadow-blue-old">
            Got a question, or <br /> just want to say hello?
          </h2>
          <Link
            href={"/contact"}
            className="font-medium-ex flex items-center justify-center text-center text-sm tracking-tight text-blue-old md:justify-start md:text-xl dark:text-blue-300/80"
          >
            <span className="hidden underline hover:decoration-wavy md:flex">
              Send me a message!
            </span>
            <ArrowUpRight color={"text-blue-old"} />
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      <div className="rounded-4xl bg-white p-2 shadow-[0_-1px_3px_rgba(0,0,0,0.08)] md:p-12 dark:bg-black dark:shadow-[0_-1px_3px_rgba(255,255,255,0.08)]">
        <div className="mx-2 flex flex-col rounded-4xl border-1 border-gray-200 shadow-lg shadow-zinc-200/50 md:mx-14 md:flex-row md:justify-between dark:border-none dark:shadow-zinc-700">
          <div className="flex flex-1 flex-col px-6 py-6 md:px-8">
            <div className="flex items-baseline justify-between">
              <div className="font-serif text-sm tracking-widest text-black md:text-lg dark:text-white">
                <span className="gap-2 text-black dark:text-white">
                  &copy; 2025 <br />
                </span>
                Based in Jakarta,
                <span className="flex items-start gap-2">Indonesia</span>
                {jakartaTime}
              </div>

              <div className="flex gap-8">
                <a
                  href={"#hero"}
                  className="flex items-end gap-2 font-serif text-sm text-zinc-700 hover:text-black md:text-lg dark:text-white dark:hover:text-white"
                >
                  <span className="hidden md:flex">Back to Top</span>
                  <ArrowUp color={""} />
                </a>
              </div>
            </div>
            <div className="relative flex h-10 items-center justify-center">
              {/* Left border */}
              <div className="flex-grow border-b border-black/10 dark:border-white/30" />

              {/* Center signature */}
              <div className="relative mx-4 h-1/2 w-15 md:h-full md:w-24">
                <Image
                  alt={"logo"}
                  src={"/signature.svg"}
                  fill
                  className="pointer-none opacity-30 select-none dark:opacity-100 dark:brightness-0 dark:invert dark:filter"
                />
              </div>

              {/* Right border */}
              <div className="flex-grow border-b border-black/10 dark:border-white/30" />
            </div>
            <div className="grid grid-cols-2">
              <div className="flex font-serif tracking-widest text-black dark:text-white">
                <SocialLink />
              </div>
              <div className="hidden flex-col items-end justify-start text-xs font-light tracking-widest text-zinc-500 md:flex dark:text-white">
                <p>
                  Icons by
                  <a
                    href={"https://heroicons.com/"}
                    className="font-semibold text-black"
                  >
                    {" "}
                    Heroicons,
                  </a>
                  <a className="font-semibold text-black">Devicons,</a>
                  <a className="font-semibold text-black">Flagicons</a>
                </p>
                {/*<p>Design by <a className="text-black font-semibold">me</a> </p>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = () => {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/keeptrain",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/ggilang",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex gap-2 pt-2">
      {socialLinks.map((link, i) => (
        <a
          key={i}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
          aria-label={`Follow me on ${link.name}`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

const EmailInput = () => {
  const { t } = useLanguage();
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = currentDate
    .toLocaleDateString("en", { month: "short" })
    .toUpperCase();
  const year = currentDate.getFullYear();

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="col-span-1 space-y-6">
        <Image
          src="/tokyo_postal.png"
          alt="postal"
          sizes={"100vw"}
          width={200}
          height={200}
        />
        <Image
          src="/wavy.png"
          alt="postal"
          sizes={"100vw"}
          width={500}
          height={500}
          className="pointer-events-none absolute top-10 left-0 opacity-10 select-none"
        />
      </div>

      <div className="col-span-2 grid-cols-2 gap-6 lg:grid">
        <h1 className="font-medium-ex col-span-2 flex text-3xl text-blue-old">
          Send me a message!
        </h1>
        <h2 className="col-span-2 text-xl text-blue-grey">
          Got a question or proposal, or just want to say hello? Go aheads.
        </h2>
        <InputUnderline
          label="Subject"
          type="text"
          id="subject"
          placeholder="Your name - Purpose"
        />
        <InputUnderline
          label="Your Email"
          type="email"
          id="email"
          placeholder="example@domain.com"
        />
        <div className="col-span-2">
          <InputUnderline
            label="Your Message"
            type="text"
            id="message"
            placeholder="Hello, wave!"
          />
        </div>
        <div className="col-span-2">
          <MoreButton route={"contact"} label={"See my projects"} />
          <button className="group relative overflow-hidden border-2 border-dotted p-4 text-black hover:text-white">
            <span className="relative z-10">
              Send
              <span className="ml-1 inline-block">&rarr;</span>
            </span>
            <span className="absolute inset-0 -z-0 w-0 bg-blue-old transition-all duration-300 group-hover:w-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
