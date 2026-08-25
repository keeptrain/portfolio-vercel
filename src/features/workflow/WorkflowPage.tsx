import { Container } from "@/components/ui/Container";
import WorkflowSideTab from "./components/WorkflowSideTab";
import ListWorkflowMobileDrawer from "./components/ListWorkflowMobileDrawer";
import { workflowSections } from "./data";

export default function WorkflowPage() {
  return (
    <main className="mt-10 md:mt-16 md:mb-12">
      {/* Page Header (Server Component) */}
      <Container className="md:mb-12">
        <h1 className="font-serif text-lg md:text-3xl">Explain My Workflow</h1>
        <p className="mt-2 text-sm text-zinc-500 md:text-base dark:text-zinc-400">
          A detailed 5-step engineering process for building fast, reliable, and
          scalable software.
        </p>
      </Container>

      {/* Mobile Menu Trigger & Drawer (Client Component) */}
      <ListWorkflowMobileDrawer />

      <Container>
        <div className="grid grid-cols-1 pb-16 md:grid-cols-12 md:pb-24">
          {/* Desktop Left Side: Sticky Vertical Tabs (Client Component) */}
          <WorkflowSideTab className="sticky top-24 hidden self-start md:col-span-4 md:flex lg:col-span-3" />

          {/* Right Side: Stacked Scrollable Workflow Content Sections (Server Component) */}
          <div className="space-y-16 md:col-span-8 lg:col-span-9">
            {workflowSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 space-y-6 border-b border-zinc-200/60 pb-12 last:border-0 dark:border-zinc-800/60"
              >
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold md:text-2xl">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-base leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>

                <div className="space-y-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 dark:border-zinc-800/80 dark:bg-zinc-900/50">
                  <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                    {section.bulletTitle}
                  </h3>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
                    {section.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
