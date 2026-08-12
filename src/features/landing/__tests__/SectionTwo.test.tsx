import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TranslationProvider } from "@/i18n/TranslationContext";
import SectionTwo from "../components/SectionTwo";

const messages = {
  sectionTwo: {
    howIWorkTab: "How I Work?",
    techStackTab: "Tech Stack",
    howIWork: {
      badge: "AI-Assisted Workflow",
      heading: "Working differently in an AI-first era",
      narrative: "In the era of autonomous AI, the way we work has evolved.",
      steps: {
        plan: { title: "Plan", desc: "Understand the problem." },
        develop: { title: "Develop", desc: "Write clean code." },
        validate: { title: "Validate", desc: "Self-test thoroughly." },
        collaborate: { title: "Collaborate", desc: "Seek code review." },
      },
    },
    techStack: {
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      tools: "Tools",
    },
  },
};

function renderSectionTwo() {
  return render(
    <TranslationProvider messages={messages} locale="en">
      <SectionTwo />
    </TranslationProvider>
  );
}

describe("SectionTwo", () => {
  test("renders both tab labels", () => {
    renderSectionTwo();
    expect(screen.getByText("How I Work?")).toBeInTheDocument();
    expect(screen.getByText("Tech Stack")).toBeInTheDocument();
  });

  test("shows How I Work content by default", () => {
    renderSectionTwo();
    expect(screen.getByText("Plan")).toBeInTheDocument();
    expect(screen.getByText("AI-Assisted Workflow")).toBeInTheDocument();
  });

  test("switches to Tech Stack content on tab click", async () => {
    const user = userEvent.setup();
    renderSectionTwo();
    await user.click(screen.getByText("Tech Stack"));
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.queryByText("Plan")).not.toBeInTheDocument();
  });

  test("switches back to How I Work content", async () => {
    const user = userEvent.setup();
    renderSectionTwo();
    await user.click(screen.getByText("Tech Stack"));
    await user.click(screen.getByText("How I Work?"));
    expect(screen.getByText("Develop")).toBeInTheDocument();
  });
});
