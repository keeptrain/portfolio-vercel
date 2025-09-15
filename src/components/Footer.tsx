'use client'

import React from "react";
import {useLanguage} from '@/contexts/LanguageContext'
import SectionContainer from "@/components/_/SectionContainer";
import InputUnderline from "@/components/ui/input/InputUnderline";
import Image from "next/image";
import MoreButton from "@/components/ui/button/MoreButton";
import Link from "next/link";
import ThemeSwitcher from "@/components/ui/button/ThemeSwitcher";

const Footer = () => {
  const {t} = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative  bg-zinc-50 dark:bg-zinc-800">
      <SectionContainer>
        <div className="h-40 md:h-30 relative">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:-translate-y-[25%] w-full md:w-1/2 border dark:border-none border-gray-200
            p-4 md:p-12 flex flex-col md:flex-row md:justify-between md:gap-12 bg-white dark:bg-zinc-800 rounded-2xl h-30 shadow-md shadow-chartreuse/50 dark:shadow-chartreuse">
            <h2
              className="flex text-lg md:text-xl font-serif text-blue-grey dark:text-lime-100 items-center text-center md:text-start justify-center md:justify-start">
              Got a question,
              <br/> or just want to say hello?
            </h2>
            <Link href={"/contact"}
                  className="flex md:text-xl font-bold text-blue-old dark:text-lime-200 hover:decoration-wavy underline items-center text-center justify-center md:justify-start">
              Send me a message!
            </Link>
          </div>
        </div>
      </SectionContainer>
      <div
        className="shadow-[0_-1px_3px_rgba(0,0,0,0.08)] dark:shadow-[0_-1px_3px_rgba(255,255,255,0.08)] rounded-4xl lg:p-12  bg-white dark:bg-zinc-800">
        <div
          className="flex border-1 border-gray-200 dark:border-none rounded-4xl lg:mx-12 p-10 md:justify-between shadow-lg shadow-zinc-200/50 dark:shadow-zinc-700">
          <div className="space-y-4">
            <Image alt={"logo"} src={"/signature.svg"} width={90} height={16}
                   className="pointer-none dark:filter dark:invert dark:brightness-0"/>
            <p className="text-sm text-gray-400 dark:text-zinc-2200">Blend of continuous learning, focused discipline,
              and <br/> the
              compounding
              power of
              small, consistent effort.</p>
            <SocialLink/>
          </div>
          <div className="flex items-baseline">
            <ThemeSwitcher/>
          </div>
        </div>
      </div>
    </footer>
  )
}

const SocialLink = () => {
  const socialLinks = [
    // {
    //   name: 'Email',
    //   href: 'https://gmail.com',
    //   icon: (
    //     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
    //             d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    //     </svg>
    //   )
    // },
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
  ]

  return (
    <div className="flex gap-2">
      {socialLinks.map((link, i) => (
        <a
          key={i}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
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
    <div className="grid lg:grid-cols-3 gap-6 w-full">
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

        {/*<h2 className="text-2xl text-blue-grey">*/}
        {/*  Got a question or proposal, or just want*/}
        {/*  <br/>*/}
        {/*  to say hello? Go ahead.*/}
        {/*</h2>*/}
      </div>

      <div className="col-span-2 lg:grid grid-cols-2 gap-6">
        <h1
          className="col-span-2 flex text-3xl font-bold text-blue-old decoration-wavy underline">
          Send me a message!
        </h1>
        <h2 className="col-span-2 text-xl text-blue-grey">
          Got a question or proposal, or just want
          to say hello? Go ahead.
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

      {/*<h3>{t('contact.title')}</h3>*/}
      {/*<label htmlFor="email" className="text-sm block text-black/50">*/}
      {/*  {t('contact.subtitle')}*/}
      {/*</label>*/}
      {/*<div className="relative">*/}
      {/*  /!* Icon di kiri *!/*/}
      {/*  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400">*/}
      {/*    <svg*/}
      {/*      className="w-5 h-5"*/}
      {/*      fill="none"*/}
      {/*      stroke="currentColor"*/}
      {/*      viewBox="0 0 24 24"*/}
      {/*    >*/}
      {/*      <path*/}
      {/*        strokeLinecap="round"*/}
      {/*        strokeLinejoin="round"*/}
      {/*        strokeWidth={1.5}*/}
      {/*        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"*/}
      {/*      />*/}
      {/*    </svg>*/}
      {/*  </div>*/}

      {/*  /!* Input *!/*/}
      {/*  <input*/}
      {/*    type="email"*/}
      {/*    id="email"*/}
      {/*    name="email"*/}
      {/*    className="block w-full px-2 py-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-sm bg-black/5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"*/}
      {/*    placeholder="you@domail.com"*/}
      {/*    required*/}
      {/*  />*/}

      {/*  /!* Tombol Send *!/*/}
      {/*  <button*/}
      {/*    type="submit"*/}
      {/*    className="absolute top-1/2 -translate-y-1/2 end-1 text-gray-500 bg-zinc-50  focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-xs px-1.5 py-1 hover:text-black"*/}
      {/*  >*/}
      {/*    Send*/}
      {/*  </button>*/}
      {/*</div>*/}

    </div>
  )
}

export default Footer