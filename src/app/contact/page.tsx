import Link from "next/link";
import {ArrowLeft, Bars3BottomRight} from "@/components/icons/heroicons";
import InputUnderline from "@/components/ui/input/InputUnderline";
import Image from "next/image";

export default function ProjectsPage() {
  return <body className="min-h-screen">
  <nav className="flex justify-between h-24 px-12 items-center">
    <div>
      <Link href={`/`} className="flex items-center gap-2 rounded-full hover:bg-zinc-200 p-2">
        <ArrowLeft color={"black"}/>
        <p className="font-serif">Back</p>
      </Link>
    </div>
    <div>
      <Link href={`/`}>
        <Bars3BottomRight color="black"/>
      </Link>
    </div>
  </nav>
  <main className="space-y-12">
    <div className="flex flex-col items-center h-full text-2xl text-center">
      Thanks for taking the time to reach out.
      <br/>
      How can I help you today?
    </div>
    <div className="space-y-6 md:px-48">
      <RadioGroup/>
      <EmailInput/>
    </div>
  </main>
  </body>
}

const RadioGroup = () => {
  return (
    <>
      <label className="text-sm font-medium text-gray-900 dark:text-white">Templates</label>
      <ul
        className="mt-2 items-center max-w-sm text-sm font-medium  text-gray-900  sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input id="horizontal-list-radio-license" type="radio" value="" name="list-radio"
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label
              className="w-full py-3 ms-2 text-sm font-inter text-gray-900 dark:text-gray-300">
              Say hello </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input id="horizontal-list-radio-id" type="radio" value="" name="list-radio"
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label htmlFor="horizontal-list-radio-id"
                   className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Discussion</label>

          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input id="horizontal-list-radio-military" type="radio" value="" name="list-radio"
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label htmlFor="horizontal-list-radio-military"
                   className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Hire me</label>
          </div>
        </li>
      </ul>
    </>
  )
}

const EmailInput = () => {
  const currentDate = new Date()
  const day = currentDate.getDate().toString().padStart(2, '0')
  const month = currentDate.toLocaleDateString('en', {month: 'short'}).toUpperCase()
  const year = currentDate.getFullYear()

  return (
    <div className=" gap-6 w-full">
      <div className="col-span-1 space-y-6">
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
        <InputUnderline label="Subject" type="text" id="subject" placeholder="Your name - Purpose"/>
        <InputUnderline label="Your Email" type="email" id="email" placeholder="example@domain.com"/>
        <div className="col-span-2">
          <InputUnderline label="Your Message" type="text" id="message" placeholder="Hello, wave!"/>
        </div>
        <div className="col-span-2">
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