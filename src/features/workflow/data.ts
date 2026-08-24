export interface WorkflowSection {
  id: string;
  number: string;
  title: string;
  heading: string;
  paragraphs: string[];
  bulletTitle: string;
  bullets: string[];
}

export const workflowSections: WorkflowSection[] = [
  {
    id: "brainstorming",
    number: "01",
    title: "Brainstorming",
    heading: "01. Brainstorming & Problem Definition",
    paragraphs: [
      "Every successful software project begins with a deep dive into the problem space. Before choosing frameworks or writing code, I focus on clarifying business goals, identifying core user pain points, and exploring creative technical approaches.",
      "During brainstorming, I evaluate technical feasibility, weigh trade-offs between speed and scalability, and outline key user journeys. Setting clear boundaries and performance budgets early ensures the project stays aligned with user expectations.",
    ],
    bulletTitle: "Key Focus Areas",
    bullets: [
      "Deconstructing business requirements into actionable engineering goals.",
      "Evaluating technical feasibility, data flow, and architectural trade-offs.",
      "Mapping core user journeys and component boundaries before coding.",
      "Defining success metrics, Core Web Vitals targets, and accessibility criteria.",
    ],
  },
  {
    id: "plan",
    number: "02",
    title: "Plan",
    heading: "02. Plan & System Design",
    paragraphs: [
      "With clear requirements established, I transition into detailed planning and system design. Solid architecture upfront prevents costly refactoring later and guarantees high performance, security, and maintainability.",
      "I structure data models, define API contracts, and establish modular folder patterns. Additionally, I set up technical documentation and task roadmaps so progress remains measurable at every development phase.",
    ],
    bulletTitle: "Planning Deliverables",
    bullets: [
      "Designing relational / document data schemas and API specifications.",
      "Structuring component hierarchies and clean folder organization.",
      "Setting up coding conventions, linting rules, and strict TypeScript configs.",
      "Establishing Git branching strategies and task breakdown roadmaps.",
    ],
  },
  {
    id: "execute",
    number: "03",
    title: "Execute",
    heading: "03. Execute & Clean Coding",
    paragraphs: [
      "Execution is where ideas transform into production-ready software. I practice iterative development using a modern web stack—Next.js App Router, React, TypeScript, and Tailwind CSS—to build fast, scalable, and intuitive interfaces.",
      "I emphasize writing clean, self-documenting code with strong type safety. Every component is built with responsiveness, accessibility, and bundle discipline in mind to deliver an exceptional end-user experience.",
    ],
    bulletTitle: "Implementation Standards",
    bullets: [
      "Writing strictly typed, modular code with TypeScript and React Server Components.",
      "Crafting responsive, fluid UI layouts using Tailwind CSS design systems.",
      "Optimizing client-side state, server fetching, and lazy-loaded assets.",
      "Implementing resilient error handling, loading fallbacks, and clean APIs.",
    ],
  },
  {
    id: "validate",
    number: "04",
    title: "Validate",
    heading: "04. Validate & Rigorous Testing",
    paragraphs: [
      "High software quality is guaranteed through continuous verification. Before shipping any release, I run comprehensive test suites and manual audits across multiple browsers, device viewports, and edge-case scenarios.",
      "Validation extends beyond functional correctness to performance and accessibility. I measure Core Web Vitals, audit screen-reader compatibility, and test under network latency to ensure rock-solid stability in real-world conditions.",
    ],
    bulletTitle: "Verification Protocols",
    bullets: [
      "Executing unit and integration testing with Vitest and React Testing Library.",
      "Testing responsive layouts across real iOS, Android, and desktop viewports.",
      "Auditing Lighthouse scores for performance, SEO, and A11y compliance.",
      "Verifying error boundary fallbacks and edge-case handling under slow networks.",
    ],
  },
  {
    id: "collaborate",
    number: "05",
    title: "Collaborate & Review",
    heading: "05. Collaborate & Review",
    paragraphs: [
      "Great engineering is a collaborative process. I actively participate in code reviews, welcome constructive feedback, and automate deployment pipelines to ensure smooth delivery and team alignment.",
      "Post-launch, I monitor application health, user feedback, and runtime performance. Maintaining clear technical documentation and changelogs ensures the codebase remains effortless for team members to extend in the future.",
    ],
    bulletTitle: "Collaboration & Delivery",
    bullets: [
      "Conducting peer code reviews and iterating on constructive feedback.",
      "Automating CI/CD deployment pipelines and preview links via Vercel.",
      "Maintaining clear architecture changelogs, setup guides, and docs.",
      "Monitoring production health, performance metrics, and post-launch analytics.",
    ],
  },
];
