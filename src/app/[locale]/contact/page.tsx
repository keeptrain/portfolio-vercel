import Link from "next/link";
import { ArrowLeft, Bars3BottomRight } from "@/components/icons/HeroIcons";
import InputUnderline from "@/components/ui/input/InputUnderline";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <nav className="flex h-24 items-center justify-between px-12">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full p-2 hover:bg-zinc-200"
          >
            <ArrowLeft color="black" />
            <p className="font-serif">Back</p>
          </Link>
        </div>
        <div>
          <Link href="/">
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
            <label className="ms-2 w-full py-3 text-sm text-gray-900 dark:text-gray-300">
              Say hello
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
  return (
    <div className="w-full gap-6">
      <div className="col-span-1 space-y-6">
        <Image
          src="/wavy.png"
          alt="postal"
          sizes="100vw"
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
            <span className="bg-blue-old absolute inset-0 -z-0 w-0 transition-all duration-300 group-hover:w-full" />
          </button>
        </div>
      </div>
    </div>
  );
};