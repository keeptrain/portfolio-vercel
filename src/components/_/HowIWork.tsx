// components/HowIWork.tsx
'use client';

import {useState} from 'react';

type Step = {
  title: string;
  desc: string;
};

const steps: Step[] = [
  {
    title: '01 Discovery Call',
    desc:
      "In the first stage, we'll have a Discovery Call to discuss your goals, needs, and project requirements. This helps us align our vision and set the foundation for a successful collaboration.",
  },
  {
    title: '02 Proposal & Scope',
    desc:
      'I prepare a clear scope, timeline, and cost. We review together and lock the plan so expectations match.',
  },
  {
    title: '03 Design & Prototype',
    desc:
      'Low-to-high fidelity design with quick feedback loops. You see the product shape early.',
  },
  {
    title: '04 Build & Iterate',
    desc:
      'Implementation with weekly checkpoints. I iterate fast based on agreed priorities.',
  },
  {
    title: '05 Handover & Support',
    desc:
      'Shipping, documentation, and knowledge transfer. Optional support/maintenance after launch.',
  },
];

export default function HowIWork() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative">
      {/* Wrapper agar pill bisa overlap rapi */}
      <div
        className="relative rounded-[28px] p-6 sm:p-8 bg-white dark:bg-gray-950 ">
       

        {/* Label pill di sudut */}
        <div className="absolute -top-4 left-4">
          <span
            className="inline-block rounded-full bg-white dark:bg-gray-900 border border-black/10 dark:border-white/10 px-4 py-1.5 text-sm font-medium text-gray-900 dark:text-gray-100 shadow">
            How I work
          </span>
        </div>

        {/* Konten step */}
        <div className="mt-6 sm:mt-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {steps[active].title}
          </h3>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl">
            {steps[active].desc}
          </p>
        </div>

        {/* Segmented control */}
        <div className="mt-6 sm:mt-8">
          <div
            className="inline-flex w-full sm:w-auto items-center rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-gray-900 p-1">
            {steps.map((_, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all
                    ${isActive
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                    : 'text-gray-800 dark:text-gray-100 hover:bg-gray-100/80 dark:hover:bg-white/10'
                  }`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {`Step ${String(i + 1).padStart(2, '0')}`}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
