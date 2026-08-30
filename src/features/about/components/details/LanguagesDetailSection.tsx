import { TOC } from "../../data";
import OnThisPageRightTab from "../OnThisPageRightTab";
import { DetailSection as Section } from "../shared/DetailSection";

export default function LanguagesDetailsSection() {
  return (
    <section className="flex animate-in space-y-6 duration-200 fade-in-50">
      <article className="order-last min-w-0 flex-1 lg:order-first">
        <h2 className="text-xl tracking-tight sm:text-2xl">
          Languages Programming
        </h2>
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          <Section id="what-is-scope" title="What is Scope in JavaScript?" />
          <Section id="office-analogy" title="The Office Building Analogy" />
          <Section id="why-scope" title="Why Does Scope Exist?" />
          <Section id="three-types" title="The Three Types of Scope" />
          <Section id="global-scope" title="1. Global Scope" />
          <Section id="global-object" title="The Global Object" />
          <Section id="function-scope" title="2. Function Scope" />
          <Section id="hoisting" title="var Hoisting" />
          <Section id="block-scope" title="3. Block Scope" />
          <Section id="tdz" title="The Temporal Dead Zone (TDZ)" />
          <Section id="var-let-const" title="var vs let vs const" />
          <Section id="for-loop" title="The Classic for-loop Problem" />
          <Section id="lexical-scope" title="Lexical Scope" />
          <Section id="scope-chain" title="The Scope Chain" />
          <Section id="shadowing" title="Variable Shadowing" />
          <Section
            id="what-is-closure"
            title="What is a Closure in JavaScript?"
          />
          <Section
            id="every-closure"
            title="Every Function Creates a Closure"
          />
          <Section id="how-closures" title="How Closures Work: Step by Step" />
          <Section id="closures-wild" title="Closures in the Wild" />
          <Section id="data-privacy" title="1. Data Privacy & Encapsulation" />
          <Section id="factories" title="2. Function Factories" />
        </div>
      </article>
      <OnThisPageRightTab
        items={TOC}
        className="order-first hidden md:block lg:order-last"
      />
    </section>
  );
}
