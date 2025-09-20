// components/HowIWork.tsx
"use client";

import { useState } from "react";

type Step = {
  title: string;
  desc: string;
};

const steps: Step[] = [
  {
    title: "01 Discovery Call",
    desc: "In the first stage, we'll have a Discovery Call to discuss your goals, needs, and project requirements. This helps us align our vision and set the foundation for a successful collaboration.",
  },
  {
    title: "02 Proposal & Scope",
    desc: "I prepare a clear scope, timeline, and cost. We review together and lock the plan so expectations match.",
  },
  {
    title: "03 Design & Prototype",
    desc: "Low-to-high fidelity design with quick feedback loops. You see the product shape early.",
  },
  {
    title: "04 Build & Iterate",
    desc: "Implementation with weekly checkpoints. I iterate fast based on agreed priorities.",
  },
  {
    title: "05 Handover & Support",
    desc: "Shipping, documentation, and knowledge transfer. Optional support/maintenance after launch.",
  },
];

export default function HowIWork() {
  const [active, setActive] = useState(0);

  return (
    <section id="howIWork">
      {/* Content step */}
      <div className="">
        <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          {steps[active].title}
        </h3>
        <p className="mt-3 h-16 max-w-2xl text-gray-600 dark:text-gray-400">
          {steps[active].desc}
        </p>
      </div>

      {/* Segmented control */}
      <div className="mt-6 sm:mt-8">
        <div className="inline-flex w-full items-center rounded-full border border-black/10 bg-white p-1 sm:w-auto dark:border-white/10 dark:bg-gray-900">
          {steps.map((_, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all sm:px-5 ${
                  isActive
                    ? "bg-black text-white shadow-sm dark:bg-white dark:text-black"
                    : "text-gray-800 hover:bg-gray-100/80 dark:text-gray-100 dark:hover:bg-white/10"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                {`Step ${String(i + 1).padStart(2, "0")}`}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
