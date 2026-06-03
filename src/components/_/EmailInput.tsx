"use client";

import InputUnderline from "@/components/ui/input/InputUnderline";
import Image from "next/image";
import MoreButton from "@/components/ui/button/MoreButton";

export default function EmailInput() {
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
        <h1 className="font-medium-ex text-blue-old col-span-2 flex text-3xl">
          Send me a message!
        </h1>
        <h2 className="text-blue-grey col-span-2 text-xl">
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
            <span className="bg-blue-old absolute inset-0 z-0 w-0 transition-all duration-300 group-hover:w-full" />
          </button>
        </div>
      </div>
    </div>
  );
}
