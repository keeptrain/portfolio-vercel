'use client'

import React from "react";
import {useLanguage} from '@/contexts/LanguageContext'
import InputUnderline from "@/components/ui/input/InputUnderline";
import Image from "next/image";
import MoreButton from "@/components/ui/button/MoreButton";
import Link from "next/link";
import {ArrowUp} from "@/components/icons/HeroIcons";
import {ArrowUpRight} from "@/components/icons/HandyArrows";

const Footer = () => {
  const {t} = useLanguage()

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    timeZone: 'Asia/Jakarta'
  };

  const jakartaTime = new Intl.DateTimeFormat('id-ID', options).format(new Date());

  return (
    <footer id="footer" className="dark:bg-black">
      {/*Contact Section*/}
      <div className="relative h-50 md:h-30 mx-4 md:mx-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:-translate-y-[25%] w-full md:w-1/2
            border dark:border-none border-gray-200 px-6 md:p-12 flex  justify-between
            gap-12 bg-white dark:bg-black rounded-2xl h-30
            shadow-sm md:shadow-md shadow-blue-old/30 dark:shadow-blue-old space-y-2">
          <h2
            className="flex text-sm md:text-xl font-serif text-blue-grey dark:text-blue-300/80 dark:shadow-blue-old
              items-center text-start justify-center md:justify-start">
            Got a question, or <br/> just want to say hello?
          </h2>
          <Link href={"/contact"}
                className="flex text-sm md:text-xl font-medium-ex text-blue-old dark:text-blue-300/80
                items-center text-center justify-center md:justify-start tracking-tight">
            <span className="hidden md:flex hover:decoration-wavy
                  underline">Send me a message!</span>
            <ArrowUpRight color={"text-blue-old"}/>
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      <div
        className="bg-white dark:bg-black rounded-4xl p-2 md:p-12
        shadow-[0_-1px_3px_rgba(0,0,0,0.08)]
        dark:shadow-[0_-1px_3px_rgba(255,255,255,0.08)]">
        <div
          className="flex flex-col md:flex-row mx-2 md:mx-14 border-1 border-gray-200 dark:border-none
          rounded-4xl md:justify-between shadow-lg shadow-zinc-200/50 dark:shadow-zinc-700">
          <div className="flex flex-1 flex-col px-6 py-6 md:px-8">
            <div className="flex items-baseline justify-between">
              <div className="text-sm md:text-lg
              text-black dark:text-white font-serif tracking-widest">
                <span className="text-black dark:text-white gap-2">
                 &copy; 2025 <br/>
                </span>
                Based in Jakarta,
                <span className="flex gap-2 items-start">
                  Indonesia
                </span>
                {jakartaTime}
              </div>

              <div className="flex gap-8">
                <a href={"#hero"} className="flex items-end  font-serif
                gap-2 text-sm md:text-lg text-zinc-700 dark:text-white hover:text-black dark:hover:text-white">
                  <span className="hidden md:flex">Back to Top</span>
                  <ArrowUp color={""}/>
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center h-10 relative">
              {/* Left border */}
              <div className="flex-grow border-b border-black/10 dark:border-white/30"/>

              {/* Center signature */}
              <div className="relative w-15 md:w-24 h-1/2 md:h-full mx-4">
                <Image
                  alt={"logo"}
                  src={"/signature.svg"}
                  fill
                  className="opacity-30 dark:opacity-100 select-none pointer-none
                  dark:filter dark:invert dark:brightness-0"
                />
              </div>

              {/* Right border */}
              <div className="flex-grow border-b border-black/10 dark:border-white/30"/>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex text-black dark:text-white font-serif tracking-widest">
                <SocialLink/>
              </div>
              <div className="hidden md:flex flex-col justify-start items-end
              font-light text-xs text-zinc-500 dark:text-white tracking-widest">
                <p>Icons by
                  <a href={"https://heroicons.com/"} className="text-black font-semibold"> Heroicons,</a>
                  <a className="text-black font-semibold">Devicons,</a>
                  <a className="text-black font-semibold">Flagicons</a>
                </p>
                {/*<p>Design by <a className="text-black font-semibold">me</a> </p>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const SocialLink = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/keeptrain',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/ggilang',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
  ]

  return (
    <div className="flex gap-2 pt-2">
      {socialLinks.map((link, i) => (
        <a
          key={i}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          aria-label={`Follow me on ${link.name}`}>
          {link.icon}
        </a>
      ))}
    </div>
  )
}

const EmailInput = () => {
  const {t} = useLanguage()
  const currentDate = new Date()
  const day = currentDate.getDate().toString().padStart(2, '0')
  const month = currentDate.toLocaleDateString('en', {month: 'short'}).toUpperCase()
  const year = currentDate.getFullYear()

  return (
    <div className="grid lg:grid-cols-3 gap-6">
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
          className="absolute top-10 left-0 opacity-10 select-none pointer-events-none "
        />
      </div>

      <div className="col-span-2 lg:grid grid-cols-2 gap-6">
        <h1
          className="col-span-2 flex text-3xl font-medium-ex text-blue-old
          ">
          Send me a message!
        </h1>
        <h2 className="col-span-2 text-xl text-blue-grey">
          Got a question or proposal, or just want
          to say hello? Go aheads.
        </h2>
        <InputUnderline label="Subject" type="text" id="subject" placeholder="Your name - Purpose"/>
        <InputUnderline label="Your Email" type="email" id="email" placeholder="example@domain.com"/>
        <div className="col-span-2">
          <InputUnderline label="Your Message" type="text" id="message" placeholder="Hello, wave!"/>
        </div>
        <div className="col-span-2">
          <MoreButton route={"contact"} label={'See my projects'}/>
          <button className="border-2 border-dotted  p-4 relative text-black overflow-hidden group hover:text-white">
              <span className="relative z-10 ">
                Send
                <span className="inline-block ml-1">
                  &rarr;
                </span>
              </span>
            <span
              className="absolute inset-0 bg-blue-old w-0 transition-all duration-300 group-hover:w-full -z-0"/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Footer