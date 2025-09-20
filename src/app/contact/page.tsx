import Link from "next/link";
import { ArrowLeft, Bars3BottomRight } from "@/components/icons/HeroIcons";
import InputUnderline from "@/components/ui/input/InputUnderline";
import Image from "next/image";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <nav className="flex h-24 items-center justify-between px-12">
        <div>
          <Link
            href={`/`}
            className="flex items-center gap-2 rounded-full p-2 hover:bg-zinc-200"
          >
            <ArrowLeft color={"black"} />
            <p className="font-serif">Back</p>
          </Link>
        </div>
        <div>
          <Link href={`/`}>
            <Bars3BottomRight color="black" />
          </Link>
        </div>
      </nav>
      <main className="space-y-12">
        <div className="flex h-full flex-col items-center text-center text-2xl">
          Thanks for taking the time to reach out.
          <br />
          How can I help you today?
        </div>
        <div className="space-y-6 md:px-48">
          <RadioGroup />
          <EmailInput />
        </div>
      </main>
    </main>
  );
}

const RadioGroup = () => {
  return (
    <>
      <label className="text-sm font-medium text-gray-900 dark:text-white">
        Templates
      </label>
      <ul className="mt-2 max-w-sm items-center text-sm font-medium text-gray-900 sm:flex dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        <li className="w-full border-b border-gray-200 sm:border-r sm:border-b-0 dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              id="horizontal-list-radio-license"
              type="radio"
              value=""
              name="list-radio"
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
            />
            <label className="ms-2 w-full py-3 font-inter text-sm text-gray-900 dark:text-gray-300">
              Say hello{" "}
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-r sm:border-b-0 dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              id="horizontal-list-radio-id"
              type="radio"
              value=""
              name="list-radio"
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
            />
            <label
              htmlFor="horizontal-list-radio-id"
              className="ms-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Discussion
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-r sm:border-b-0 dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              id="horizontal-list-radio-military"
              type="radio"
              value=""
              name="list-radio"
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
            />
            <label
              htmlFor="horizontal-list-radio-military"
              className="ms-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Hire me
            </label>
          </div>
        </li>
      </ul>
    </>
  );
};

const EmailInput = () => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = currentDate
    .toLocaleDateString("en", { month: "short" })
    .toUpperCase();
  const year = currentDate.getFullYear();

  return (
    <div className="w-full gap-6">
      <div className="col-span-1 space-y-6">
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
          <button className="group relative overflow-hidden border-2 border-dotted p-4 text-black hover:text-white">
            <span className="relative z-10">
              Send
              <span className="ml-1 inline-block">&rarr;</span>
            </span>
            <span className="absolute inset-0 -z-0 w-0 bg-blue-old transition-all duration-300 group-hover:w-full" />
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
  );
};
